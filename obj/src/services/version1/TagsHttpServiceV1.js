"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagsHttpServiceV1 = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_rpc_nodex_1 = require("pip-services3-rpc-nodex");
class TagsHttpServiceV1 extends pip_services3_rpc_nodex_1.CommandableHttpService {
    constructor() {
        super('v1/tags');
        this._dependencyResolver.put('controller', new pip_services3_commons_nodex_1.Descriptor('service-tags', 'controller', 'default', '*', '1.0'));
    }
}
exports.TagsHttpServiceV1 = TagsHttpServiceV1;
//# sourceMappingURL=TagsHttpServiceV1.js.map