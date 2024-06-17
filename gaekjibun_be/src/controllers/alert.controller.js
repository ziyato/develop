import alertService from "../services/alert.service";

const getAlertData = async (req, res) => {
  /**
   * @typedef {Object} inputData
   * @property {number} user_id - 사용자 식별자
   * @property {number} alert_date - 알람 기준일
   */
  const user_id = req.params.userId;
  const alert_date = req.query.alertDate;

  try {
    const foodData = await alertService.getAlertData(user_id, alert_date);

    if (foodData.length === 0) {
      res.status(404).send("Food not found");
    } else {
      res.status(200).json(foodData);
    }
  } catch (error) {
    console.error("Error fetching alert data:", error);
    res.status(500).send("Internal Server Error");
  }
};

export default {
  getAlertData,
};
