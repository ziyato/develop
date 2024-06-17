import dbConfig from "../configs/db.config";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_ORGANIZATION_KEY = process.env.OPENAI_ORGANIZATION_KEY;
const OPENAI_PROJECT_KEY = process.env.OPENAI_PROJECT_KEY;

class FoodService {
  constructor(dbConfig) {
    this.dbConfig = dbConfig;
    this.openai = new OpenAI({
      apiKey: OPENAI_API_KEY,
      organization: OPENAI_ORGANIZATION_KEY,
      project: OPENAI_PROJECT_KEY,
    });
  }

  async postFoodTips(food_name) {
    const openAIMessages = {
      system: `너는 세계 최고의 '식재료' 전문가야.
        나에겐 '${food_name}'의 재료가 있는데, 이 재료에 대한 기본적인 정보들을 알려줘.
        특히 보관 방법과 유통기한, 그리고 이 재료를 사용한 대표 메뉴들을 알려줘.
        네가 대답을 시작할 때 '${food_name}의 정보를 알려드리겠습니다!'라고 말해줘.`,
    };
    console.log("openAIMessages :", openAIMessages.system);

    try {
      const completion = await this.openai.chat.completions.create({
        messages: [{ role: "system", content: openAIMessages.system }],
        model: "gpt-4o",
        max_tokens: 1024,
        temperature: 1, // 창의성
      });
      console.log(completion.choices);
      return completion.choices[0].message.content;
    } catch (error) {
      console.error("Error fetching data from OpenAI API:", error);
      throw error;
    }
  }

  async getFoodDataAll(user_id, category = null, food_name = null) {
    const client = await this.dbConfig.connect();
    let query = "SELECT * FROM food_schema.food_data WHERE user_id = $1";
    let values = [user_id];

    if (category === "food_name") {
      query += ` AND food_name ILIKE $2`;
      values.push(`%${food_name}%`);
    } else if (category === "category") {
      query += ` AND category ILIKE $2`;
      values.push(`%${food_name}%`);
    } else if (category) {
      query += " AND category = $2";
      values.push(category);
    }

    try {
      const result = await client.query(query, values);
      console.log(`${user_id} 님의 음식 데이터 : `, result.rows);
      return result.rows;
    } catch (error) {
      console.error("Error executing query", error);
      throw error;
    } finally {
      client.release();
    }
  }

  async getFoodData(user_id, food_id) {
    const client = await this.dbConfig.connect();
    const query =
      "SELECT * FROM food_schema.food_data WHERE user_id = $1 AND food_id = $2";
    const values = [user_id, food_id];

    try {
      const result = await client.query(query, values);
      console.log(`${user_id} 님의 ${food_id}번의 음식 데이터 : `, result.rows);
      return result.rows;
    } catch (error) {
      console.error("Error executing query", error);
      throw error;
    } finally {
      client.release();
    }
  }

  async postFoodData(
    user_id,
    food_name,
    food_pic,
    category,
    purchase_date,
    expiration_date,
    food_amount
  ) {
    const client = await this.dbConfig.connect();
    const query =
      "INSERT INTO food_schema.food_data (user_id, food_name, food_pic, category, purchase_date, expiration_date, food_amount) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *";
    const values = [
      user_id,
      food_name,
      food_pic,
      category,
      purchase_date,
      expiration_date,
      food_amount,
    ];

    try {
      const result = await client.query(query, values);
      console.log("food_schema에 등록될 값 : ", result.rows);
      return result.rows[0];
    } catch (error) {
      console.error("Error saving food to database:", error);
      throw error;
    } finally {
      client.release();
    }
  }
  async deleteFoodData(user_id, food_id) {
    const client = await this.dbConfig.connect();
    const query =
      "DELETE FROM food_schema.food_data WHERE user_id = $1 AND food_id = $2";
    const values = [user_id, food_id];

    try {
      const result = await client.query(query, values);
      console.log(`${user_id} 님의 ${food_id}번 음식 데이터 삭제`);
      return result;
    } catch (error) {
      console.error("Error executing query", error);
      throw error;
    } finally {
      client.release();
    }
  }
  async putFoodData(
    user_id,
    food_id,
    food_amount,
    purchase_date,
    expiration_date
  ) {
    try {
      const client = await this.dbConfig.connect();
      const query =
        "UPDATE food_schema.food_data SET food_amount = $3, purchase_date = $4, expiration_date = $5 WHERE user_id = $1 AND food_id = $2 RETURNING *";
      const values = [
        user_id,
        food_id,
        food_amount,
        purchase_date,
        expiration_date,
      ];
      const result = await client.query(query, values);
      console.log("result", result);
      client.release();

      if (!result.rows[0]) {
        return "404";
      } else {
        return result.rows[0];
      }
    } catch (error) {
      console.error(`Error updating Food Data ${food_id}:`, error);
      throw error;
    }
  }
}

// FoodService 인스턴스 생성 및 export
const foodService = new FoodService(dbConfig);
export default foodService;
