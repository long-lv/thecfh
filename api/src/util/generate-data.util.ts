import { PaginationQueryDto } from 'src/dto/pagination.dto';
import { PAGINATION } from './constaint';

export class GenerateDataUtil {
	/**
	 * Get size, skip, sort object data to paginate
	 * @param paginator - Query passed down to filter
	 * @returns Data to query pagination
	 */
	static paginationFields(pagination: PaginationQueryDto) {
		// sortValue format => fieldName-asc | fieldName-desc
		const sortValue = pagination.sort || 'createdAt-desc';
		const pageValue = Math.max(1, Number(pagination.page) || PAGINATION.PAGE);
		const sizeValue = Math.max(1, Number(pagination.size) || PAGINATION.SIZE);

		return {
			size: sizeValue,
			skip: Math.max(0, (pageValue - 1) * sizeValue),
			sortKey: sortValue.split('-')[0],
			sortValue: sortValue.split('-')[1].toUpperCase() as 'ASC' | 'DESC',
		};
	}

	static generateTotalPage(total: number, size: number) {
		return Math.ceil(total / size);
	}
}
