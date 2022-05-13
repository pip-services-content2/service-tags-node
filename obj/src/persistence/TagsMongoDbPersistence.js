"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagsMongoDbPersistence = void 0;
const pip_services3_mongodb_nodex_1 = require("pip-services3-mongodb-nodex");
class TagsMongoDbPersistence extends pip_services3_mongodb_nodex_1.IdentifiableMongoDbPersistence {
    constructor() {
        super('tags');
    }
    set(correlationId, item) {
        const _super = Object.create(null, {
            set: { get: () => super.set }
        });
        return __awaiter(this, void 0, void 0, function* () {
            if (item == null)
                return;
            item.change_time = new Date();
            return yield _super.set.call(this, correlationId, item);
        });
    }
}
exports.TagsMongoDbPersistence = TagsMongoDbPersistence;
//# sourceMappingURL=TagsMongoDbPersistence.js.map