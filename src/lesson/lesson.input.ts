import { Field, InputType, ID } from "@nestjs/graphql";
import { MinLength, IsDateString, IsUUID, IsArray } from 'class-validator';


@InputType()
export class CreateLessonInput {

  @MinLength(1)
  @Field()
  name: string;

  @IsDateString()
  @Field()
  startDate: string;
  
  @IsDateString()
  @Field()
  endDate: string;

  @IsUUID('4', { each: true })
  @IsArray()
  @Field(type => [ID], { defaultValue: [] })
  students: string[];
}