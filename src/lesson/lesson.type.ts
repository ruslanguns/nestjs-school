import { ObjectType, Field, ID, Directive } from "@nestjs/graphql";
import { StudentType } from "../student/student.type";
import { UPPER } from "../shared/directives";


@ObjectType('Lesson')
export class LessonType {

  @Field(type => ID)
  id: string;

  @Directive(UPPER)
  @Field()
  name: string;
  
  @Field()
  startDate: string;

  @Field()
  endDate: string;

  @Field(type => [StudentType])
  students: string[]

}