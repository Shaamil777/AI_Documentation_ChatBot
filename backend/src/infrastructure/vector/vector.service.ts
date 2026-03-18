import { Injectable, OnModuleInit } from "@nestjs/common";
import { ChromaClient } from "chromadb";

class NoOpEmbeddingFunction {
    async generate(_texts: string[]): Promise<number[][]> {
        throw new Error("Embeddings must be provided explicitly.");
    }
}

@Injectable()
export class VectorService implements OnModuleInit {
    private client: ChromaClient;
    private collection: any;

    constructor() {
        this.client = new ChromaClient({
            path: "http://localhost:8000"
        });
    }

    async onModuleInit() {
        this.collection = await this.client.getOrCreateCollection({
            name: "documents",
            embeddingFunction: new NoOpEmbeddingFunction()
        });
    }
    async storeEmbeddings(id:string,embeddings:number[],text:string,metadata:any){
        await this.collection.add({
            ids:[id],
            embeddings:[embeddings],
            documents:[text],
            metadatas:[metadata]
        })
    }
    async searchSimiliar(embeddings:number[],topK:number=3){
        const results = await this.collection.query({
            queryEmbeddings:[embeddings],
            nResults:topK
        })
        return results
    }
    async getAll() {
        const results = await this.collection.get()
        console.log(results)
        return results
    }
    async clear() {
        await this.client.deleteCollection({
            name: "documents"
        });

        this.collection = await this.client.getOrCreateCollection({
            name: "documents",
            embeddingFunction: new NoOpEmbeddingFunction()
        });

        return "Collection reset";
    }
}