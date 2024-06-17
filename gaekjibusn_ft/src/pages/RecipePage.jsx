import React, { useEffect, useRef, useState } from "react";
import "./RecipePage.css";
import { postRecipe } from "../apis/getFoodAPI";

const RecipePage = ({ location, recipeFood }) => {
  const { state } = location || {};
  const { selectedItems } = state || {};
  const [recipeData, setRecipeData] = useState([]);

  const recipeBoxRef = useRef(null);

  const handleCopy = () => {
    if (recipeBoxRef.current) {
      const range = document.createRange();
      range.selectNodeContents(recipeBoxRef.current);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      document.execCommand("copy");
      alert("레시피 내용이 복사되었습니다!");
    }
  };
  async function getRecipeData(foods) {
    try {
      console.log(foods)
      const result = await postRecipe(foods);
      console.log(result);
      return result;
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    console.log(recipeFood);
    if (!recipeFood) {
      setRecipeData("음식을 선택하고 레시피 검색 버튼을 눌러주세요.");
    } else {
      setRecipeData("레시피를 불러오는 중입니다...");
      getRecipeData(recipeFood).then((data) => {
        setRecipeData(data);
      });
    }
  }, []);

  return (
    <div className="RecipePage">
      <div className="RecipeHeader">
        {recipeFood && recipeFood.length > 0 && (
          <h2> {recipeFood.join(", ")}을 이용한 레시피</h2>
        )}
      </div>
      <div className="RecipeBox" ref={recipeBoxRef}>
        <textarea
          className=" w-full h-full"
          value={recipeData}
          readOnly
          />
      </div>
      <button className="copyButton" onClick={handleCopy}>
        복사
      </button>
      <ul>
        {selectedItems &&
          selectedItems.map((itemName, index) => (
            <li key={index}>{itemName}</li>
          ))}
      </ul>
    </div>
  );
};

export default RecipePage;
