import { ObjectSchema } from 'pip-services3-commons-nodex';
import { ArraySchema } from 'pip-services3-commons-nodex';
import { TypeCode } from 'pip-services3-commons-nodex';

import { TagRecordV1Schema } from './TagRecordV1Schema';

export class PartyTagsV1Schema extends ObjectSchema {
    public constructor() {
        super();
        this.withOptionalProperty('id', TypeCode.String);
        this.withOptionalProperty('tags', new ArraySchema(new TagRecordV1Schema()));
        this.withOptionalProperty('change_time', TypeCode.DateTime); //TypeCode.DateTime);
    }
}
