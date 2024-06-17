import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_ORGANIZATION_KEY = process.env.OPENAI_ORGANIZATION_KEY;
const OPENAI_PROJECT_KEY = process.env.OPENAI_PROJECT_KEY;

class RecipeService {
  constructor() {
    this.openai = new OpenAI({
      apiKey: OPENAI_API_KEY,
      organization: OPENAI_ORGANIZATION_KEY,
      project: OPENAI_PROJECT_KEY,
    });
  }

  async getRecipe(foodData) {
    const openAIMessages = {
      system: `너는 세계 최고의 '요리' 전문가야.
        나에겐 '${foodData}'의 재료가 있는데, 이 재료를 모두 사용해서 어떤 요리를 만들 수 있을까?
        웬만하면 한식으로 먹고 싶은데, 추천하는 요리 이름 3개만, 그 중에서 가장 추천하는 요리의 레시피는 상세하게 적어줘.
        네가 대답을 시작할 때 '제가 추천하는 요리는 1. 무엇 2. 무엇 3. 무엇 입니다. 그 중에서 가장 추천하는 요리의 레시피는 다음과 같습니다.'라고 말해줘.`,
    };
    console.log("openAIMessages :", openAIMessages.system)

    try {
      const completion = await this.openai.chat.completions.create({
        messages: [{ role: "system", content: openAIMessages.system }],
        model: "gpt-4",
        max_tokens: 1024,
        temperature: 1, // 창의성
      });
      console.log(completion.choices);
      return completion.choices[0].message.content;
    } catch (error) {
      console.error("Error fetching data from OpenAI API:", error);
      throw error;
    }
  }
}

const recipeService = new RecipeService();

export default recipeService;
