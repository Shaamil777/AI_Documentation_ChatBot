import { Injectable,OnModuleInit } from "@nestjs/common";
import { ChromaClient } from "chromadb";

@Injectable()
export class VectorService{
    private client:ChromaClient
    private collection:any

    constructor(){
        this.client = new ChromaClient({
            path:"http://localhost:8000"
        })
    }
    async onModuleInit(){
        this.collection = await this.client.getOrCreateCollection({
            name:"documents",
            embeddingFunction:null
        })
    }
    async storeEmbeddings(id:string,embeddings:number[],text:string){
        await this.collection.add({
            ids:[id],
            embeddings:[embeddings],
            documents:[text]
        })
    }
    async getAll() {
        const results = await this.collection.get()
        console.log(results)
        return results
    }
   async clear() {
    await this.client.deleteCollection({
        name: "documents"
    })

    this.collection = await this.client.getOrCreateCollection({
        name: "documents"
    })

    return "Collection reset"
    }
}