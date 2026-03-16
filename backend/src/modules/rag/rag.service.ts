import { Injectable } from "@nestjs/common"
import { RetrievalService } from "./retrieval.service"
import { LlmService } from "../../infrastructure/llm/llm.service"

@Injectable()
export class RagService {

  constructor(
    private retrievalService: RetrievalService,
    private llmService: LlmService
  ) {}

  async ask(question: string) {

    const chunks = await this.retrievalService.retrieveRelevantDocuments(question)

    const context = chunks.join("\n")

    const prompt = `
Answer the question using ONLY the provided context.

Context:
${context}

Question:
${question}
`

    return this.llmService.generateAnswer(prompt)
  }

}