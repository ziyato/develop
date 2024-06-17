import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MyPage.css";
import noImage from "../assets/noImage.jpeg";
import CompleteModal from "../components/CompleteModal/CompleteModal.jsx";
import { getProfile, putUserProfile } from "../apis/getUserAPI.js";

const MyPage = ({ user, initializeUser }) => {
  const navigate = useNavigate();

  const [notificationOn, setNotificationOn] = useState(false);
  const [alertDate, setAlertDate] = useState(user?.alert_date || "");
  const [photoURL, setPhotoURL] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [pwInput, setPWInput] = useState();
  const [pwCheckInput, setPWCheckInput] = useState();

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoURL(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  function modalOpen(message) {
    setSuccessMessage(message);
    setIsModalOpen(true);
    setTimeout(() => {
      setIsModalOpen(false);
    }, 1000);
  }

  function changePW(user, pwInput, pwCheckInput) {
    if (pwInput == pwCheckInput) {
      putUserProfile(user.user_id, {
        password: pwInput,
        alert_date: alertDate,
      })
        .then(async () => {
          console.log("유저아이디:", user.user_id);
          const editedProfile = await getProfile(user.user_id);
          sessionStorage.setItem("user", JSON.stringify(editedProfile));
          initializeUser();
        })
        .then(() => {
          modalOpen("비밀번호가 변경되었습니다.");
          setPWInput("");
          setPWCheckInput("");
        });
    } else {
      modalOpen("비밀번호 변경에 실패하였습니다.");
    }
  }

  const handlePWInputChange = (e) => setPWInput(e.target.value);
  const handlePWCheckInputChange = (e) => setPWCheckInput(e.target.value);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    if (alertDate) {
      setNotificationOn(true);
    }
  }, []);

  return (
    <>
      <div className="my-page-container">
        <h1 className="text-3xl mt-5 w-full font-bold border-b-2 border-slate-300 pb-5">
          내 정보
        </h1>
        <div className="flex">
          {/* 왼쪽 섹션 */}
          <div className="left-section">
            <div className="user-photo">
              <img
                src={user?.profile_pic || photoURL || noImage}
                alt="프로필 사진"
              />
            </div>
            <input
              type="file"
              accept="image/jpeg,image/png"
              className="file-input"
              onChange={handlePhotoUpload}
            />
            <button
              className="change-photo-btn"
              onClick={() => document.querySelector(".file-input").click()}
            >
              파일 선택
            </button>
          </div>

          {/* 오른쪽 섹션 */}
          <div className="right-section">
            <div className="flex flex-col items-center space-y-20">
              <div className="flex flex-col gap-4">
                <InputForm
                  title="이름"
                  name="username"
                  inputValue={user?.username}
                />
                <InputForm
                  title="아이디"
                  name="email"
                  inputValue={user?.email}
                />
                <InputForm
                  title="비밀번호 수정"
                  name="password"
                  type="password"
                  handleChange={handlePWInputChange}
                  inputValue={pwInput}
                />
                <InputForm
                  title="비밀번호 확인"
                  name="password"
                  type="password"
                  handleChange={handlePWCheckInputChange}
                  inputValue={pwCheckInput}
                />
                <InputForm
                  title="가입 일자"
                  name="join_date"
                  inputValue={user?.join_date.slice(0, 10)}
                  isReadOnly={true}
                />
                <div className="mt-2 flex place-items-center">
                  <div className="min-w-32 text-right pr-5">알림 설정</div>
                  <div className="relative mt-2">
                    <input
                      type="checkbox"
                      id="toggle"
                      hidden
                      checked={notificationOn}
                      onChange={() => setNotificationOn(!notificationOn)}
                    />
                    <label htmlFor="toggle" className="toggleSwitch">
                      <span className="toggleButton"></span>
                    </label>
                  </div>
                </div>

                {notificationOn && (
                  <div className="mt-2 flex place-items-center">
                    <div className="min-w-32 text-right mt-2 pr-5">
                      알림 기준일
                    </div>
                    <div className="relative mt-2">
                      <select
                        id="notification-date"
                        className="date-select-box"
                        value={alertDate}
                        onChange={(e) => setAlertDate(e.target.value)}
                      >
                        <option value="">선택하세요</option>
                        {Array.from({ length: 31 }, (_, i) => (
                          <option key={i + 1} value={i + 1}>
                            {i + 1}일
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-6 mb-20">
          <button
            className="cancel-button mr-6 w-20 h-11"
            onClick={() => navigate("/")}
          >
            취소
          </button>
          <button
            className="save-button w-20 h-11"
            onClick={() => changePW(user, pwInput, pwCheckInput)}
          >
            저장
          </button>
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

function InputForm({
  title,
  name,
  handleChange,
  inputValue,
  type = "text",
  isReadOnly = false,
}) {
  return (
    <div className="mt-2 flex place-items-center">
      <div className="min-w-32 text-right pr-5">{title}</div>
      <input
        type={type}
        name={name}
        className="block w-full max-w-xs h-9 rounded-md border-0 py-1.5 pl-3 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 leading-6"
        onChange={handleChange}
        value={inputValue}
        readOnly={isReadOnly}
      />
    </div>
  );
}

export default MyPage;
