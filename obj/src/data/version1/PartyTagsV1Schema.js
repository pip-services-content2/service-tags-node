"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PartyTagsV1Schema = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_3 = require("pip-services3-commons-nodex");
const TagRecordV1Schema_1 = require("./TagRecordV1Schema");
class PartyTagsV1Schema extends pip_services3_commons_nodex_1.ObjectSchema {
    constructor() {
        super();
        this.withOptionalProperty('id', pip_services3_commons_nodex_3.TypeCode.String);
        this.withOptionalProperty('tags', new pip_services3_commons_nodex_2.ArraySchema(new TagRecordV1Schema_1.TagRecordV1Schema()));
        this.withOptionalProperty('change_time', pip_services3_commons_nodex_3.TypeCode.DateTime); //TypeCode.DateTime);
    }
}
exports.PartyTagsV1Schema = PartyTagsV1Schema;
//# sourceMappingURL=PartyTagsV1Schema.js.map