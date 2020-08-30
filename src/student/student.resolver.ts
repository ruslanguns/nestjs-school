import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { CreateStudentInput } from './student.input';
import { StudentService } from './student.service';
import { StudentType } from './student.type';

@Resolver(of => StudentType)
export class StudentResolver {

  constructor(
    private readonly studentService: StudentService
  ) {}

  @Query(returns => StudentType)
  async student(
    @Args('id') id: string
  ) {
    return await this.studentService.getStudent(id)
  }

  @Query(returns => [StudentType])
  async students() {
    return await this.studentService.getStudents();
  }

  @Mutation(returns => StudentType)
  async createStudent(
    @Args('createStudentInput') createStudentInput: CreateStudentInput
  ) {
    return await this.studentService.createStudent(createStudentInput);
  }

  @Mutation(returns => StudentType)
  async deleteStudent(
    @Args('id') id: string
  ) {
    return await this.studentService.deleteStudent(id);
  }

}