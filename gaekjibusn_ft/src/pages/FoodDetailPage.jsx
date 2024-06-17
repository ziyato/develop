import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { calculateDaysLeft } from "../components/FoodTable.jsx";
import "./FoodDetailPage.css";
import CompleteModal from "../components/CompleteModal/CompleteModal.jsx";
import { getFoodData, postFoodTips, putFoodData } from "../apis/getFoodAPI.js";


const FoodDetailPage = ({ propsUserData }) => {
  const navigate = useNavigate();
  const { food_id } = useParams();
  const [foodDetail, setFoodDetail] = useState({});
  const [foodTip, setFoodTip] = useState();
  const [editableDetail, setEditableDetail] = useState({
    food_amount: "",
    purchase_date: "",
    expiration_date: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (!propsUserData) {
      navigate("/login");
    } else {
      getFoodData(propsUserData?.user_id, food_id).then((response) => {
        console.log(
          `${propsUserData.username}님의 ${food_id}번 음식 : `,
          response[0]
        );
        setFoodDetail(response[0]);
        setEditableDetail({
          food_amount: response[0].food_amount,
          purchase_date: response[0].purchase_date,
          expiration_date: response[0].expiration_date,
        });
      });
    }
  }, []);

  function modalOpen(message) {
    setSuccessMessage(message);
    setIsModalOpen(true);
    setTimeout(() => {
      setIsModalOpen(false);
    }, 1000);
  }

  const handleSave = () => {
    setFoodDetail({
      ...foodDetail,
      food_amount: parseInt(editableDetail.food_amount, 10),
      purchase_date: editableDetail.purchase_date,
      expiration_date: editableDetail.expiration_date,
    });
    putFoodData(propsUserData?.user_id, food_id, {
      food_amount: parseInt(editableDetail.food_amount, 10),
      purchase_date: editableDetail.purchase_date,
      expiration_date: editableDetail.expiration_date,
    })
      .then((response) => {
        console.log(response);
        modalOpen("수정이 완료되었습니다.");
      })
      .then(() => {
        return new Promise((resolve) => {
          setTimeout(resolve, 1000); // 1000ms 지연
        });
      })
      .then(() => {
        navigate("/");
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableDetail((prevDetail) => ({
      ...prevDetail,
      [name]:
        name === "purchase_date" || name === "expiration_date"
          ? value + "T00:00:00.000Z"
          : value,
    }));
  };

  const daysLeft = calculateDaysLeft(foodDetail.expiration_date);
  const ALERT_DATE = 3;

  return (
    <>
      <div className="foodDetailPage">
        <div className="undoSection">
          <button className="undoButton" onClick={() => navigate(-1)} />
        </div>
        <div className="foodDetail">
          <div className="detailImage">
            {foodDetail.food_pic ? (
              <img src={foodDetail.food_pic} alt={foodDetail.food_name} />
            ) : (
              <span>No Images</span>
            )}
          </div>
          <div className="detailText">
            <span className="detailTitle">ℹ️&nbsp;{foodDetail.food_name}</span>
            <div className="detailRow">
              <span className="detailInfo">◦ 식품명 :&nbsp;&nbsp;</span>
              <span className="foodName">{foodDetail.food_name}</span>
            </div>
            <div className="detailRow">
              <span className="detailInfo">◦ 카테고리 :&nbsp;&nbsp;</span>
              <span className="category">{foodDetail.category}</span>
            </div>
            <div className="detailRow">
              <span className="detailInfo">◦ 수량 :&nbsp;&nbsp;</span>
              <input
                className="editableInput"
                type="number"
                name="food_amount"
                min="1"
                value={editableDetail.food_amount}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="detailRow">
              <span className="detailInfo">◦ 구입 날짜 :&nbsp;&nbsp;</span>
              <input
                className="editableInput"
                type="date"
                name="purchase_date"
                value={editableDetail.purchase_date.split("T")[0]}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="expirationDateWrapper">
              <span className="detailInfo">◦ 유통 기한 :&nbsp;&nbsp;</span>
              <input
                className="editableInput"
                type="date"
                name="expiration_date"
                value={editableDetail.expiration_date.split("T")[0]}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="detailRow">
              <span className="remainingTime">
                {daysLeft < 0 && (
                  <span style={{ color: "red" }}>
                    (유통기한 지남, D+{Math.abs(daysLeft)})
                  </span>
                )}
                {daysLeft >= 0 && (
                  <>
                    {daysLeft <= ALERT_DATE ? (
                      <span style={{ color: "red" }}>(D-{daysLeft})</span>
                    ) : (
                      <span>(D-{daysLeft})</span>
                    )}
                  </>
                )}
              </span>
            </div>
            <div className="saveSection">
              <button className="saveButton" onClick={() => handleSave()}>
                수정
              </button>
            </div>
          </div>
        </div>
        <div className="tipSection">
          <span>◦ Tip</span>
          <div className="chatGPTSection">
            {foodTip ? (
              <textarea
                className="w-full h-full bg-inherit p-4 leading-7"
                value={foodTip}
                readOnly
              />
            ) : (
              <button
                onClick={() => {
                  setFoodTip("잠시만 기다려주세요...");
                  postFoodTips(foodDetail.food_name).then((response) => {
                    setFoodTip(response);
                  });
                }}
              >
                버튼을 눌러 팁 확인하기
              </button>
            )}
          </div>
        </div>
      </div>
      <CompleteModal
        isModalOpen={isModalOpen}
        message={successMessage}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default FoodDetailPage;