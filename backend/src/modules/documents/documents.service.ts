import { Injectable } from '@nestjs/common';
import { TextChunker } from 'src/processing/chunking/text.chunker';
import { DocumentParser } from 'src/processing/parser/document.parser';
import { EmbeddingsService } from 'src/infrastructure/embeddings/embeddings.service';

@Injectable()
export class DocumentsService {

    private parser = new DocumentParser()

    constructor(private chunker : TextChunker,private embeddingsService:EmbeddingsService) {}
    
    async processUpload(file:Express.Multer.File){
    
        const text = await this.parser.parse(file)
    
        const chunks = this.chunker.splitText(text)

        const embeddigns:number[][] =[]

        for(const chunk of chunks){
            const vector = await this.embeddingsService.createEmbedding(chunk)
            embeddigns.push(vector)
        }
    
        return {
            filename:file.originalname,
            chunks:chunks.length,
            embeddingsGenerated: embeddigns.length
        }
    }

}
