import { Injectable } from "@nestjs/common";
import { EmbeddingsService } from "src/infrastructure/embeddings/embeddings.service";
import { VectorService } from "src/infrastructure/vector/vector.service";

@Injectable()
export class RetrievalService{
    constructor(private embeddingService:EmbeddingsService,private vectorService:VectorService){}

    async retrieveRelevantDocuments(query:string){
        const embeddigns = await this.embeddingService.createEmbedding(query)
        const results = await this.vectorService.searchSimiliar(embeddigns)
        if (!results || !results.documents || results.documents.length === 0) {
            return []
        }

        return results.documents[0]
    }
}