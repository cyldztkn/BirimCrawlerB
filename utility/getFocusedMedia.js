export default async function getFocusedMedia(url) {
  try {
    const response = await fetch(url);
    const jsonData = await response.json();

    const thumbnail = jsonData.graphql.shortcode_media.display_url;
    let videoUrl;

    if (jsonData.graphql.shortcode_media.video_url) {
      videoUrl = jsonData.graphql.shortcode_media.video_url;
    }

    return videoUrl ? { thumbnail, videoUrl } : { thumbnail };
  } catch (error) {
    console.error("Error:", error);
  }
}
