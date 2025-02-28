export default async function formatGoogleAdsData(data) {
  if (!data || !data[1]) return [];

  return data[1].map((item) => {
    const formattedItem = {
      advertiserId: item[1] || null,
      adsId: item[2] || null,
      img: item[3]?.[3]?.[2] ? extractImageUrl(item[3][3][2]) : null,
      videoCode: item[3]?.[1]?.[4] || null,
      type: item[4] || null,
      advertiserName: item[12] || null,
      website: item[14] || null,
      startDate: item[6]?.[1]
        ? new Date(item[6][1] * 1000).toISOString()
        : null,
      lastView: item[7]?.[1] ? new Date(item[7][1] * 1000).toISOString() : null,
      countries: [],
    };

    // Type'a göre label ekleme
    if (formattedItem.type === 1) {
      formattedItem.typeLabel = "Metin";
    } else if (formattedItem.type === 2) {
      formattedItem.typeLabel = "Resim";
    } else if (formattedItem.type === 3) {
      formattedItem.typeLabel = "Video";
    } else {
      formattedItem.typeLabel = "Bilinmeyen";
    }

    return formattedItem;
  });
}

function extractImageUrl(imgTag) {
  const regex = /src="([^"]*)"/;
  const match = imgTag.match(regex);
  return match ? match[1] : null;
}
