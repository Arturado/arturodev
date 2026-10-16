import { IsArray, IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdatePostDto {
  @IsOptional() @IsString() @IsNotEmpty() slug?: string;
  @IsOptional() @IsString() @IsNotEmpty() title?: string;
  @IsOptional() @IsString() titleEn?: string;
  @IsOptional() @IsString() @IsNotEmpty() excerpt?: string;
  @IsOptional() @IsString() excerptEn?: string;
  @IsOptional() @IsString() @IsNotEmpty() content?: string;
  @IsOptional() @IsString() contentEn?: string;
  @IsOptional() @IsArray() @IsString({ each: true }) tags?: string[];
  @IsOptional() @IsString() @IsNotEmpty() readTime?: string;
  @IsOptional() @IsString() imageUrl?: string;
  @IsOptional() @IsString() categoryId?: string | null;
  @IsOptional() @IsBoolean() published?: boolean;
}
