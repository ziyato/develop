import "./App.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/Homepage.jsx";
import MyPage from "./pages/MyPage";
import Header from "./components/Header";
import RegisterUser from "./pages/RegisterUser.js";
import Login from "./pages/Login.js";
import FoodDetailPage from "./pages/FoodDetailPage.jsx";
import About from "./pages/About.js";
import RecipePage from "./pages/RecipePage.jsx";
import NotFound from "./pages/NotFound.js";
import { getAlertData } from "./apis/getFoodAPI.js";

function UseSessionStorage(key) {
  const storedValue = sessionStorage.getItem(key);
  return storedValue ? JSON.parse(storedValue) : null;
}

function App() {
  const [user, setUser] = useState(null);
  const [recipeFood, setRecipeFood] = useState([]);
  const [notifications, setNotifications] = useState([]);

  async function getAlertDataFromDB() {
    try {
      const alertData = await getAlertData(user.user_id, user.alert_date);
      setNotifications(alertData);
      return alertData;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  function initializeUser() {
    const storedUser = UseSessionStorage("user");
    setUser(storedUser);
  }

  useEffect(() => {
    initializeUser();
  }, []);

  useEffect(() => {
    if (user) {
      getAlertDataFromDB();
    }
  }, [user]);

  return (
    <div className="App">
      <Header user={user} notifications={notifications} />
      {/* <button className=" bg-cyan-500" onClick={() => setUser(userInfo)}>
        임시로그인
      </button> */}

      <Routes>
        <Route
          path="/"
          element={
            user ? (
              <HomePage user={user} setRecipeFood={setRecipeFood} />
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="/food/:food_id"
          element={<FoodDetailPage propsUserData={user} />}
        />
        <Route
          path="/recipe"
          element={<RecipePage recipeFood={recipeFood} />}
        />
        <Route path="/about" element={<About />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<RegisterUser />} />
        <Route path="/mypage" element={<MyPage user={user} initializeUser={initializeUser} />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;

// 유저 정보 예시
const userInfo = {
  username: "민지",
  user_id: 4,
  email: "kmjlso1028@naver.com",
  password: "123",
  join_date: "2024-05-15T11:38:22.625Z",
  profile_pic: null,
  alert_date: 3,
};
