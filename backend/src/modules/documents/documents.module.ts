import { Module } from '@nestjs/common';
import { DocumentsController } from './documents.controller';
import { DocumentsService } from './documents.service';
import { TextChunker } from 'src/processing/chunking/text.chunker';

@Module({
  controllers: [DocumentsController],
  providers: [DocumentsService,TextChunker]
})
export class DocumentsModule {}
