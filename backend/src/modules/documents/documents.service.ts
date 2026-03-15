import { Injectable } from '@nestjs/common';
import { TextChunker } from 'src/processing/chunking/text.chunker';
import { DocumentParser } from 'src/processing/parser/document.parser';
import { EmbeddingsService } from 'src/infrastructure/embeddings/embeddings.service';
import { VectorService } from 'src/infrastructure/vector/vector.service';

@Injectable()
export class DocumentsService {

    private parser = new DocumentParser()

    constructor(private chunker : TextChunker,private embeddingsService:EmbeddingsService,private vectorService:VectorService) {}
    
    async processUpload(file:Express.Multer.File){
    
        const text = await this.parser.parse(file)
    
        const chunks = this.chunker.splitText(text)

        const embeddings:number[][] =[]

        for(let i=0;i<chunks.length;i++){
           const chunk = chunks[i]
           const embedding = await this.embeddingsService.createEmbedding(chunk)
           embeddings.push(embedding)
           await this.vectorService.storeEmbeddings(
            `chunk-${i}`,
            embedding,
            chunk
           )
        }
    
        return {
            filename:file.originalname,
            chunks:chunks.length,
            embeddingsGenerated: embeddings.length
        }
    }

}
