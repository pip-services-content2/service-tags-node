import { ObjectSchema } from 'pip-services3-commons-nodex';
import { TypeCode } from 'pip-services3-commons-nodex';

export class TagRecordV1Schema extends ObjectSchema {
    public constructor() {
        super();
        this.withOptionalProperty('tag', TypeCode.String);
        this.withRequiredProperty('count', TypeCode.Long);
        this.withOptionalProperty('last_time', TypeCode.DateTime); //TypeCode.DateTime);
    }
}
