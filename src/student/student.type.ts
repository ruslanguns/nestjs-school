import { ObjectType, Field, ID } from "@nestjs/graphql";
import { LessonType } from "src/lesson/lesson.type";

@ObjectType('Student')
export class StudentType {
  @Field(type => ID)
  id: string;

  @Field()
  firstname: string;

  @Field()
  lastname: string;

  @Field(type => [LessonType])
  lessons: string[]
}