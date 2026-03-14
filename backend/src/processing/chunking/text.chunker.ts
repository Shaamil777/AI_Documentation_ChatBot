import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class TextChunker{
    constructor(private configService:ConfigService){}

    splitText(text:string){
        const chunkSize = this.configService.get('CHUNK_SIZE')
        const overlap = this.configService.get('CHUNK_OVERLAP')

        const chunks:string[] = []

        let start = 0

        while(start<text.length){
            let end = start + chunkSize
            let chunk = text.slice(start,end)
            chunks.push(chunk)
            start += chunkSize-overlap
        }
        return chunks
    }

}