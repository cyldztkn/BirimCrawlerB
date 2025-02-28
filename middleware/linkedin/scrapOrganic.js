import puppeteer from "puppeteer";
import parseLinkedInPosts from "./parseLinkedinPosts.js";
import dotenv from "dotenv";

dotenv.config();

async function scrapeLinkedInPage(url, companyName) {
  console.log(`\n[${companyName}] Scraping process started...`);

  const browser = await puppeteer.launch({
    headless: false,
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
    await page.goto(url, { waitUntil: "domcontentloaded" });
    console.log(`[${companyName}] Navigated to page`);

    // Check if content exists
    const hasContent = await page.evaluate(() => {
      return document.querySelector(".feed-container-theme") !== null;
    });

    if (!hasContent) {
      console.log(`[${companyName}] No content found on page`);
      return null;
    }

    // Sort posts by recent
    try {
      await page.click("#sort-dropdown-trigger");
      await page.waitForSelector("[data-artdeco-is-focused='true']");
      await page.waitForSelector(
        ".artdeco-dropdown__content-inner ul li:nth-child(2) div button"
      );
      await page.click(
        ".artdeco-dropdown__content-inner ul li:nth-child(2) div button"
      );
      console.log(`[${companyName}] Posts sorted by recent`);
    } catch (error) {
      console.log(`[${companyName}] Could not sort posts: ${error.message}`);
    }

    // Wait for content and scroll
    await page
      .waitForSelector(".feed-container-theme .scaffold-finite-scroll__content")
      .catch(() => {
        console.log(`[${companyName}] No posts found`);
        return null;
      });

    console.log(`[${companyName}] Starting scroll operation...`);
    await page.evaluate(async () => {
      await new Promise((resolve) => {
        let totalHeight = 0;
        const distance = 250;
        const timer = setInterval(() => {
          const scrollHeight = document.body.scrollHeight;
          window.scrollBy(0, distance);
          totalHeight += distance;

          if (scrollHeight >= 10000 || totalHeight >= scrollHeight) {
            clearInterval(timer);
            resolve();
          }
        }, 300); // Increased delay between scrolls
      });
    });
    console.log(`[${companyName}] Scroll completed`);

    const rawPosts = await page.$$eval(
      ".feed-container-theme .scaffold-finite-scroll__content",
      (elements) => elements.map((el) => el.innerHTML).join("\n")
    );

    console.log(`[${companyName}] Data extraction completed`);
    return parseLinkedInPosts(rawPosts);
  } catch (error) {
    console.error(`[${companyName}] Error:`, error.message);
    return null;
  } finally {
    await browser.close();
    console.log(`[${companyName}] Browser closed`);
  }
}

export default scrapeLinkedInPage;
