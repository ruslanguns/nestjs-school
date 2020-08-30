import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Student } from './student.entity';
import { CreateStudentInput } from './student.input';

@Injectable()
export class StudentService {

  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>
  ) {}

  async createStudent(createStudentInput: CreateStudentInput): Promise<Student> {
    const student = this.studentRepository.create({
      id: uuid(),
      ...createStudentInput
    });
    return await this.studentRepository.save(student);
  }

  async getStudent(id: string): Promise<Student> {
    const student = await this.studentRepository.findOne({id});
    if (!student) throw new NotFoundException('Student does not exist');
    return student;
  }

  async getManyStudents(studentIds: string[]): Promise<Student[]> {
    return await this.studentRepository.find({
      where: {
        id: {
          $in: studentIds
        }
      }
    })
  }

  async getStudents(): Promise<Student[]> {
    return await this.studentRepository.find();
  }

  async deleteStudent(id: string): Promise<Student> {
    const student = await this.getStudent(id);
    return await this.studentRepository.remove(student);
  }

}
