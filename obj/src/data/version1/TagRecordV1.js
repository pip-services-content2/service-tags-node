"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagRecordV1 = void 0;
class TagRecordV1 {
    constructor(tag, count) {
        this.tag = tag;
        this.count = count || 0;
        this.last_time = new Date();
    }
}
exports.TagRecordV1 = TagRecordV1;
//# sourceMappingURL=TagRecordV1.js.map