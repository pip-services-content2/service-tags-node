"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagsFilePersistence = void 0;
const pip_services3_data_nodex_1 = require("pip-services3-data-nodex");
const TagsMemoryPersistence_1 = require("./TagsMemoryPersistence");
class TagsFilePersistence extends TagsMemoryPersistence_1.TagsMemoryPersistence {
    constructor(path) {
        super();
        this._persister = new pip_services3_data_nodex_1.JsonFilePersister(path);
        this._loader = this._persister;
        this._saver = this._persister;
    }
    configure(config) {
        super.configure(config);
        this._persister.configure(config);
    }
}
exports.TagsFilePersistence = TagsFilePersistence;
//# sourceMappingURL=TagsFilePersistence.js.map