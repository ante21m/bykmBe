import { PartialType } from '@nestjs/mapped-types';
import { CreateHomeSectionDto } from './create-home.dto';

export class UpdateHomeSectionDto extends PartialType(CreateHomeSectionDto) {}
