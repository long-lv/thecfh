import { Body, Controller, Delete, Get, Param, Put, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { GetListAdminDto, GetListUserDto } from './dto/get-list-user.dto';
import { UpdateListUserDto } from './dto/update-list-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) { }
    @ApiResponse({
        status: 200,
        description: 'Get list users',
        schema: {
            type: 'object',
            properties: {
                data: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            id: { type: 'string', example: '1' },
                            name: { type: 'string', example: 'John Doe' },
                            email: { type: 'string', example: 'john.doe@example.com' },
                            role: { type: 'string', example: 'ADMIN' },
                            status: { type: 'string', example: 'ACTIVE' },
                            createdAt: { type: 'string', example: '2021-01-01' },
                            updatedAt: { type: 'string', example: '2021-01-01' }
                        }
                    }
                },
                meta: {
                    type: 'object',
                    properties: {
                        total: { type: 'number', example: 100 },
                        limit: { type: 'number', example: 25 },
                        page: { type: 'number', example: 1 },
                        totalPage: { type: 'number', example: 4 }
                    }
                }
            }
        }
    })
    @Get('list')
    findAll(@Query() query: GetListUserDto) {
        return this.userService.findAllUser(query);
    }

    @ApiResponse({
        status: 200,
        description: 'Get list admins',
        schema: {
            type: 'object',
            properties: {
                data: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            id: { type: 'string', example: '1' },
                            name: { type: 'string', example: 'John Doe' },
                            email: { type: 'string', example: 'john.doe@example.com' },
                            role: { type: 'string', example: 'ADMIN' },
                            status: { type: 'string', example: 'ACTIVE' },
                        }
                    }
                },
                meta: {
                    type: 'object',
                    properties: {
                        total: { type: 'number', example: 100 },
                        limit: { type: 'number', example: 25 },
                        page: { type: 'number', example: 1 },
                        totalPage: { type: 'number', example: 4 }
                    }
                }
            }
        }
    })
    @Get('list-admin')
    findAllAdmin(@Query() query: GetListAdminDto) {
        return this.userService.findAllAdmin(query);
    }

    @Get('list/:id')
    @ApiParam({ name: 'id', type: String, description: 'id by user' })
    @ApiOperation({ summary: 'Get user by id' })
    @ApiResponse({
        status: 200,
        description: 'Get user by id',
        schema: {
            type: 'object',
            properties: {
                data: {
                    type: 'object',
                    properties: {
                        name: { type: 'string', example: 'John Doe' },
                        email: { type: 'string', example: 'john.doe@example.com' },
                        role: { type: 'string', example: 'ADMIN' },
                        status: { type: 'string', example: 'ACTIVE' },
                    }
                }
            }
        }
    })
    @ApiResponse({
        status: 404,
        description: 'User not found',
        schema: {
            type: 'object',
        }
    })
    findUserById(@Param('id') id: string) {
        return this.userService.findUserById(id);
    }

    @ApiOperation({ summary: 'Get admin by id' })
    @ApiParam({ name: 'id', type: String, description: 'id by admin' })
    @ApiResponse({
        status: 200,
        description: 'Get admin by id',
        schema: {
            type: 'object',
            properties: {
                data: {
                    type: 'object',
                    properties: {
                        name: { type: 'string', example: 'John Doe' },
                        email: { type: 'string', example: 'john.doe@example.com' },
                        role: { type: 'string', example: 'ADMIN' },
                        status: { type: 'string', example: 'ACTIVE' },
                    }
                }
            }
        }
    })
    @ApiResponse({
        status: 404,
        description: 'Admin not found',
        schema: {
            type: 'object',
        }
    })
    @Get('list-admin/:id')
    findAdminById(@Param('id') id: string) {
        return this.userService.findAdminById(id);
    }

    @Delete('delete/:id')
    @ApiOperation({ summary: 'Delete user by id' })
    @ApiParam({ name: 'id', type: String, description: 'id by user' })
    @ApiResponse({
        status: 204,
        description: 'Delete user by id',
    })
    deleteUser(@Param('id') id: string) {
        return this.userService.deleteUser(id);
    }

    @ApiOperation({ summary: 'Delete admin by id' })
    @ApiParam({ name: 'id', type: String, description: 'id by admin' })
    @ApiResponse({
        status: 204,
        description: 'Delete admin by id',
    })
    @Delete('admin/delete/:id')
    deleteAdmin(@Param('id') id: string) {
        return this.userService.deleteAdmin(id);
    }

    @Put('update/:id')
    @ApiOperation({ summary: 'Update user by id' })
    @ApiParam({ name: 'id', type: String, description: 'id by user' })
    @ApiResponse({
        status: 200,
        description: 'Update user by id',
        schema: {
            type: 'object',
            properties: {
                message: { type: 'string', example: 'Update user successfully' },
                data: { type: 'object', example: { id: '1', name: 'John Doe', email: 'john.doe@example.com', role: 'ADMIN', status: 'ACTIVE' } },
                statusCode: { type: 'number', example: 200 }
            }
        }
    })
    updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateListUserDto) {
        return this.userService.updateUser(id, updateUserDto);
    }

    @Put('admin/update/:id')
    @ApiOperation({summary: 'Update admin by id'})
    @ApiParam({name: 'id', type: String, description: 'id by admin'})
    @ApiResponse({
        status: 200,
        description: 'Update admin by id',
        schema: {
            type: 'object',
            properties: {
                message: { type: 'string', example: 'Update admin successfully' },
                data: { type: 'object', example: { id: '1', name: 'John Doe', email: 'john.doe@example.com', role: 'ADMIN', status: 'ACTIVE' } },
                statusCode: { type: 'number', example: 200 }
            }
        }
    })
    updateAdmin(@Param('id') id: string, @Body() updateAdminDto: UpdateListUserDto) {
        return this.userService.updateAdmin(id, updateAdminDto);
    }
}
