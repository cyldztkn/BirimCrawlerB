import { load } from "cheerio";
import fs from "fs";

function parseLinkedInTime(timeText) {
  // Boşlukları temizle ve gereksiz karakterleri kaldır
  const cleanedText = timeText.replace(/\s+|Düzenlendi/g, "").trim();

  // Geçerli tarihi al
  const date = new Date();

  // Zaman ifadeleri için eşleşmeleri tanımla
  const timeMapping = [
    { regex: /^(\d+)s$/, unit: "hours" }, // 20s -> 20 saat önce
    { regex: /^(\d+)g$/, unit: "days" }, // 1g -> 1 gün önce
    { regex: /^(\d+)h$/, unit: "weeks" }, // 1h -> 1 hafta önce
    { regex: /^(\d+)ay$/, unit: "months" }, // 1ay -> 1 ay önce
  ];

  // Gelen zaman ifadesini uygun regex ile eşleştir
  for (const mapping of timeMapping) {
    const match = cleanedText.match(mapping.regex);
    if (match) {
      const amount = parseInt(match[1], 10);

      switch (mapping.unit) {
        case "hours":
          date.setHours(date.getHours() - amount);
          break;
        case "days":
          date.setDate(date.getDate() - amount);
          break;
        case "weeks":
          date.setDate(date.getDate() - amount * 7);
          break;
        case "months":
          date.setMonth(date.getMonth() - amount);
          break;
      }

      break;
    }
  }

  // Türkçe formatta tarih döndür
  return {
    raw: cleanedText,
    parsed: date.toLocaleDateString("tr-TR"),
    isoString: date.toISOString(),
  };
}

function cleanValue(value) {
  const firstValue = value.split("\n")[0];
  return firstValue.replace(/[^0-9]/g, "");
}

function cleanCaption(caption) {
  return caption
    .replace(/([^\n]+)(\n\1)+/g, "$1")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function extractImages($, article) {
  const images = [];
  $(article)
    .find(
      '[data-test-id="feed-images-content"] [data-test-id="feed-images-content__list-item"] button img'
    )
    .each((_, img) => {
      const src = $(img).attr("src");
      if (src) {
        images.push(src);
      }
    });
  return images.length > 0 ? images : null;
}

function extractVideo($, article) {
  // Önce video elementi kontrolü
  const video = $(article).find(".video-js");
  if (video.length > 0) {
    const videoDataSrc = video.attr("data-sources");
    const src = [];
    if (videoDataSrc) {
      const videoDataSrcJson = JSON.parse(videoDataSrc);
      videoDataSrcJson.map((item) => src.push(item));
    }
    return {
      src: src,
      posterUrl: video.attr("data-poster-url"),
    };
  }

  // Video elementi yoksa video container kontrolü
  const videoContainer = $(article).find(
    '[data-test-id="feed-native-video-content"]'
  );
  if (videoContainer.length > 0) {
    const videoPlayer = videoContainer.find("video");
    if (videoPlayer.length > 0) {
      return {
        src: videoPlayer.attr("src"),
        posterUrl: videoPlayer.attr("poster"),
      };
    }
  }

  return null;
}

function extractDocument($, article) {
  const iframe = $(article).find("iframe");
  if (iframe.length > 0) {
    const configAttr = iframe.attr("data-native-document-config");
    if (configAttr) {
      try {
        const config = JSON.parse(configAttr);
        // Doküman bilgilerini daha detaylı döndür
        if (config.doc) {
          return {
            title: config.doc.title,
            subtitle: config.doc.subtitle,
            totalPages: config.doc.totalPageCount,
            coverPages: config.doc.coverPages || [],
          };
        }
        return null;
      } catch (e) {
        console.error("Error parsing document config:", e);
        return null;
      }
    }
  }
  return null;
}

function determineMediaType(mediaData) {
  if (!mediaData) return null;

  // Array kontrolü (images için)
  if (Array.isArray(mediaData)) {
    return "image";
  }

  // Video kontrolü
  if (mediaData.src && (mediaData.posterUrl || mediaData.poster)) {
    return "video";
  }

  // Document kontrolü
  if (mediaData.coverPages || mediaData.title) {
    return "document";
  }

  return null;
}

function parseLinkedInPostsAtMobile(htmlContent) {
  console.log("parseLinkedInPostsAtMobile is start");
  const $ = load(htmlContent);
  const posts = [];

  $("article").each((i, article) => {
    const post = {};

    // Get caption
    const caption = $(article)
      .find(
        "div.attributed-text-segment-list__container > p.attributed-text-segment-list__content"
      )
      .text()
      .trim();
    if (caption) {
      post.captions = cleanCaption(caption);
    }

    // Get likes count
    const likes = $(article)
      .find('[data-test-id="social-actions__reaction-count"]')
      .text()
      .trim();
    if (likes) {
      post.likes = cleanValue(likes);
    }

    // Get comments count
    const comments = $(article)
      .find('[data-id="social-actions__comments"]')
      .text()
      .trim();
    if (comments) {
      post.comments = cleanValue(comments);
    }

    // Get shares count
    const shares = $(article)
      .find('[data-id="social-actions__reposts"]')
      .text()
      .trim();
    if (shares) {
      post.shares = cleanValue(shares);
    }
    // Get Time
    const time = $(article).find("time").text().trim();
    if (time) {
      post.time = parseLinkedInTime(time);
    }

    // Extract media content
    const images = extractImages($, article);
    const video = extractVideo($, article);
    const document = extractDocument($, article);

    // Set media data and type
    const mediaData = images || video || document;
    if (mediaData) {
      post.mediaType = determineMediaType(mediaData);
      post.mediaContent = mediaData;
    } else {
      post.mediaType = "other";
    }

    // Only add post if it has at least one property
    if (Object.keys(post).length > 0) {
      posts.push(post);
    }
  });

  // console.log(`parsed ${posts.length} post`);

  // Write to JSON file
  // fs.writeFileSync(
  //   "./parsed_posts-AYMAS.json",
  //   JSON.stringify(posts, null, 2),
  //   "utf8"
  // );

  // const onlyTime = [];

  // posts.map((post, index) => {
  //   onlyTime.push(post.time);
  // });

  // fs.writeFileSync(
  //   "./onlyTime.json",
  //   JSON.stringify(onlyTime, null, 2),
  //   "utf8"
  // );

  return posts;
}

export default parseLinkedInPostsAtMobile;
