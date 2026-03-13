import { Injectable } from '@nestjs/common';
import { DocumentParser } from 'src/processing/parser/document.parser';

@Injectable()
export class DocumentsService {
    private parser = new DocumentParser()

    async processUpload(file:Express.Multer.File){
        const text = await this.parser.parse(file)
        return {
            filename:file.originalname,
            textLength:text.length
        }
    }

}
