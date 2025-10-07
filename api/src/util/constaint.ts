export const SORT_BY = {
	DESC: 'DESC' as const,
	ASC: 'ASC' as const,
};

/**
 * [Const] Pagination default
 */
export const PAGINATION = {
	// Pagination page
	PAGE: 1,
	// Pagination size
	SIZE: 25,
};

export type SortOrder = 'ASC' | 'DESC';


/**
 * Escapes special SQL wildcard characters (`%` and `_`) in a search keyword.
 *
 * This is useful when using the keyword in a LIKE query with TypeORM or SQL,
 * so that literal `%` or `_` characters are not interpreted as wildcards.
 *
 * @param {string} keyword - The raw search keyword input.
 * @returns {string} The trimmed keyword with `%` and `_` characters escaped.
 *
 * @example
 * escapedSearch("100%_done")
 * // => "100\\%\\_done"
 */
export const escapedSearch = (keyword: string) => {
	return keyword.trim().replace(/[%_]/g, '\\$&');
}