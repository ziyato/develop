import React, { useState } from "react";
import "./ToastModal.css";
import { postFoodData } from "../../apis/getFoodAPI";

const ToastModal = ({ isOpen, onClose, user_id, fetchData }) => {
  const [foodName, setFoodName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [manufacturingDate, setManufacturingDate] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [category, setCategory] = useState("");
  const [photoURL, setPhotoURL] = useState("");

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setPhotoURL(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const resetForm = () => {
    setFoodName("");
    setQuantity("");
    setManufacturingDate("");
    setExpiryDate("");
    setCategory("");
    setPhotoURL("");
  };

  const handleCancel = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = (e) => {
    const newItem = {
      food_name: foodName,
      food_pic: photoURL,
      category: category,
      food_amount: parseInt(quantity, 10), // quantity 정수로 변환
      purchase_date: new Date(manufacturingDate).toISOString(),
      expiration_date: new Date(expiryDate).toISOString(),
      user_id: user_id,
    };

    postFoodData(user_id, newItem).then(() => {
      fetchData();
      resetForm();
      onClose();
    });
  };

  return (
    isOpen && (
      <div className="toast-modal-overlay">
        <div
          className="toast-modal-content"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="registration-title">식품 등록</h2>

          <div className="left_section">
            <div className="user-photo">
              {photoURL && <img src={photoURL} alt="프로필 사진" />}
              <input
                type="file"
                accept="image/jpeg,image/png"
                className="file-input"
                onChange={handlePhotoUpload}
                style={{ display: "none" }}
              />
              <button
                className="change-photobtn"
                onClick={() => document.querySelector(".file-input").click()}
              >
                사진 선택
              </button>
            </div>
          </div>
          <div className="right_section">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>음식 이름:</label>
                <input
                  type="text"
                  value={foodName}
                  onChange={(e) => setFoodName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>수량:</label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>제조일자:</label>
                <input
                  type="date"
                  value={manufacturingDate}
                  onChange={(e) => setManufacturingDate(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>유통기한:</label>
                <input
                  type="date"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>카테고리:</label>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                />
              </div>
              <div className="button-group">
                <button
                  className="cancel-button"
                  type="button"
                  onClick={() => handleCancel()}
                >
                  취소
                </button>
                <button
                  className="submit-button"
                  type="submit"
                  onClick={() => handleSubmit()}
                >
                  완료
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  );
};

export default ToastModal;
