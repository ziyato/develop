import dbConfig from "../configs/db.config";

class AlertService {
  constructor(dbConfig) {
    this.dbConfig = dbConfig;
  }

  async getAlertData(userId, alertDate) {
    const client = await this.dbConfig.connect();
    console.log("user_id", userId);
    console.log("alert_date", alertDate);

    const query = `
      SELECT *
      FROM food_schema.food_data
      WHERE user_id = $1 
        AND expiration_date < CURRENT_DATE + INTERVAL '${alertDate} days';
    `;
    const values = [userId];
    const result = await client.query(query, values);
    console.log(`${userId} 님의 알림 데이터 : `, result.rows);

    client.release();
    return result.rows;
  }
}

const alertService = new AlertService(dbConfig);

export default alertService;
