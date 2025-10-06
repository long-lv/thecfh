import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsOptional } from "class-validator";
import { PaginationQueryDto } from "src/dto/pagination.dto";
import { StatusUser } from "src/modules/auth/type/user.type";

export class GetListUserDto extends PaginationQueryDto{
    @IsOptional()
    @ApiProperty({
        name: 'keyword',
        description: 'Keyword search eg: user email or name',
        example: 'user@example.com',
    })
    keyword: string;

    @ApiProperty({
        name: 'order',
        description: 'Order by eg: createdAt-DESC',
        example: 'createdAt-DESC',
    })
    @IsOptional() // default createdAt-DESC
    order: string;

    @ApiProperty({
        name: 'status',
        description: 'Status user eg: VERIFY, ACTIVE',
        example: 'VERIFY',
    })
    @IsOptional()
    @IsEnum(StatusUser, { message: 'status must be one of: VERIFY, ACTIVE' })
    status: StatusUser; // default VERIFY 
}

export class GetListAdminDto extends PaginationQueryDto{
    @IsOptional()
    @ApiProperty({
        name: 'keyword',
        description: 'Keyword search eg: admin email or name',
        example: 'admin@example.com',
    })
    keyword: string;
    
    @ApiProperty({
        name: 'order',
        description: 'Order by eg: createdAt-DESC',
        example: 'createdAt-DESC',
    })
    @IsOptional() // default createdAt-DESC
    order: string;
    
    @ApiProperty({
        name: 'status',
        description: 'Status admin eg: VERIFY, ACTIVE',
        example: 'VERIFY',
    })
    @IsOptional()
    @IsEnum(StatusUser, { message: 'status must be one of: VERIFY, ACTIVE' })
    status: StatusUser; // default VERIFY 
}