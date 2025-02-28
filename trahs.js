// dataUtils.js

/**
 * Belirli bir rakibin tüm verilerini getirir
 * @param {string} competitorId - Rakip ID'si
 * @returns {Object} Rakip verisi
 */
const getCompetitorData = (competitorId) => {
  // JSON dosyasından veya ileride veritabanından veri çekme
  const data = JSON.parse(fs.readFileSync("./data/competitors.json", "utf8"));
  return data.competitors.find((c) => c.id === competitorId);
};

/**
 * Belirli bir platformdaki tüm rakiplerin organik verilerini getirir
 * @param {string} platform - 'facebook', 'linkedin', 'instagram', 'youtube'
 * @returns {Array} Platformdaki tüm rakiplerin organik verileri
 */
const getPlatformOrganicData = (platform) => {
  const data = JSON.parse(fs.readFileSync("./data/competitors.json", "utf8"));
  return data.competitors
    .filter((competitor) => competitor.platforms[platform]?.organic)
    .map((competitor) => ({
      id: competitor.id,
      name: competitor.name,
      data: competitor.platforms[platform].organic,
    }));
};

/**
 * Tüm rakiplerin son X gündeki gönderilerini getirir
 * @param {number} days - Gün sayısı
 * @returns {Array} Tüm platformlardan son X günün gönderileri
 */
const getRecentPostsAllPlatforms = (days) => {
  const data = JSON.parse(fs.readFileSync("./data/competitors.json", "utf8"));
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);

  const results = [];

  data.competitors.forEach((competitor) => {
    Object.keys(competitor.platforms).forEach((platform) => {
      if (competitor.platforms[platform]?.organic?.posts) {
        const posts = competitor.platforms[platform].organic.posts
          .filter((post) => new Date(post.timestamp) >= cutoffDate)
          .map((post) => ({
            competitorId: competitor.id,
            competitorName: competitor.name,
            platform,
            ...post,
          }));

        results.push(...posts);
      }
    });
  });

  // En yeni gönderiler başta olacak şekilde sırala
  return results.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
};

/**
 * Etkileşim puanı hesaplar
 * @param {Object} post - Gönderi objesi
 * @returns {number} Hesaplanmış etkileşim puanı
 */
const calculateEngagementScore = (post) => {
  let score = 0;
  const metrics = post.metrics;

  // Platforma özgü hesaplama mantığı
  if (metrics) {
    score += metrics.likes * 1;
    score += metrics.comments * 2;
    score += metrics.shares * 3;

    if (metrics.views) {
      score = (score / metrics.views) * 100; // Görüntülenme başına etkileşim
    }
  }

  return Math.round(score);
};

/**
 * Tüm rakiplerin takipçi değişim verilerini getirir
 * @returns {Array} Tüm rakipler için platform bazlı takipçi değişimleri
 */
const getFollowerTrendsAllCompetitors = () => {
  const data = JSON.parse(fs.readFileSync("./data/competitors.json", "utf8"));

  return data.competitors.map((competitor) => {
    const followerTrends = {};

    Object.keys(competitor.platforms).forEach((platform) => {
      if (competitor.platforms[platform]?.organic?.profile?.followerHistory) {
        followerTrends[platform] =
          competitor.platforms[platform].organic.profile.followerHistory;
      }
    });

    return {
      id: competitor.id,
      name: competitor.name,
      followerTrends,
    };
  });
};

// İhraç edilecek fonksiyonlar
module.exports = {
  getCompetitorData,
  getPlatformOrganicData,
  getRecentPostsAllPlatforms,
  calculateEngagementScore,
  getFollowerTrendsAllCompetitors,
};
