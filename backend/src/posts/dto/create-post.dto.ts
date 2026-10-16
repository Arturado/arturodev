import { IsArray, IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePostDto {
  @IsString() @IsNotEmpty() slug: string;
  @IsString() @IsNotEmpty() title: string;
  @IsOptional() @IsString() titleEn?: string;
  @IsString() @IsNotEmpty() excerpt: string;
  @IsOptional() @IsString() excerptEn?: string;
  @IsString() @IsNotEmpty() content: string;
  @IsOptional() @IsString() contentEn?: string;
  @IsOptional() @IsArray() @IsString({ each: true }) tags?: string[];
  @IsString() @IsNotEmpty() readTime: string;
  @IsOptional() @IsString() imageUrl?: string;
  @IsOptional() @IsString() categoryId?: string | null;
  @IsOptional() @IsBoolean() published?: boolean;
}
