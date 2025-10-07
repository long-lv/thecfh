import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsOptional, IsString } from "class-validator";
import { Role, StatusUser } from "src/modules/auth/type/user.type";

export class UpdateListUserDto {
    @ApiProperty({name: 'name', description: 'Name user'})
    @IsOptional()
    @IsString()
    name: string;

    @ApiProperty({name: 'status', description: 'Status user'})
    @IsOptional()
    @IsEnum(Role, {message: 'Role must be one of: ADMIN, CELLER, USER'})
    role: Role;

    @ApiProperty({name: 'status', description: 'Status user'})
    @IsOptional()
    @IsEnum(StatusUser, {message: 'Status must be one of: VERIFY, ACTIVE'})
    status: StatusUser;
}