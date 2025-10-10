import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateProductAttributeValueDto {
    @IsNotEmpty()
    @IsNumber()
    attributeValueId: number;

    @IsNotEmpty()
    @IsNumber()
    productAttributeId: number;
    
}
