export const MESSAGE_UTIL = {
	CREATE_SUCCESS: (field) => `Create ${field} successfully!`,
	GET_SUCCESS: (field) => `Get ${field} successfully!`,
	DELETE_SUCCESS: (id, field) =>
		`This action deleted a #${id} ${field} successfully`,
	UPDATE_SUCCESS: (id, field) =>
		`This action updated a #${id} ${field} successfully`,
	ALREADY_EXISTS: (field) => `${field} already exists!`,
	NOT_FOUND: (field) => `${field} not found, try again!`,
	DELETE_FAIL: (id, field) => `This action deleted a #${id} ${field} false`,
	UPDATE_FAIL: (id, field) => `This action updated a #${id} ${field} false`,
};
