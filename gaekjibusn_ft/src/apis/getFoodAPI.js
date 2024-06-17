import axios from "axios";

const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export async function getSearchFood(user_id, searchCategory, searchKeyword) {
  try {
    const response = await axios.get(
      `${REACT_APP_BACKEND_URL}/api/icebox/${user_id}?category=${searchCategory}&keyword=${searchKeyword}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getFoodDataAll(user_id) {
  try {
    const response = await axios.get(
      `${REACT_APP_BACKEND_URL}/api/icebox/${user_id}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getFoodData(user_id, food_id) {
  try {
    const response = await axios.get(
      `${REACT_APP_BACKEND_URL}/api/icebox/${user_id}/${food_id}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function postFoodData(user_id, data) {
  try {
    const response = await axios.post(
      `${REACT_APP_BACKEND_URL}/api/icebox/${user_id}`,
      data
    );
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function deleteFoodData(user_id, food_id) {
  try {
    const response = await axios.delete(
      `${REACT_APP_BACKEND_URL}/api/icebox/${user_id}/${food_id}`
    );
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function postRecipe(data) {
  try {
    const response = await axios.post(`${REACT_APP_BACKEND_URL}/api/recipe`, {
      foods: data,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function postFoodTips(data) {
  try {
    const response = await axios.post(
      `${REACT_APP_BACKEND_URL}/api/icebox/tips`,
      {
        foods: data,
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function putFoodData(user_id, food_id, data) {
  try {
    const response = await axios.put(
      `${REACT_APP_BACKEND_URL}/api/icebox/${user_id}/${food_id}`,
      {
        food_amount: data.food_amount,
        purchase_date: data.purchase_date,
        expiration_date: data.expiration_date,
      }
    );
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getAlertData(user_id, alert_date) {
  try {
    const response = await axios.get(
      `${REACT_APP_BACKEND_URL}/api/alert/${user_id}?alertDate=${alert_date}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
