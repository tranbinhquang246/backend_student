import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentModule } from './students/students.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/student_test'), StudentModule],
})
export class AppModule {}
