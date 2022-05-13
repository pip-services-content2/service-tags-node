import { IStringIdentifiable } from 'pip-services3-commons-nodex';
import { TagRecordV1 } from './TagRecordV1';
export declare class PartyTagsV1 implements IStringIdentifiable {
    constructor(id: string, tags: TagRecordV1[]);
    id: string;
    tags: TagRecordV1[];
    change_time: Date;
}
