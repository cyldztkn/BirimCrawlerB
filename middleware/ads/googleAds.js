import fs from "fs";
import formatGoogleAdsData from "../../utility/formatGoogleAdsData.js";
import getSingleGoogleAds from "./getSingleGoogleAds.js";
import getCountryById from "../../utility/getCountryById.js";
import dotenv from "dotenv";
dotenv.config();

async function getGoogleAdsById(googleAdsId, name) {
  try {
    const requestBody = {
      2: 40,
      3: {
        12: {
          1: "",
          2: true,
        },
        13: {
          1: [googleAdsId],
        },
      },
      7: {
        1: 1,
        2: 200,
        3: 2792,
      },
    };
    const response = await fetch(
      "https://adstransparency.google.com/anji/_/rpc/SearchService/SearchCreatives?authuser=0",
      {
        headers: {
          accept: "*/*",
          "content-type": "application/x-www-form-urlencoded",
          "x-framework-xsrf-token": `${process.env.GOOGLE_ADS_TOKEN}`,
          Referer: `https://adstransparency.google.com/advertiser/${googleAdsId}?region=anywhere`,
        },
        body: `f.req=${encodeURIComponent(JSON.stringify(requestBody))}`,
        method: "POST",
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error(
        "Google API Hata Detayları:",
        JSON.stringify(errorData, null, 2)
      );
      throw new Error(
        `API Hatası: ${errorData?.error?.message || "Bilinmeyen hata"}`
      );
    }

    const data = await response.json();
    let formattedData = await formatGoogleAdsData(data);

    formattedData = await Promise.all(
      formattedData.map(async (item) => {
        const singleData = await getSingleGoogleAds(
          item.advertiserId,
          item.adsId,
          name
        );

        // Ülke verilerini işle
        if (singleData?.[1]?.[17]) {
          item.countries = singleData[1][17].map((country) => {
            const ulke = getCountryById(country[1]);
            return {
              country: ulke?.name || "Bilinmeyen",
              averageClicks: country[3] || 0,
            };
          });
        }

        return item;
      })
    );

    // fs.writeFileSync(
    //   `./exports/willDelete/5/${name.replaceAll(" ", "")}_ById.json`,
    //   JSON.stringify(formattedData, null, 2)
    // );

    return formattedData;
  } catch (error) {
    console.error("Hata:", error.message);
  }
}

async function getGoogleAdsByDomain(domain, name) {
  try {
    const bodyData = {
      2: 40,
      3: {
        12: {
          1: `${domain}`,
          2: true,
        },
      },
      7: {
        1: 1,
        2: 200,
        3: 2792,
      },
    };

    const encodedBody = `f.req=${encodeURIComponent(JSON.stringify(bodyData))}`;

    const response = await fetch(
      "https://adstransparency.google.com/anji/_/rpc/SearchService/SearchCreatives?authuser=0",
      {
        headers: {
          accept: "*/*",
          "accept-language": "tr-TR,tr;q=0.9,en-US;q=0.8,en;q=0.7",
          "content-type": "application/x-www-form-urlencoded",
          priority: "u=1, i",
          "sec-ch-ua":
            '"Not(A:Brand";v="99", "Google Chrome";v="133", "Chromium";v="133"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"Windows"',
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          "x-framework-xsrf-token":
            "ABerymI5vWq7XAyzxpLDzOrOJ4KI:1739800281795",
          "x-same-domain": "1",
          cookie: "HSID=A9bM9DQ8aD11PEand; SSID=AR1Sqh7-VbmhXko0c; ...",
          Referer: `https://adstransparency.google.com/?region=anywhere&domain=${domain}`,
          "Referrer-Policy": "strict-origin-when-cross-origin",
        },
        body: encodedBody, // Güncellenmiş body
        method: "POST",
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error(
        "Google API Hata Detayları:",
        JSON.stringify(errorData, null, 2)
      );
      throw new Error(
        `API Hatası: ${errorData?.error?.message || "Bilinmeyen hata"}`
      );
    }

    const data = await response.json();
    let formattedData = await formatGoogleAdsData(data);

    formattedData = await Promise.all(
      formattedData.map(async (item) => {
        const singleData = await getSingleGoogleAds(
          item.advertiserId,
          item.adsId,
          name
        );

        if (singleData?.[1]?.[17]) {
          item.countries = singleData[1][17].map((country) => {
            const ulke = getCountryById(country[1]);
            return {
              country: ulke?.name || "Bilinmeyen",
              averageClicks: country[3] || 0,
            };
          });
        }

        return item;
      })
    );

    // fs.writeFileSync(
    //   `./exports/willDelete/5/${name.replaceAll(" ", "")}_ByDomain.json`,
    //   JSON.stringify(formattedData, null, 2)
    // );

    return formattedData;
  } catch (error) {
    console.error("Hata:", error.message);
  }
}

export { getGoogleAdsByDomain, getGoogleAdsById };
