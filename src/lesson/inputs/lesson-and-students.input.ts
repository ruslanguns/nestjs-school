import { InputType, Field, ID } from "@nestjs/graphql";
import { IsUUID, IsArray } from "class-validator";

@InputType()
export class LessonAndStudentsInput {

  @IsUUID()
  @Field(type => ID)
  lessonId: string;

  @IsUUID('4', { each: true })
  @IsArray()
  @Field(type => [ID])
  studentIds: string[];
}
