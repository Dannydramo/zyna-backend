import { Body, Controller, Get, Param, Patch, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentOrg } from '../../common/decorators/current-org.decorator';
import { CustomersService } from './customers.service';
import { ListCustomersDto } from './dto/list-customers.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@ApiBearerAuth()
@ApiTags('customers')
@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Get()
  @ApiOperation({ summary: 'List customers with pagination and search' })
  findAll(@CurrentOrg() orgId: string, @Query() query: ListCustomersDto) {
    return this.customersService.findAll(orgId, query);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a customer profile with ticket and conversation history',
  })
  findOne(@CurrentOrg() orgId: string, @Param('id') id: string) {
    return this.customersService.findOne(orgId, id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update customer profile details' })
  update(
    @CurrentOrg() orgId: string,
    @Param('id') id: string,
    @Body() dto: UpdateCustomerDto,
  ) {
    return this.customersService.update(orgId, id, dto);
  }
}
