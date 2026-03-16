import { Controller,Post,Body } from '@nestjs/common';
import { RetrievalService } from '../rag/retrieval.service';
import { RagService } from '../rag/rag.service';

@Controller('chat')
export class ChatController {
    constructor(private readonly retrievalService:RetrievalService,private readonly ragService:RagService){}

    @Post("search")
        async search(@Body("question") question:string){
            return this.retrievalService.retrieveRelevantDocuments(question)
        }
    @Post('ask')
    async ask(@Body("question") question:string){
        return this.ragService.ask(question)
    }
    
}
