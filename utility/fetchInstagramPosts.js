const fetchInstagramData = async (id) => {
  try {
    const response = await fetch(
      "https://www.boomsocial.com/GeneralAjax/GetPagePostList",
      {
        headers: {
          "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
          "x-requested-with": "XMLHttpRequest",
        },
        body: `accountid=${id}&lastDate=`,
        method: "POST",
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const rawHtml = await response.text();

    // Gelen HTML'i tam bir tablo yapısına çeviriyoruz
    const html = `
        <table>
          ${rawHtml}
        </table>
      `;

    // Debug için HTML içeriğini kontrol et
    // console.log("Raw HTML:", rawHtml);
    // console.log("Structured HTML:", html);

    return html;
  } catch (error) {
    console.error("Fetch Error:", error);
    throw error;
  }
};

export default fetchInstagramData;
