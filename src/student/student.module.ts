import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentService } from './student.service';
import { StudentResolver } from './student.resolver';
import { Student } from './student.entity';
import { LessonModule } from 'src/lesson/lesson.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Student]),
    forwardRef(() => LessonModule)
  ],
  providers: [StudentService, StudentResolver],
  exports: [StudentService]
})
export class StudentModule {}
