import { IsArray, IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateProjectDto {
  @IsString() @IsNotEmpty() slug: string;
  @IsString() @IsNotEmpty() name: string;
  @IsOptional() @IsString() nameEn?: string;
  @IsString() @IsNotEmpty() description: string;
  @IsOptional() @IsString() descriptionEn?: string;
  @IsString() @IsNotEmpty() longDescription: string;
  @IsOptional() @IsString() longDescriptionEn?: string;
  @IsOptional() @IsArray() @IsString({ each: true }) techs?: string[];
  @IsOptional() @IsString() image?: string;
  @IsOptional() @IsString() liveUrl?: string;
  @IsOptional() @IsString() repoUrl?: string;
  @IsString() @IsNotEmpty() year: string;
  @IsOptional() @IsInt() order?: number;
  @IsOptional() @IsBoolean() published?: boolean;
}
