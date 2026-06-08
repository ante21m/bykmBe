import { PartialType } from '@nestjs/mapped-types';
import { CreateAboutSectionDto } from './create-about.dto';

export class UpdateAboutSectionDto extends PartialType(CreateAboutSectionDto) {}
