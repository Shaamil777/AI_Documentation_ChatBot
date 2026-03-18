import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { GoogleGenerativeAI } from "@google/generative-ai";

@Injectable()
export class LlmService {
  private genAI: GoogleGenerativeAI;

  constructor(private configService: ConfigService) {
    this.genAI = new GoogleGenerativeAI(this.configService.get<string>('GEMINI_API_KEY') || '');
  }

  async generateAnswer(prompt: string): Promise<string> {
    console.log("LLM PROMPT RECEIVED:", prompt.slice(0, 100) + '...');

    try {
      const model = this.genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
      const result = await model.generateContent(prompt);
      
      return result.response.text();
    } catch (error) {
      console.error("Gemini Error:", error);
      return "I encountered an error while trying to process your request via Gemini.";
    }
  }
}
