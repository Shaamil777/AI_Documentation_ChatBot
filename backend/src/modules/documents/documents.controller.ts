import { Controller, UseInterceptors,Post,Get } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadedFile } from '@nestjs/common';
import { VectorService } from 'src/infrastructure/vector/vector.service';

@Controller('documents')
export class DocumentsController {

    constructor(private readonly documentService: DocumentsService,private readonly VectorService:VectorService) {}
        @Post('upload')
        @UseInterceptors(FileInterceptor('file'))
        async uploadFile(@UploadedFile() file: Express.Multer.File) {
            return this.documentService.processUpload(file)
        }

        @Get("vectors")
        async getAll() {
            return this.VectorService.getAll()
        }
        @Get("clear")
        async clear() {
            return this.VectorService.clear()
        }
    }


