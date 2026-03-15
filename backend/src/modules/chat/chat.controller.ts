import { Controller,Post,Body } from '@nestjs/common';
import { RetrievalService } from '../rag/retrieval.service';

@Controller('chat')
export class ChatController {
    constructor(private readonly retrievalService:RetrievalService){}

    @Post("search")
        async search(@Body("question") question:string){
            return this.retrievalService.retrieveRelevantDocuments(question)
        }
    
    
}
