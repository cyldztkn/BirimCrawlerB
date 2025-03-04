import fs from "fs";
import dotenv from "dotenv";
dotenv.config();
import puppeteer from "puppeteer";

async function getLinkedinAdsList(url, companyName) {
  console.log(`\n[${companyName}] Linkedin Ads Scraping process started...`);
  //   console.log(process.env.LINKEDIN_COOKIE);
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

    await page.goto(url, { waitUntil: "domcontentloaded" });
    console.log(`[${companyName}] Navigated to page`);

    await page.waitForSelector("ul.search-results-container");

    const ads = await page.$$eval(
      "ul.search-results-container li div:nth-child(3) a  ",
      (li) => li.map((el) => el.getAttribute("href"))
    );

    const singleAdsList = [];

    for (let url of ads) {
      let trueUrl = `https://www.linkedin.com${url}`;
      let singleAds = {
        url: trueUrl,
        creative: {},
      };

      await page.goto(trueUrl, {
        waitUntil: "networkidle2",
      });

      try {
        let video = await page.$$eval(
          "div.base-ad-preview-card .share-native-video div",
          (elements) => {
            const sources = elements?.map((el) =>
              el?.getAttribute("data-sources")
            );
            // JSON'dan ilk çalışan video linkini çıkar
            const firstValidSource = sources?.find((source) => {
              try {
                const parsed = JSON.parse(source);
                return parsed?.length > 0 && parsed[0]?.src;
              } catch {
                return false;
              }
            });
            return firstValidSource
              ? JSON.parse(firstValidSource)[0]?.src
              : null;
          }
        );

        let img = await page.$$eval(".base-ad-preview-card a img", (elements) =>
          elements?.map((el) => el?.getAttribute("src"))
        );

        if (video) {
          singleAds.creative.type = "video";
          singleAds.creative.content = video;
        } else if (img?.length > 0) {
          singleAds.creative.type = "img";
          singleAds.creative.content = img[1];
        } else {
          singleAds.creative.type = "unknown";
          singleAds.creative.content = null;
        }
      } catch (error) {
        console.log("creative error", error.message);
        singleAds.creative = {
          type: "unknown",
          content: null,
        };
      }

      try {
        singleAds.caption = await page.$$eval(
          ".ad-detail-left-rail div:nth-child(1) div div div:nth-child(2) p",
          (elements) => elements.map((el) => el.innerText).join(" ")
        );
      } catch (error) {
        console.log("caption error", error.message);
      }
      try {
        const runTimeText = await page.$$eval(
          ".ad-detail-right-rail div:nth-child(1) p.about-ad__availability-duration",
          (elements) => elements?.map((el) => el.innerHTML)?.join(" ")
        );

        // Tarih formatını dönüştürme ve timestamp hesaplama
        const [startDateStr, endDateStr] = runTimeText
          ?.replace(/\n/g, "")
          ?.trim()
          ?.split(" - ")
          ?.map((str) => str.replace(" arası yayınlandı", ""));

        // Türkçe ay isimlerini İngilizceye çevirme
        const monthMap = {
          Oca: "Jan",
          Şub: "Feb",
          Mar: "Mar",
          Nis: "Apr",
          May: "May",
          Haz: "Jun",
          Tem: "Jul",
          Ağu: "Aug",
          Eyl: "Sep",
          Eki: "Oct",
          Kas: "Nov",
          Ara: "Dec",
        };

        const formatDate = (dateStr) => {
          const [day, month, year] = dateStr?.split(" ");
          return `${day} ${monthMap[month]} ${year}`;
        };

        const startDate = new Date(formatDate(startDateStr));
        const endDate = new Date(formatDate(endDateStr));

        singleAds.runTime = {
          humanize: `${startDateStr} - ${endDateStr}`,
          startTime: isNaN(startDate.getTime())
            ? null
            : Math.floor(startDate.getTime() / 1000),
          finishTime: isNaN(endDate.getTime())
            ? null
            : Math.floor(endDate.getTime() / 1000),
        };
      } catch (error) {
        // console.log("run Time error", error.message);
        singleAds.runTime = {
          humanize: null,
          startTime: null,
          finishTime: null,
        };
      }

      try {
        singleAds.impression = await page.$$eval(
          "div.ad-detail-right-rail > div:nth-child(2) > div > div> p:nth-child(2)",
          (elements) => elements?.map((el) => el.innerHTML)?.join(" ")
        );
      } catch (error) {
        console.log("impression error", error.message);
      }

      try {
        singleAds.countryList = await page
          .$$eval(
            ".ad-detail-right-rail div:nth-child(2) div:nth-child(3) ul li span div",
            (elements) =>
              elements.map((el) => {
                const country = el.querySelector("p")?.innerText?.trim();
                const percent = el.querySelector("progress")?.value;
                return {
                  country: country,
                  impressionPercent: percent ? Number(percent) : null,
                };
              })
          )
          .then((countries) => {
            return countries?.filter(
              (item) => item.country && !item.country.startsWith("%")
            ); // Boş ve yüzde içeren öğeleri filtrele
          });
      } catch (error) {
        console.log("impression error", error.message);
      }

      singleAdsList.push(singleAds);
    }

    // HTML dosyası olarak kaydet
    //   const htmlContent = `<html><body><ul>${ads.join("")}</ul></body></html>`;
    // fs.writeFileSync(
    //   `${companyName}_ads.json`,
    //   JSON.stringify(singleAdsList),
    //   "utf8",
    //   null
    // );

    return singleAdsList;
  } catch (error) {
    console.error(`[${companyName}] Error:`, error.message);
    return null;
  } finally {
    await browser.close();
    console.log(`[${companyName}] Browser closed`);
  }
}

// getLinkedinAdsList(
//   "https://www.linkedin.com/ad-library/search?accountOwner=Birim+Makina",
//   "BirimMakina"
// );

export default getLinkedinAdsList;
