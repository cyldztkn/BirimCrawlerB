const fetchFollowerData = async (id) => {
  try {
    const response = await fetch(
      "https://www.boomsocial.com/GeneralAjax/GetChartData",
      {
        headers: {
          "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
          "x-requested-with": "XMLHttpRequest",
        },
        body: `type=fan&accountid=${id}&channel=1`,
        method: "POST",
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const rawAnswer = await response.json();

    return rawAnswer.datafan;
  } catch (error) {
    console.error("Fetch Error:", error);
    throw error;
  }
};

export default fetchFollowerData;
