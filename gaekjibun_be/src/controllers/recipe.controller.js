import recipeService from "../services/recipe.service";



const getRecipe = async (req, res, next) => {
  /**
   * @typedef {Object} inputData
   * @property {string[]} foods - 음식 재료 목록
   */
  const { foods } = req.body;

  if (!foods || !Array.isArray(foods) || foods.length === 0) {
    return next(new Error("foods is required and should be a non-empty array"));
  }

  try {
    const recipeData = await recipeService.getRecipe(foods);

    if (!recipeData) {
      res.status(404).send("GPT 문제생김 나중에 해결바람");
    } else {
      res.status(200).json(recipeData);
    }
  } catch (error) {
    console.error("Error in getRecipe handler:", error);
    res.status(500).send("Internal Server Error");
  }
};

export default {
  getRecipe,
};
