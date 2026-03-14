import { Injectable } from '@nestjs/common';
import { TextChunker } from 'src/processing/chunking/text.chunker';
import { DocumentParser } from 'src/processing/parser/document.parser';

@Injectable()
export class DocumentsService {

    private parser = new DocumentParser()

    constructor(private chunker : TextChunker) {}
    
    async processUpload(file:Express.Multer.File){
    
        const text = await this.parser.parse(file)
    
        const chunks = this.chunker.splitText(text)
    
        return {
            filename:file.originalname,
            chunks:chunks.length
        }
    }

}
