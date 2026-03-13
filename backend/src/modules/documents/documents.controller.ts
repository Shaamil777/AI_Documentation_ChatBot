import { Controller, UseInterceptors,Post } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadedFile } from '@nestjs/common';

@Controller('documents')
export class DocumentsController {

    constructor(private readonly documentService: DocumentsService) {}
        @Post('upload')
        @UseInterceptors(FileInterceptor('file'))
        async uploadFile(@UploadedFile() file: Express.Multer.File) {
            return this.documentService.processUpload(file)
        }
    }


