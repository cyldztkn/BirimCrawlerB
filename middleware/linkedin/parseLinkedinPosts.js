import { load } from "cheerio";

class TimeParser {
  static parseLinkedInTime(timeText) {
    // Boşlukları temizle ve HTML etiketlerini kaldır
    const cleanedText = timeText.replace(/<!---->/g, "").trim();

    // Tarih hesaplaması için geçerli tarih
    const date = new Date();

    // Zaman ifadelerini kontrol et
    const timeMapping = [
      { keyword: "hafta önce", unit: "weeks" },
      { keyword: "gün önce", unit: "days" },
      { keyword: "saat önce", unit: "hours" },
      { keyword: "ay önce", unit: "months" },
      { keyword: "yıl önce", unit: "years" },
    ];

    // Her bir zaman ifadesi için kontrol
    for (const mapping of timeMapping) {
      if (cleanedText.includes(mapping.keyword)) {
        const amount = parseInt(cleanedText.split(" ")[0]);

        switch (mapping.unit) {
          case "weeks":
            date.setDate(date.getDate() - amount * 7);
            break;
          case "days":
            date.setDate(date.getDate() - amount);
            break;
          case "hours":
            date.setHours(date.getHours() - amount);
            break;
          case "months":
            date.setMonth(date.getMonth() - amount);
            break;
          case "years":
            date.setFullYear(date.getFullYear() - amount);
            break;
        }

        break;
      }
    }

    // Tarih formatını Türkçe locale'a göre ayarla
    return {
      raw: cleanedText,
      parsed: date.toLocaleDateString("tr-TR"),
      isoString: date.toISOString(),
    };
  }
}

function parseSocialInteractions($post) {
  const socialCountsSelector =
    ".social-details-social-counts ul li.social-details-social-counts__item button span[aria-hidden=true]";
  const socialElements = $post(socialCountsSelector);

  const interactions = {
    likes: 0,
    comments: 0,
    shares: 0,
  };

  socialElements.each((index, element) => {
    const text = $post(element).text().trim();

    // Türkçe ve İngilizce ifadeleri destekle
    if (text.includes("beğeni") || text.includes("like")) {
      interactions.likes = parseInt(text.replace(/\D/g, "")) || 0;
    } else if (text.includes("yorum") || text.includes("comment")) {
      interactions.comments = parseInt(text.replace(/\D/g, "")) || 0;
    } else if (text.includes("paylaşım") || text.includes("share")) {
      interactions.shares = parseInt(text.replace(/\D/g, "")) || 0;
    }
  });

  return interactions;
}

function extractCreativeLinks($post, creativeType) {
  const links = {
    original: null,
    media: [],
  };

  switch (creativeType) {
    case "image":
      const imageElements = $post(
        "button .ivm-image-view-model .ivm-view-attr__img-wrapper img"
      );

      imageElements.each((index, img) => {
        let src = $post(img).attr("src");
        if (src) {
          // LinkedIn'in CDN URL'lerini düzelt
          src = src.replace(
            "https://media.licdn.com",
            "https://media-exp1.licdn.com"
          );
          links.media.push(src);
        }
      });
      break;

    case "article":
      // Article linkini bul
      const articleLink = $post("article a");
      if (articleLink.length) {
        links.original = articleLink.attr("href");
      }
      break;

    case "video":
      const videoElement = $post(".update-components-linkedin-video video");
      if (videoElement.length) {
        const posterUrl = videoElement.attr("poster");
        const videoSrc = videoElement.attr("src");

        if (posterUrl) {
          links.media.push(
            posterUrl.replace(
              "https://media.licdn.com",
              "https://media-exp1.licdn.com"
            )
          );
        }

        if (videoSrc && videoSrc.startsWith("blob:")) {
          // Blob URL'leri şimdilik işlemiyoruz
          links.original = null;
        }
      }
      break;
  }

  return links.media.length > 0 || links.original ? links : null;
}

function parseLinkedInPosts(html) {
  const $ = load(html);
  const posts = [];

  // Her bir post container'ı için
  $("div.fie-impression-container").each((index, element) => {
    try {
      const $post = load(element);

      // Creative Type belirleme
      const hasImage = $post(".update-components-image").length > 0;
      const hasArticle = $post(".update-components-article").length > 0;
      const hasVideo = $post(".update-components-linkedin-video").length > 0;

      let creativeType = "other";
      if (hasImage) creativeType = "image";
      if (hasArticle) creativeType = "article";
      if (hasVideo) creativeType = "video";

      // Zaman bilgisini çıkarma
      const timeElement = $post(
        "span.update-components-actor__sub-description span.visually-hidden"
      );
      const timeText = timeElement.text().trim();
      const parsedTime = TimeParser.parseLinkedInTime(timeText);

      // Sosyal etkileşimleri parse et
      const socialInteractions = parseSocialInteractions($post);

      // Caption parsing
      const captionElements = $post(".update-components-text");
      const captions = captionElements
        .map((i, el) =>
          $post(el)
            .text()
            .trim()
            .replace(/\bhashtag#/g, "#")
        )
        .get();

      // Boş captionları filtreleme
      const filteredCaptions = captions.filter((caption) => caption.length > 0);

      // Link çıkarma
      const creativeLinks = extractCreativeLinks($post, creativeType);

      const postData = {
        time: parsedTime,
        creativeType: creativeType,
        interactions: socialInteractions,
        captions: filteredCaptions.length > 0 ? filteredCaptions : null,
        links: creativeLinks,
      };

      posts.push(postData);
    } catch (error) {
      console.error(`Post ${index} parsing failed:`, error);
    }
  });

  return posts;
}

export default parseLinkedInPosts;
