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

    if (!chunks || chunks.length === 0) {
      return {
        answer: "I could not find relevant information in the uploaded documents.",
        sources: []
      }
    }

   const context = chunks
  .slice(0,3)
  .map((c,i)=>`Source ${i+1}:\n${c.text}`)
  .join("\n")

    const prompt = `
You are an AI assistant answering questions about uploaded documentation.

Use ONLY the provided context to answer the question.

If the answer cannot be found in the context, respond with:
"I cannot find the answer in the provided documentation."

Context:
${context}

Question:
${question}

Answer:
`

    const answer = await this.llmService.generateAnswer(prompt)

    return {
      answer,
      sources: chunks.slice(0, 3)
    }
  }
}