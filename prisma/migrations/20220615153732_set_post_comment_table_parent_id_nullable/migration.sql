-- DropForeignKey
ALTER TABLE `Post_Comment` DROP FOREIGN KEY `Post_Comment_parentId_fkey`;

-- AlterTable
ALTER TABLE `Post_Comment` MODIFY `parentId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Post_Comment` ADD CONSTRAINT `Post_Comment_parentId_fkey` FOREIGN KEY (`parentId`) REFERENCES `Post_Comment`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
