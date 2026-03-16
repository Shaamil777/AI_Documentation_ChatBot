import { Injectable } from "@nestjs/common"

@Injectable()
export class LlmService {

  async generateAnswer(prompt: string): Promise<string> {

    console.log("LLM PROMPT RECEIVED:")
    console.log(prompt)

    // mock answer
    return `
This is a mock AI response.

The system retrieved context from the document and would normally generate an answer using an LLM.

Prompt received by the model:
${prompt.slice(0, 200)}...
`
  }

}