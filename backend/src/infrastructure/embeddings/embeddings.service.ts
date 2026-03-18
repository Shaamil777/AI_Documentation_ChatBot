import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { GoogleGenerativeAI } from "@google/generative-ai";

@Injectable()
export class EmbeddingsService {
  private genAI: GoogleGenerativeAI;

  constructor(private configService: ConfigService) {
    this.genAI = new GoogleGenerativeAI(this.configService.get<string>('GEMINI_API_KEY') || '');
  }

  async createEmbedding(text: string): Promise<number[]> {
    try {
      const model = this.genAI.getGenerativeModel({ model: "gemini-embedding-001" });
      const result = await model.embedContent(text);
      return result.embedding.values;
    } catch (error) {
      console.error("Embedding Error:", error);
      throw error;
    }
  }
}
