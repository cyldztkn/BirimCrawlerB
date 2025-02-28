import puppeteer from "puppeteer";
import { KnownDevices } from "puppeteer";
import dotenv from "dotenv";
import fs from "fs";
dotenv.config();

export default async function instagramOrganicCrawl(url, companyName) {
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
        name: "sessionid",
        value: process.env.INSTAGRAM_SESSIONID,
        domain: ".instagram.com",
        path: "/",
        httpOnly: true,
        secure: true,
      },
    ];

    await browser.setCookie(...cookies);

    const iPhone = KnownDevices["iPhone 15 Pro"];
    await page.emulate(iPhone);

    // await page.goto(url, { waitUntil: "networkidle2" });
    // console.log(`[${companyName}] Navigated to page`);

    // let follower = await page.$$eval("header > section > ul > li ", (li) =>
    //   li.map((x) => x.innerText)
    // );
    // console.log("FOLLOWER:", follower);

    // let postLinks = await page.$$eval(
    //   " section > main > div > div > div > div > div > div > a",
    //   (a) => a.map((x) => x.getAttribute("href"))
    // );

    // console.log(postLinks);
  } catch (error) {
    console.error(`[${companyName}] Error:`, error.message);
    return null;
  } finally {
    await browser.close();
    console.log(`[${companyName}] Browser closed`);
  }
}
// aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa

async function getInstagramPostInsights(accessToken, postId) {
  try {
    // Post metrics için istek
    const response = await fetch(
      `https://graph.facebook.com/v19.0/${postId}/insights?metric=engagement,impressions,reach,saved&access_token=${accessToken}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const insights = await response.json();

    // Beğeni ve yorumlar için ayrı istek
    const mediaResponse = await fetch(
      `https://graph.facebook.com/v19.0/${postId}?fields=like_count,comments_count&access_token=${accessToken}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!mediaResponse.ok) {
      throw new Error(`API error: ${mediaResponse.status}`);
    }

    const mediaData = await mediaResponse.json();

    return {
      insights: insights.data,
      likeCount: mediaData.like_count,
      commentsCount: mediaData.comments_count,
    };
  } catch (error) {
    console.error("Error fetching Instagram post insights:", error);
    throw error;
  }
}

// Kullanım örneği
const accessToken =
  "EAAX0CIapKy4BOwwGnxPZCiQRO59uFZB4YsNALXbkVopwCJVXwFrmZCLek7CzeM33AyPX2EY4c2k25CYeUa7ZBN3RJ2VZACLns1vNdU0W8XnoFMqQhzjd876dGZBQ9G0X0B6mX0rTd1XJ5nDbZAZCMqFr3p7ZBmH4jbKcktRxmjQlsuGkwZANkC6ttwnL3tJ07AYXP8ZCneVwQLsZBpUIYxF2RZCLzDuLZAFujjp7gZD";
const postId = "DGNWbCqIq72";

getInstagramPostInsights(accessToken, postId)
  .then((data) => console.log(data))
  .catch((error) => console.error(error));
