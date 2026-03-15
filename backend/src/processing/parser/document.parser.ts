import { PDFParse } from "pdf-parse"

export class DocumentParser {

  async parse(file: Express.Multer.File): Promise<string> {

    const filename = file.originalname.toLowerCase()
    const buffer = file.buffer

    if (filename.endsWith(".pdf")) {
      return this.parsePDF(buffer)
    }

    if (filename.endsWith(".md")) {
      return this.parseMarkdown(buffer)
    }

    if (filename.endsWith(".txt")) {
      return this.parseText(buffer)
    }

    throw new Error("Unsupported file type")
  }

  private async parsePDF(buffer: Buffer): Promise<string> {

    const parser = new PDFParse({ data: buffer })

    const data = await parser.getText()

    return data.text
  }

  private parseMarkdown(buffer: Buffer): string {
    return buffer.toString()
  }

  private parseText(buffer: Buffer): string {
    return buffer.toString()
  }

}