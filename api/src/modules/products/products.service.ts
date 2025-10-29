import {
	BadRequestException,
	HttpStatus,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { escapedSearch, PAGINATION } from 'src/util/constaint';
import { GenerateDataUtil } from 'src/util/generate-data.util';
import { MESSAGE_UTIL } from 'src/util/message-data.utils';
import { Not, Repository } from 'typeorm';
import { CategoriesService } from '../categories/categories.service';
import { UploadsService } from '../uploads/uploads.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductListQueryDto } from './dto/product-list-query.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
	constructor(
		@InjectRepository(Product)
		private productRepository: Repository<Product>,
		private categoryService: CategoriesService,
		private uploadService: UploadsService,
	) {}
	async create(
		createProductDto: CreateProductDto,
		files?: Express.Multer.File[],
	) {
		const [existingProduct, category] = await Promise.all([
			this.productRepository.findOne({
				where: { name: createProductDto.name },
				withDeleted: false,
			}),
			this.categoryService.findOne(createProductDto.categoryId),
		]);

		if (existingProduct) {
			throw new BadRequestException(MESSAGE_UTIL.ALREADY_EXISTS('product'));
		}

		if (!category) {
			throw new BadRequestException(MESSAGE_UTIL.NOT_FOUND('category'));
		}

		let imageUrl = '';
		if (files && files.length > 0) {
			try {
				const uploadedFile = await this.uploadService.multiUploadFiles(files);
				imageUrl = uploadedFile.join(';');
			} catch {
				throw new BadRequestException(MESSAGE_UTIL.UPLOAD_FAIL);
			}
		}
		const product = this.productRepository.create({
			...createProductDto,
			imgUrl: imageUrl,
			price: createProductDto.price.toString(),
			categoryId: Number(createProductDto.categoryId),
		});

		const savedProduct = await this.productRepository.save(product);
		if (!savedProduct) {
			throw new BadRequestException(MESSAGE_UTIL.CREATE_FAIL);
		}

		return {
			message: MESSAGE_UTIL.CREATE_SUCCESS('product'),
			data: savedProduct,
			statusCode: HttpStatus.CREATED,
		};
	}

	async findAll(query: ProductListQueryDto) {
		const {
			page = PAGINATION.PAGE,
			size = PAGINATION.SIZE,
			keyword,
			order = 'createdAt-DESC',
		} = query;
		const paginationData = GenerateDataUtil.paginationFields({
			page: page.toString(),
			size: size.toString(),
			sort: order,
		});
	const queryBuilder = this.productRepository
		.createQueryBuilder('product')
		.leftJoinAndSelect('product.category', 'category');

		if (query.categoryId) {
			queryBuilder.where('product.categoryId = :categoryId', {
				categoryId: query.categoryId,
			});
		}

		if (keyword) {
			const keywordSearch = escapedSearch(keyword);
			queryBuilder.where(
				'product.name LIKE :keyword OR product.description LIKE :keyword',
				{ keyword: `%${keywordSearch}%` },
			);
		}
		queryBuilder
			.orderBy(`product.${paginationData.sortKey}`, paginationData.sortValue)
			.skip(paginationData.skip)
			.take(paginationData.size);

		const [data, total] = await queryBuilder.getManyAndCount();
		const formatedData = data.map((product) => {
			return {
				id: product.id,
				name: product.name,
				description: product.description,
				price: product.price,
				imgUrl: product.imgUrl,
				categoryId: product.categoryId,
				categoryName: product.category.name,
				createdAt: product.createdAt,
				updatedAt: product.updatedAt,
			}
		})
		return {
			meta: {
				total,
				size,
				page,
				totalPage: Math.ceil(total / Number(size)),
			},
			data: formatedData,
		};
	}

	async findOne(id: string) {
		// const product = await this.productRepository.findOne({
		// 	where: { id },
		// 	relations: [
		// 		'category',
		// 		'productAttrs',
		// 		'productAttrs.attribute',
		// 		'productAttrs.productAttrValues',
		// 		'productAttrs.productAttrValues.attributeValue',
		// 	],
		// });

		const product = await this.productRepository
			.createQueryBuilder('product')
			.leftJoinAndSelect('product.category', 'category') // dùng đúng tên quan hệ
			.leftJoinAndSelect('product.productAttrs', 'productAttrs')
			.leftJoinAndSelect('productAttrs.attribute', 'attribute')
			.leftJoinAndSelect('productAttrs.productAttrValues', 'productAttrValues')
			.leftJoinAndSelect('productAttrValues.attributeValue', 'attributeValue')
			.where('product.id = :id', { id })
			.getOne();

		if (!product) {
			throw new BadRequestException(MESSAGE_UTIL.NOT_FOUND('product'));
		}
		const attributes = product.productAttrs?.map((productAttr) => ({
			id: productAttr.id,
			attributeId: productAttr.attributeId,
			name: productAttr.attribute?.name,
			values:
				productAttr.productAttrValues?.map((pav) => ({
					id: pav.id,
					value: pav.attributeValue?.value,
					attributeValueId: pav.attributeValueId,
				})) || [],
		}));

		const transformedProduct = {
			id: product.id,
			name: product.name,
			description: product.description,
			price: product.price,
			imgUrl: product.imgUrl,
			categoryId: product.categoryId,
			categoryName: product.category.name,
			attributes: attributes || [],
			createdAt: product.createdAt,
			updatedAt: product.updatedAt,
		};

		return {
			message: MESSAGE_UTIL.GET_SUCCESS('product'),
			data: transformedProduct,
		};
	}

	async update(
		id: string,
		updateProductDto: UpdateProductDto,
		files?: Express.Multer.File[],
	) {
		const [productExists, categoryExists] = await Promise.all([
			this.productRepository.findOne({
				where: { id },
			}),
			this.categoryService.findOne(String(updateProductDto.categoryId)),
		]);

		if (!productExists) {
			throw new NotFoundException(MESSAGE_UTIL.NOT_FOUND('product'));
		}

		if (!categoryExists) {
			throw new NotFoundException(MESSAGE_UTIL.NOT_FOUND('category'));
		}

		if (updateProductDto.name && productExists?.name !== updateProductDto?.name) {
			const productNameExists = await this.productRepository.findOne({
				where: {
					name: updateProductDto.name,
					id: Not(id), // not check product currrent
				},
				withDeleted: true, // check all product deleted
			});

			if (productNameExists) {
				throw new BadRequestException(MESSAGE_UTIL.ALREADY_EXISTS('product name'));
			}

			productExists.name = updateProductDto.name;
		}

		let filterFileNotRemove: string[] = [];
		if (updateProductDto.fileRemove) {
			const fileExists = productExists.imgUrl.split(';');
			filterFileNotRemove = fileExists.filter(
				(file) => !updateProductDto.fileRemove?.includes(file),
			);
		}

		if (files) {
			try {
				const uploadedFile = await this.uploadService.multiUploadFiles(files);
				const mergeFileUpdated = [...uploadedFile, ...filterFileNotRemove];
				productExists.imgUrl = mergeFileUpdated.join(';');
			} catch {
				throw new BadRequestException(MESSAGE_UTIL.UPLOAD_FAIL);
			}
		}

		if (updateProductDto.categoryId) {
			const category = await this.categoryService.findOne(
				updateProductDto.categoryId,
			);
			if (!category) {
				throw new NotFoundException(MESSAGE_UTIL.NOT_FOUND('category'));
			}
			productExists.categoryId = Number(updateProductDto.categoryId);
		}

		const updateProductDtoData = {
			...updateProductDto,
			price: updateProductDto.price?.toString(),
			categoryId: Number(updateProductDto.categoryId),
		};
		const updatedProduct = this.productRepository.merge(
			productExists,
			updateProductDtoData,
		);
		const savedProduct = await this.productRepository.save(updatedProduct);
		if (!savedProduct) {
			throw new BadRequestException(MESSAGE_UTIL.UPDATE_FAIL(id, 'product'));
		}
		return {
			message: MESSAGE_UTIL.UPDATE_SUCCESS(id, 'product'),
			data: savedProduct,
			statusCode: HttpStatus.OK,
		};
	}

	async remove(id: string) {
		const product = await this.productRepository.findOne({
			where: { id },
		});

		if (!product) {
			throw new NotFoundException(MESSAGE_UTIL.NOT_FOUND('product'));
		}

		const deletedProduct = await this.productRepository.softDelete(id);

		if (!deletedProduct) {
			throw new BadRequestException(MESSAGE_UTIL.DELETE_FAIL);
		}

		return {
			message: MESSAGE_UTIL.DELETE_SUCCESS(id, 'product'),
			statusCode: HttpStatus.NO_CONTENT,
		};
	}
}
