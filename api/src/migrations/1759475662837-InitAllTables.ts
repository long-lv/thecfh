import { MigrationInterface, QueryRunner } from "typeorm";

export class InitAllTables1759475662837 implements MigrationInterface {
    name = 'InitAllTables1759475662837'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`categories\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleteAt\` timestamp(6) NULL, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_8b0be371d28245da6e4f4b6187\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`oderItems\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleteAt\` timestamp(6) NULL, \`quantity\` int NOT NULL, \`price\` int NOT NULL, \`oderId\` int NULL, \`variant_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`oders\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleteAt\` timestamp(6) NULL, \`status\` enum ('CONFIRM', 'PENDING', 'SHIPPING', 'COMPLETED', 'CANCELLED') NOT NULL DEFAULT 'CONFIRM', \`totalPrice\` int NOT NULL, \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`inquiries\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleteAt\` timestamp(6) NULL, \`subject\` varchar(255) NOT NULL, \`body\` varchar(255) NOT NULL, \`senderId\` int NULL, \`receiverId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`chats\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleteAt\` timestamp(6) NULL, \`message\` varchar(255) NOT NULL, \`senderId\` int NULL, \`receiverId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`comments\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleteAt\` timestamp(6) NULL, \`content\` varchar(255) NOT NULL, \`userId\` int NULL, \`postId\` int NULL, \`parentId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`posts\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleteAt\` timestamp(6) NULL, \`title\` varchar(255) NOT NULL, \`content\` varchar(255) NOT NULL, \`authorId\` int NULL, UNIQUE INDEX \`IDX_2d82eb2bb2ddd7a6bfac8804d8\` (\`title\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleteAt\` timestamp(6) NULL, \`email\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`role\` enum ('ADMIN', 'CELLER', 'USER') NOT NULL DEFAULT 'USER', \`status\` enum ('veriy', 'active') NOT NULL DEFAULT 'veriy', \`hashedRefreshToken\` varchar(255) NULL, UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), UNIQUE INDEX \`IDX_51b8b26ac168fbe7d6f5653e6c\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Carts\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleteAt\` timestamp(6) NULL, \`status\` enum ('ACTIVE', 'CHECKED_OUT', 'ABANDONED') NOT NULL DEFAULT 'ACTIVE', \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`cartItems\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleteAt\` timestamp(6) NULL, \`cartId\` int NULL, \`variantId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`productVariants\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleteAt\` timestamp(6) NULL, \`sku\` varchar(255) NOT NULL, \`price\` int NOT NULL, \`stock\` int NOT NULL, \`productId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`productVariantsValues\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleteAt\` timestamp(6) NULL, \`vaariantId\` int NULL, \`attributValueId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`productAttributeValues\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleteAt\` timestamp(6) NULL, \`attributeId\` int NOT NULL, \`value\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`productAttributes\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleteAt\` timestamp(6) NULL, \`productId\` int NOT NULL, \`name\` varchar(255) NOT NULL, \`productAttrsId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`products\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleteAt\` timestamp(6) NULL, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`price\` varchar(255) NOT NULL, \`imgUrl\` varchar(255) NOT NULL, \`categoryId\` int NOT NULL, UNIQUE INDEX \`IDX_4c9fb58de893725258746385e1\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`banners\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleteAt\` timestamp(6) NULL, \`title\` varchar(255) NOT NULL, \`image_url\` varchar(255) NOT NULL, \`link_url\` varchar(255) NOT NULL, \`content\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_05c50d4c94a80c147520c2d88e\` (\`title\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`oderItems\` ADD CONSTRAINT \`FK_2ff50eed65a37a2e67dfe9b6f3c\` FOREIGN KEY (\`oderId\`) REFERENCES \`oders\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`oderItems\` ADD CONSTRAINT \`FK_01f46ceba6b55b67180f7fcfafb\` FOREIGN KEY (\`variant_id\`) REFERENCES \`productVariants\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`oders\` ADD CONSTRAINT \`FK_98ab4379267609403e76f0b512a\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`inquiries\` ADD CONSTRAINT \`FK_f264ffb02124f71a800d251de4f\` FOREIGN KEY (\`senderId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`inquiries\` ADD CONSTRAINT \`FK_ea1f4d23a39b9282123630617a5\` FOREIGN KEY (\`receiverId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`chats\` ADD CONSTRAINT \`FK_d697f19c9c7778ed773b449ce70\` FOREIGN KEY (\`senderId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`chats\` ADD CONSTRAINT \`FK_c8562e07e5260b76b37e25126c6\` FOREIGN KEY (\`receiverId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`comments\` ADD CONSTRAINT \`FK_7e8d7c49f218ebb14314fdb3749\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`comments\` ADD CONSTRAINT \`FK_e44ddaaa6d058cb4092f83ad61f\` FOREIGN KEY (\`postId\`) REFERENCES \`posts\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`comments\` ADD CONSTRAINT \`FK_8770bd9030a3d13c5f79a7d2e81\` FOREIGN KEY (\`parentId\`) REFERENCES \`comments\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`posts\` ADD CONSTRAINT \`FK_c5a322ad12a7bf95460c958e80e\` FOREIGN KEY (\`authorId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Carts\` ADD CONSTRAINT \`FK_8c26b3de964f6e854a22b7e3293\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`cartItems\` ADD CONSTRAINT \`FK_7fac278e61eddd24a215e8bdf7c\` FOREIGN KEY (\`cartId\`) REFERENCES \`Carts\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`cartItems\` ADD CONSTRAINT \`FK_d083f8d3c7f020e7b73b233df65\` FOREIGN KEY (\`variantId\`) REFERENCES \`productVariants\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`productVariants\` ADD CONSTRAINT \`FK_a05281388b95c96a6cb473df607\` FOREIGN KEY (\`productId\`) REFERENCES \`products\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`productVariantsValues\` ADD CONSTRAINT \`FK_72267a21c91c58a28008e18311c\` FOREIGN KEY (\`vaariantId\`) REFERENCES \`productVariants\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`productVariantsValues\` ADD CONSTRAINT \`FK_c71aafc5d84e22b91dc0b483cdb\` FOREIGN KEY (\`attributValueId\`) REFERENCES \`productAttributeValues\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`productAttributeValues\` ADD CONSTRAINT \`FK_963281907d7f4d3835d71764eb2\` FOREIGN KEY (\`attributeId\`) REFERENCES \`productAttributes\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`productAttributes\` ADD CONSTRAINT \`FK_92fce14c0896e2b4cd13674cb0f\` FOREIGN KEY (\`productId\`) REFERENCES \`products\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`productAttributes\` ADD CONSTRAINT \`FK_bc423e1871ef149b6d2c8c59104\` FOREIGN KEY (\`productAttrsId\`) REFERENCES \`products\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`products\` ADD CONSTRAINT \`FK_ff56834e735fa78a15d0cf21926\` FOREIGN KEY (\`categoryId\`) REFERENCES \`categories\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`products\` DROP FOREIGN KEY \`FK_ff56834e735fa78a15d0cf21926\``);
        await queryRunner.query(`ALTER TABLE \`productAttributes\` DROP FOREIGN KEY \`FK_bc423e1871ef149b6d2c8c59104\``);
        await queryRunner.query(`ALTER TABLE \`productAttributes\` DROP FOREIGN KEY \`FK_92fce14c0896e2b4cd13674cb0f\``);
        await queryRunner.query(`ALTER TABLE \`productAttributeValues\` DROP FOREIGN KEY \`FK_963281907d7f4d3835d71764eb2\``);
        await queryRunner.query(`ALTER TABLE \`productVariantsValues\` DROP FOREIGN KEY \`FK_c71aafc5d84e22b91dc0b483cdb\``);
        await queryRunner.query(`ALTER TABLE \`productVariantsValues\` DROP FOREIGN KEY \`FK_72267a21c91c58a28008e18311c\``);
        await queryRunner.query(`ALTER TABLE \`productVariants\` DROP FOREIGN KEY \`FK_a05281388b95c96a6cb473df607\``);
        await queryRunner.query(`ALTER TABLE \`cartItems\` DROP FOREIGN KEY \`FK_d083f8d3c7f020e7b73b233df65\``);
        await queryRunner.query(`ALTER TABLE \`cartItems\` DROP FOREIGN KEY \`FK_7fac278e61eddd24a215e8bdf7c\``);
        await queryRunner.query(`ALTER TABLE \`Carts\` DROP FOREIGN KEY \`FK_8c26b3de964f6e854a22b7e3293\``);
        await queryRunner.query(`ALTER TABLE \`posts\` DROP FOREIGN KEY \`FK_c5a322ad12a7bf95460c958e80e\``);
        await queryRunner.query(`ALTER TABLE \`comments\` DROP FOREIGN KEY \`FK_8770bd9030a3d13c5f79a7d2e81\``);
        await queryRunner.query(`ALTER TABLE \`comments\` DROP FOREIGN KEY \`FK_e44ddaaa6d058cb4092f83ad61f\``);
        await queryRunner.query(`ALTER TABLE \`comments\` DROP FOREIGN KEY \`FK_7e8d7c49f218ebb14314fdb3749\``);
        await queryRunner.query(`ALTER TABLE \`chats\` DROP FOREIGN KEY \`FK_c8562e07e5260b76b37e25126c6\``);
        await queryRunner.query(`ALTER TABLE \`chats\` DROP FOREIGN KEY \`FK_d697f19c9c7778ed773b449ce70\``);
        await queryRunner.query(`ALTER TABLE \`inquiries\` DROP FOREIGN KEY \`FK_ea1f4d23a39b9282123630617a5\``);
        await queryRunner.query(`ALTER TABLE \`inquiries\` DROP FOREIGN KEY \`FK_f264ffb02124f71a800d251de4f\``);
        await queryRunner.query(`ALTER TABLE \`oders\` DROP FOREIGN KEY \`FK_98ab4379267609403e76f0b512a\``);
        await queryRunner.query(`ALTER TABLE \`oderItems\` DROP FOREIGN KEY \`FK_01f46ceba6b55b67180f7fcfafb\``);
        await queryRunner.query(`ALTER TABLE \`oderItems\` DROP FOREIGN KEY \`FK_2ff50eed65a37a2e67dfe9b6f3c\``);
        await queryRunner.query(`DROP INDEX \`IDX_05c50d4c94a80c147520c2d88e\` ON \`banners\``);
        await queryRunner.query(`DROP TABLE \`banners\``);
        await queryRunner.query(`DROP INDEX \`IDX_4c9fb58de893725258746385e1\` ON \`products\``);
        await queryRunner.query(`DROP TABLE \`products\``);
        await queryRunner.query(`DROP TABLE \`productAttributes\``);
        await queryRunner.query(`DROP TABLE \`productAttributeValues\``);
        await queryRunner.query(`DROP TABLE \`productVariantsValues\``);
        await queryRunner.query(`DROP TABLE \`productVariants\``);
        await queryRunner.query(`DROP TABLE \`cartItems\``);
        await queryRunner.query(`DROP TABLE \`Carts\``);
        await queryRunner.query(`DROP INDEX \`IDX_51b8b26ac168fbe7d6f5653e6c\` ON \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_2d82eb2bb2ddd7a6bfac8804d8\` ON \`posts\``);
        await queryRunner.query(`DROP TABLE \`posts\``);
        await queryRunner.query(`DROP TABLE \`comments\``);
        await queryRunner.query(`DROP TABLE \`chats\``);
        await queryRunner.query(`DROP TABLE \`inquiries\``);
        await queryRunner.query(`DROP TABLE \`oders\``);
        await queryRunner.query(`DROP TABLE \`oderItems\``);
        await queryRunner.query(`DROP INDEX \`IDX_8b0be371d28245da6e4f4b6187\` ON \`categories\``);
        await queryRunner.query(`DROP TABLE \`categories\``);
    }

}
