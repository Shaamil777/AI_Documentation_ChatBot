import { Module } from '@nestjs/common';
import { DocumentsController } from './documents.controller';
import { DocumentsService } from './documents.service';
import { TextChunker } from 'src/processing/chunking/text.chunker';
import { EmbeddingsModule } from 'src/infrastructure/embeddings/embeddings.module';
import { VectorModule } from 'src/infrastructure/vector/vector.module';

@Module({
  controllers: [DocumentsController],
  providers: [DocumentsService,TextChunker],
  imports:[EmbeddingsModule,VectorModule]
})
export class DocumentsModule {}
