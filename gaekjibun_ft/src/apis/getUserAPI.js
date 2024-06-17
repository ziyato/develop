import axios from "axios";

const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export async function getLogin(username, password) {
  try {
    const response = await axios.post(
      `${REACT_APP_BACKEND_URL}/api/user/login`,
      {
        email: username,
        password: password,
      }
    );
    // console.log(response.data);
    sessionStorage.setItem("user", JSON.stringify(response.data));

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getProfile(user_id) {
  try {
    const response = await axios.get(
      `${REACT_APP_BACKEND_URL}/api/user/${user_id}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function postRegister(data) {
  console.log(data);
  try {
    const response = await axios.post(
      `${REACT_APP_BACKEND_URL}/api/user/signup`,
      {
        email: data.email,
        password: data.password,
        username: data.Username,
      }
    );

    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function putUserProfile(user_id, data) {
  try {
    const response = await axios.put(
      `${REACT_APP_BACKEND_URL}/api/user/${user_id}`,
      { password: data.password, alert_date: data.alert_date}
    );

    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
