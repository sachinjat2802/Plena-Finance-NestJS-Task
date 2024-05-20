import { Controller, Post, Delete, Get, Patch, Body, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CreateKeyDto } from 'src/keys/dto/create-key.dto';
import { UpdateKeyDto } from 'src/keys/dto/update-key.dto';
import { AdminService } from './admin.service';

@Controller('admin/keys')
@UseGuards(JwtAuthGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  createKey(@Body() createKeyDto: CreateKeyDto) {
    return this.adminService.createKey(createKeyDto);
  }

  @Delete(':id')
  deleteKey(@Param('id') id: string) {
    return this.adminService.deleteKey(id);
  }

  @Get()
  listKeys() {
    return this.adminService.listKeys();
  }

  @Patch(':id')
  updateKey(@Param('id') id: string, @Body() updateKeyDto: UpdateKeyDto) {
    return this.adminService.updateKey(id, updateKeyDto);
  }
}
