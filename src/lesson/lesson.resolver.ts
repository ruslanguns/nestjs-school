import { Resolver, Query, Mutation, Args, Parent, ResolveField, Subscription } from '@nestjs/graphql';
import { PubSub } from 'apollo-server-express';
import { LessonType } from './lesson.type';
import { LessonService } from './lesson.service';
import { CreateLessonInput, AssignStudentsToLessonInput, EditLessonInput } from './inputs';
import { StudentService } from 'src/student/student.service';
import { Lesson } from './lesson.entity';

const pubSub = new PubSub

@Resolver(of => LessonType)
export class LessonResolver {

  constructor(
    private readonly lessonService: LessonService,
    private readonly studentService: StudentService
  ) {}

  @Query(returns => LessonType)
  async lesson(
    @Args('id') id: string,
  ) {
    return await this.lessonService.getLesson(id); 
  }

  @Query(returns => [LessonType])
  async lessons() {
    return await this.lessonService.getLessons();
  }

  @Mutation(returns => LessonType)
  async createLesson(
    @Args('createLessonInput') createLessonInput: CreateLessonInput
  ) {
    return await this.lessonService.createLesson(createLessonInput)
  }

  @Mutation(returns => LessonType)
  async editLesson(
    @Args('id') id: string,
    @Args('editLessonInput') editLessonInput: EditLessonInput
  ) {
    return await this.lessonService.editLesson(id, editLessonInput)
  }

  @Mutation(returns => LessonType)
  async deleteLesson(
    @Args('id') id: string,
  ) {
    return await this.lessonService.deleteLesson(id);
  }

  @Mutation(returns => LessonType)
  async assignStudentsToLesson(
    @Args('assignStudentsToLessonInput') assignStudentsToLessonInput: AssignStudentsToLessonInput
  ) {
    const addedStudentToLesson = await this.lessonService.assignStudentsToLesson(assignStudentsToLessonInput)
    pubSub.publish('addedStudentToLesson', { addedStudentToLesson })
    return addedStudentToLesson;
  }

  @ResolveField()
  async students(
    @Parent() lesson: Lesson
  ) {
    return await this.studentService.getManyStudents(lesson.students);
  }

  @Subscription(returns => LessonType, {
    name: 'addedStudentToLesson'
  })
  addStudentHandler() {
    return pubSub.asyncIterator('addedStudentToLesson');
  }

}
