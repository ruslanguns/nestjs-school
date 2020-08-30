import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuid } from 'uuid';
import { Lesson } from './lesson.entity';
import { Repository } from 'typeorm';
import { CreateLessonInput, AssignStudentsToLessonInput, EditLessonInput } from './inputs';

@Injectable()
export class LessonService {

  constructor(
    @InjectRepository(Lesson)
    private readonly lessonRepository: Repository<Lesson>
  ) {}

  async createLesson(createLessonInput: CreateLessonInput): Promise<Lesson> {
    const { name, startDate, endDate, students } = createLessonInput;
    const lesson = this.lessonRepository.create({
      id: uuid(),
      name,
      startDate,
      endDate,
      students
    });
    return await this.lessonRepository.save(lesson);
  }

  async getLesson(id: string): Promise<Lesson> {
    const lesson = await this.lessonRepository.findOne({id})
    if (!lesson) throw new NotFoundException('Lesson does not exist')
    return lesson;
  }

  async getLessons(): Promise<Lesson[]> {
    return await this.lessonRepository.find();
  }

  async editLesson(id: string, editLessonInput: EditLessonInput) {
    const lesson = await this.getLesson(id);
    const editedLesson = Object.assign(lesson, editLessonInput)
    return await this.lessonRepository.save(editedLesson);
  }

  async deleteLesson(id: string): Promise<Lesson> {
    const lesson = await this.getLesson(id);
    return await this.lessonRepository.remove(lesson)
  }

  async assignStudentsToLesson(assignStudentsToLessonInput: AssignStudentsToLessonInput): Promise<Lesson> {
    const { lessonId, studentIds } = assignStudentsToLessonInput;
    const lesson = await this.lessonRepository.findOne({ id: lessonId });
    lesson.students = Array.from(new Set([...lesson.students, ...studentIds]));
    return this.lessonRepository.save(lesson);
  }

}
