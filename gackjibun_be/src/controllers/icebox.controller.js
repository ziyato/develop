import foodService from "../services/icebox.service.js";

//유저 아이스박스에 있는 모든 음식 데이터를 가져오는 함수
const getFoodDataAll = async (req, res) => {
  /**
   * @userData {Object}
   * @property {number} user_id
   */
  const user_id = req.params.userId;
  const { category, keyword } = req.query;
  const decoded_food_name = decodeURIComponent(keyword);

  try {
    const foodData = await foodService.getFoodDataAll(
      user_id,
      category,
      decoded_food_name
    );
    res.status(200).json(foodData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

//유저 아이스박스에 있는 특정 음식 데이터를 가져오는 함수
const getFoodData = async (req, res) => {
  /**
   * @userData {Object}
   * @property {number} user_id
   * @property {number} food_id
   */

  const user_id = req.params.userId;
  const food_id = req.params.foodId;

  const foodData = await foodService.getFoodData(user_id, food_id);
  res.status(200).json(foodData);
};

const postFoodTips = async (req, res) => {
  const food_name = req.body.foods;

  const tipData = await foodService.postFoodTips(food_name);
  res.status(200).json(tipData);
};

//유저 아이스박스에 음식 데이터를 추가하는 함수
const postFoodData = async (req, res) => {
  /**
   * @userData {Object}
   * @property {number} user_id
   * @property {string} food_name
   * @property {string} food_pic
   * @property {string} category
   * @property {string} purchase_date
   * @property {string} expiration_date
   */
  let user_id = req.params.userId;
  let {
    food_name,
    food_pic,
    category,
    purchase_date,
    expiration_date,
    food_amount,
  } = req.body;

  let result = await foodService.postFoodData(
    user_id,
    food_name,
    food_pic,
    category,
    purchase_date,
    expiration_date,
    food_amount
  );
  if (result === "404") {
    res.status(404).send("음식 등록 실패");
    return;
  } else {
    res.send(result);
  }
};

const deleteFoodData = async (req, res) => {
  /**
   * @userData {Object}
   * @property {number} user_id
   * @property {number} food_id
   */
  const user_id = req.params.userId;
  const food_id = req.params.foodId;

  const foodData = await foodService.deleteFoodData(user_id, food_id);
  res.status(200).json(foodData);
};

const putFoodData = async (req, res) => {
  /**
   * @userData {Object}
   * @property {number} user_id
   * @property {number} food_id
   * @property {number} food_amount
   * @property {string} purchase_date
   * @property {string} expiration_date
   */

  const user_id = req.params.userId;
  const food_id = req.params.foodId;
  const { food_amount, purchase_date, expiration_date } = req.body;
  console.log(
    "user_id : ",
    user_id,
    "food_id : ",
    food_id,
    "food_amount : ",
    food_amount,
    "purchase_date : ",
    purchase_date,
    "expiration_date : ",
    expiration_date
  );
  console.log(typeof food_amount, typeof purchase_date, typeof expiration_date);

  const foodData = await foodService.putFoodData(
    user_id,
    food_id,
    food_amount,
    purchase_date,
    expiration_date
  );
  res.status(200).json(foodData);
};

export default {
  postFoodTips,
  getFoodDataAll,
  getFoodData,
  postFoodData,
  deleteFoodData,
  putFoodData,
};
