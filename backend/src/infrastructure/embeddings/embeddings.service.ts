import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { response } from "express";
import OpenAI from "openai";

@Injectable()
export class EmbeddingsService{
    private openai:OpenAI

    constructor(private configService:ConfigService) {
        this.openai = new OpenAI({
            apiKey : this.configService.get<string>('OPENAI_API_KEY')
        })
    }
   async createEmbedding(text: string): Promise<number[]> {

  try {
    const response = await this.openai.embeddings.create({
      model: "text-embedding-3-small",
      input: text
    })
    return response.data[0].embedding
  } catch (error) {
    console.log("Using mock embedding")
    return Array(1536).fill(0).map(() => Math.random())

  }

}
}