import dotenv from "dotenv";
dotenv.config();

export default async function getSingleGoogleAds(
  advertiserId,
  creativeId,
  name
) {
  try {
    const requestBody = {
      1: advertiserId,
      2: creativeId,
      5: {
        1: 1,
        2: 37,
        3: 2792,
      },
    };

    const response = await fetch(
      "https://adstransparency.google.com/anji/_/rpc/LookupService/GetCreativeById?authuser=0",
      {
        headers: {
          accept: "*/*",
          "content-type": "application/x-www-form-urlencoded",
          "x-framework-xsrf-token": `${process.env.GOOGLE_ADS_TOKEN_SINGLE}`,
          Referer: `https://adstransparency.google.com/advertiser/${advertiserId}/creative/${creativeId}?authuser=0&region=anywhere`,
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

    return data;
  } catch (error) {
    console.error("Hata:", error.message);
  }
}
