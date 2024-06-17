// front/src/components/FoodTable.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const headers = [
  { text: "사진", value: "food_pic" },
  { text: "식품명", value: "food_name" },
  { text: "카테고리", value: "category" },
  { text: "유통기한", value: "expiration_date" },
  { text: "수량", value: "food_amount" },
];

// 남은 일수 계산하는 함수
export const calculateDaysLeft = (expirationDate) => {
  const today = new Date();
  const expireDate = new Date(expirationDate);
  today.setUTCHours(0, 0, 0, 0); // 현재 날짜 시간을 00:00:00으로 설정
  expireDate.setUTCHours(0, 0, 0, 0); // 유통기한 날짜 시간 00:00:00으로 설정
  const remainingTime = Math.ceil((expireDate - today) / (1000 * 60 * 60 * 24)); // 남은 일수 계산
  return remainingTime;
};

function FoodTable({
  headers,
  items,
  setItems,
  onDelete,
  user,
  sortItems,
  sortCriteria,
  sortDirection,
  setSortCriteria,
  setSortDirection,

  setSelectedFoodNames,
  setSelectedFoodID,
}) {
  const navigate = useNavigate();
  const { alert_date } = user;
  const [selection, setSelection] = useState([]); // 선택된 항목들 관리하는 state, food_id 담김
  const [notifications, setNotifications] = useState([]);
  const headerKey = headers.map((header) => header.value); // 헤더의 value 값 배열로 변환

  // 정렬 함수
  const handleSort = (criteria) => {
    // 현재 정렬 기준과 같은 경우 방향 반대로, 다른 경우는 오름차순으로 설정
    const newDirection = criteria === sortCriteria ? !sortDirection : true;
    setSortCriteria(criteria); // 새로운 정렬 기준 설정
    setSortDirection(newDirection); // 새로운 정렬 방향 설정
    const sortedItems = sortItems(items, criteria, newDirection); // 정렬된 아이템 리스트 반환
    setSelection([]); // 정렬 후 선택 상태 초기화
    return sortedItems; // 정렬된 아이템 반환
  };

  // 유통기한이 지난 아이템을 찾아 알림에 추가하는 함수
  useEffect(() => {
    const expiredItems = items.filter(
      (item) => calculateDaysLeft(item.expiration_date) < 0
    );
    const expiredNotifications = expiredItems.map(
      (item) => `유통기한이 지난 식품: ${item.food_name}`
    );
    setNotifications(expiredNotifications);
  }, [items]); // items 배열이 업데이트될 때마다 실행

  // 헤더 렌더링 함수 + 정렬 기능
  const renderHeaderWithSort = () => {
    return headers.map((header) => (
      <th key={header.text}>
        {header.text}
        {header.text === "식품명" ||
        header.text === "카테고리" ||
        header.text === "유통기한" ? (
          <button
            style={{ paddingLeft: "10px" }}
            onClick={() => handleSort(header.value)}
          >
            {items.length === 0
              ? "↕"
              : sortCriteria === header.value
              ? sortDirection
                ? "▲"
                : "▼"
              : "↕"}
          </button>
        ) : null}
      </th>
    ));
  };
  // 삭제 버튼 클릭 시 호출되는 함수
  const handleDelete = () => {
    const selectedItems = items.filter((item) =>
      selection.includes(item.food_id)
    ); // 선택된 항목만 필터링하여 배열 생성
    onDelete(selectedItems); // 선택된 항목 삭제
    setSelection([]); // 선택 상태 초기화

    // 체크박스 선택 해제
    const checkboxes = document.querySelectorAll(
      '.foodTable tbody input[type="checkbox"]'
    );
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
  };

  // FoodTable에 handleDelete 함수 연결
  FoodTable.handleDelete = handleDelete;

  // 체크박스 선택 상태 변경 함수
  const onChangeSelect = (food_id) => {
    let newSelection;
    if (selection.includes(food_id)) {
      newSelection = selection.filter((selected_id) => selected_id !== food_id); // 이미 선택된 항목이면 선택 해제
    } else {
      newSelection = [...selection, food_id]; // 선택되지 않은 항목이면 선택 추가
    }
    setSelection(newSelection); // 선택 상태 업데이트
    setSelectedFoodNames(
      newSelection.map(
        (id) => items.find((item) => item.food_id === id).food_name
      )
    );
    setSelectedFoodID(
      newSelection.map(
        (id) => items.find((item) => item.food_id === id).food_id
      )
    );
  };

  // 전체 선택 체크박스 상태 변경 함수
  const onChangeSelectAll = (e) => {
    if (e.target.checked) {
      const allCheckedSelection = items.map((item) => item.food_id); // 모든 아이템의 food_id 배열 추출
      setSelection(allCheckedSelection); // 전체 선택 상태
    } else {
      setSelection([]); // 선택 해제 상태
    }
  };

  // 전체 선택 여부 확인 함수
  const isSelectedAll = () => {
    return items.length > 0 && selection.length === items.length;
  };

  // 각 행 클릭 시 상세 페이지로 이동하는 함수
  const handleRowClick = (food_id) => {
    navigate(`/food/${food_id}`);
  };

  return (
    <div className="tableContainer">
      <table className="foodTable">
        <thead className="tableHeader">
          <tr>
            <th>
              <input
                type="checkbox"
                checked={isSelectedAll()}
                onChange={onChangeSelectAll}
              />
            </th>
            {renderHeaderWithSort()}
          </tr>
        </thead>
        <tbody>
          {/* 아이템 없는 경우 화면에 없다고 표시 */}
          {items.length === 0 ? (
            <tr className="noItemsRow" style={{ height: "100%", border: "" }}>
              <td
                colSpan={headers.length + 1}
                style={{
                  border: "none",
                  textAlign: "center",
                  padding: "0",
                  fontSize: "16px",
                  height: "570px",
                  verticalAlign: "middle",
                }}
              >
                등록된 식품이 없습니다.
              </td>
            </tr>
          ) : (
            items.map((item, index) => (
              <tr
                key={index}
                className={selection.includes(item.food_id) ? "select_row" : ""}
                style={{ cursor: "pointer" }}
                onClick={() => handleRowClick(item.food_id)} // 행 클릭 시 상세 페이지로 이동
              >
                <td
                  onClick={(e) => e.stopPropagation()}
                  style={{ cursor: "default" }}
                >
                  <input
                    type="checkbox"
                    checked={selection.includes(item.food_id)}
                    onChange={(e) => {
                      onChangeSelect(item.food_id);
                    }}
                  />
                </td>
                {headerKey.map((key, idx) => (
                  <td
                    key={idx}
                    style={{
                      // 알림 기준 일수보다 남은 일수가 적으면 배경색 변경
                      backgroundColor:
                        key === "expiration_date"
                          ? calculateDaysLeft(item.expiration_date) <=
                            alert_date
                            ? "#FFCDCD"
                            : "transparent"
                          : "transparent",
                    }}
                  >
                    {key === "food_pic" ? (
                      item[key] ? (
                        <img
                          src={item[key]}
                          alt=""
                          style={{ width: "120px", height: "100px" }}
                        />
                      ) : (
                        <div
                          style={{
                            width: "100%",
                            height: "100px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "15px",
                          }}
                        >
                          No Images
                        </div>
                      )
                    ) : key === "expiration_date" ? (
                      // 유통기한 관련 정보 출력
                      <>
                        <span className="expirationDateText">
                          {item[key].split("T")[0]} {/* 날짜만 표시 */}
                          <br />
                        </span>
                        {calculateDaysLeft(item.expiration_date) < 0 && (
                          // 유통기한 지난 경우
                          <span style={{ color: "red" }}>
                            (유통기한 지남, D+
                            {Math.abs(calculateDaysLeft(item.expiration_date))})
                          </span>
                        )}
                        {calculateDaysLeft(item.expiration_date) >= 0 && (
                          <>
                            {calculateDaysLeft(item.expiration_date) <=
                              alert_date && (
                              // 유통기한 안 지났지만 알림 기준 일수보다 남은 일수가 적은 경우
                              <span style={{ color: "red" }}>
                                {" "}
                                (D-{calculateDaysLeft(item.expiration_date)})
                              </span>
                            )}
                            {calculateDaysLeft(item.expiration_date) >
                              alert_date && (
                              <span>
                                {" "}
                                (D-{calculateDaysLeft(item.expiration_date)})
                              </span>
                            )}
                          </>
                        )}
                      </>
                    ) : (
                      item[key]
                    )}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export { headers, FoodTable };