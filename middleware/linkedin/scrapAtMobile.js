import puppeteer from "puppeteer";
import parseLinkedInPosts from "./parseLinkedinPosts.js";
import { KnownDevices } from "puppeteer";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import parseLinkedInPostsAtMobile from "./parseLinkedinPostsAtMobile.js";
import { load } from "cheerio";
import addStandardizedDates from "../../utility/addStandardizedDates.js";

dotenv.config();

async function scrapLinkednAtMobile(url, companyName) {
  console.log(`\n[${companyName}] Scraping process started...`);

  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: null,
    args: ["--start-maximized"],
  });

  try {
    const page = await browser.newPage();
    console.log(`[${companyName}] Browser opened`);

    const cookies = [
      {
        name: "li_at",
        value: process.env.LINKEDIN_COOKIE,
        domain: ".linkedin.com",
        path: "/",
        httpOnly: true,
        secure: true,
      },
    ];

    await browser.setCookie(...cookies);

    const iPhone = KnownDevices["iPhone 15 Pro"];
    await page.emulate(iPhone);

    await page.goto(url, { waitUntil: "domcontentloaded" });
    console.log(`[${companyName}] Navigated to page`);

    await page.waitForSelector("main section.top-card-layout");

    // get Follower count
    const follower = await page.$$eval(
      "main section.top-card-layout h3 ",
      (el) => el.map((x) => x.innerText)
    );

    const parts = follower?.[0]?.trim()?.split(/\s+/) ?? [];
    const followerCount = parts?.[parts.length - 2] ?? "N/A";

    console.log(`[${companyName}] Follower: ${followerCount}`);

    // Get Employee count
    let employeeCount = "N/A"; // Varsayılan değer

    try {
      employeeCount = await page.$eval(
        'div[data-test-id="about-us__size"] dd',
        (element) => element.innerText
      );
    } catch (error) {
      console.log(`[${companyName}] Employee Count not found.`);
    }

    console.log(`[${companyName}] Employee Count: ${employeeCount}`);
    console.log(`[${companyName}] Starting scroll operation...`);

    await page.evaluate(async () => {
      await new Promise((resolve) => {
        let totalHeight = 0;
        const distance = 500;
        let retries = 0;
        const maxRetries = 5; // 5 kez bekleyip tekrar kontrol etmesini sağlıyoruz.

        const timer = setInterval(async () => {
          const scrollHeight = document.body.scrollHeight;
          window.scrollBy(0, distance);
          totalHeight += distance;

          if (totalHeight >= scrollHeight) {
            if (retries < maxRetries) {
              retries++;
              console.log(
                `Waiting for more content... (${retries}/${maxRetries})`
              );
              totalHeight -= distance; // Son kaydırmayı geri al
              await new Promise((r) => setTimeout(r, 600)); // 1 saniye bekle
            } else {
              console.log("No more content loaded, stopping scroll.");
              clearInterval(timer);
              resolve();
            }
          }

          if (scrollHeight >= 50000) {
            console.log("Reached max scroll height, stopping scroll.");
            clearInterval(timer);
            resolve();
          }
        }, 300); // Scroll arası bekleme süresi
      });
    });

    console.log(`[${companyName}] Scroll completed`);

    const rawData = await page.$$eval(
      "main > section.core-section-container div.core-section-container__content ul.updates__list li.mb-1 ",
      (elements) => elements.map((el) => el.innerHTML).join("\n")
    );

    // console.log(typeof rawData);
    // fs.writeFileSync("./HTML_LI_LIST.json", rawData, "utf8");

    // Parse Posts
    const parsedPosts = parseLinkedInPostsAtMobile(rawData);
    console.log(`[${companyName}] Parsed ${parsedPosts.length} posts`);

    // return parsedPosts;

    const dataAtStandardizedTime = parsedPosts.map((post) => ({
      ...post,
      date: addStandardizedDates("linkedin", post.time),
    }));

    const finalyData = {
      followerCount,
      employeeCount,
      data: dataAtStandardizedTime,
    };

    return finalyData;
  } catch (error) {
    console.error(`[${companyName}] Error:`, error.message);
    return null;
  } finally {
    await browser.close();
    console.log(`[${companyName}] Browser closed`);
  }
}

export default scrapLinkednAtMobile;
