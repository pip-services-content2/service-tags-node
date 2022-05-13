"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagRecordV1Schema = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
class TagRecordV1Schema extends pip_services3_commons_nodex_1.ObjectSchema {
    constructor() {
        super();
        this.withOptionalProperty('tag', pip_services3_commons_nodex_2.TypeCode.String);
        this.withRequiredProperty('count', pip_services3_commons_nodex_2.TypeCode.Long);
        this.withOptionalProperty('last_time', pip_services3_commons_nodex_2.TypeCode.DateTime); //TypeCode.DateTime);
    }
}
exports.TagRecordV1Schema = TagRecordV1Schema;
//# sourceMappingURL=TagRecordV1Schema.js.map