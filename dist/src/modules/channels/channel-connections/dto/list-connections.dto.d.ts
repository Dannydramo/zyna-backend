import { PaginationDto } from '../../../../common/dto/pagination.dto';
import { Channel } from '../../../../generated/prisma/enums';
export declare class ListConnectionsDto extends PaginationDto {
    channel?: Channel;
}
