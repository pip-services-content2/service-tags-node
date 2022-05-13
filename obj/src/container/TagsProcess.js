"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagsProcess = void 0;
const pip_services3_container_nodex_1 = require("pip-services3-container-nodex");
const pip_services3_rpc_nodex_1 = require("pip-services3-rpc-nodex");
const pip_services3_swagger_nodex_1 = require("pip-services3-swagger-nodex");
const TagsServiceFactory_1 = require("../build/TagsServiceFactory");
class TagsProcess extends pip_services3_container_nodex_1.ProcessContainer {
    constructor() {
        super("tags", "Search tags microservice");
        this._factories.add(new TagsServiceFactory_1.TagsServiceFactory);
        this._factories.add(new pip_services3_rpc_nodex_1.DefaultRpcFactory);
        this._factories.add(new pip_services3_swagger_nodex_1.DefaultSwaggerFactory);
    }
}
exports.TagsProcess = TagsProcess;
//# sourceMappingURL=TagsProcess.js.map