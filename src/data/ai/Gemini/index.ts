import {GoogleGenAI} from "@google/genai";

import {IAIEngine, IGenerateMessageOptions, IGenerateMessageResult} from "../IAIEngine";
import {AiError} from "../AiError";

const model = "models/gemini-3.5-flash";
const temperature = 0.7;

export class GeminiEngine implements IAIEngine {
  private readonly ai = new GoogleGenAI({});

  async generateMessage(options: IGenerateMessageOptions): Promise<IGenerateMessageResult> {
    const response = await this.ai.models.generateContent({
      model,
      contents: options.question,
      config: {
        systemInstruction: options.systemInstruction,
        temperature,
      }
    });

    if (!response.text) {
      throw new AiError("No response from the model");
    }

    return {answer: response.text};
  }
}
