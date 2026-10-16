import { IsArray, IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateProjectDto {
  @IsOptional() @IsString() @IsNotEmpty() slug?: string;
  @IsOptional() @IsString() @IsNotEmpty() name?: string;
  @IsOptional() @IsString() nameEn?: string;
  @IsOptional() @IsString() @IsNotEmpty() description?: string;
  @IsOptional() @IsString() descriptionEn?: string;
  @IsOptional() @IsString() @IsNotEmpty() longDescription?: string;
  @IsOptional() @IsString() longDescriptionEn?: string;
  @IsOptional() @IsArray() @IsString({ each: true }) techs?: string[];
  @IsOptional() @IsString() image?: string;
  @IsOptional() @IsString() liveUrl?: string;
  @IsOptional() @IsString() repoUrl?: string;
  @IsOptional() @IsString() @IsNotEmpty() year?: string;
  @IsOptional() @IsInt() order?: number;
  @IsOptional() @IsBoolean() published?: boolean;
}
