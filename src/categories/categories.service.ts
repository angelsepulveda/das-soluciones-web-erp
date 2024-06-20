import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const category = this.categoryRepository.create(createCategoryDto);

      await this.categoryRepository.save(category);

      return category;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('ayuda!');
    }
  }

  async findAll() {
    return await this.categoryRepository.find({});
  }

  async findOne(id: string) {
    return this.categoryRepository.findOneBy({ id });
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoryRepository.preload({
      id: id,
      ...updateCategoryDto,
    });

    return await this.categoryRepository.save(category);
  }

  async remove(id: string) {
    const category = await this.findOne(id);

    await this.categoryRepository.remove(category);
  }
}
