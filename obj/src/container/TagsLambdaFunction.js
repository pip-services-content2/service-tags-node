"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.TagsLambdaFunction = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_aws_nodex_1 = require("pip-services3-aws-nodex");
const TagsServiceFactory_1 = require("../build/TagsServiceFactory");
class TagsLambdaFunction extends pip_services3_aws_nodex_1.CommandableLambdaFunction {
    constructor() {
        super("tags", "Search tags function");
        this._dependencyResolver.put('controller', new pip_services3_commons_nodex_1.Descriptor('service-tags', 'controller', 'default', '*', '*'));
        this._factories.add(new TagsServiceFactory_1.TagsServiceFactory());
    }
}
exports.TagsLambdaFunction = TagsLambdaFunction;
exports.handler = new TagsLambdaFunction().getHandler();
//# sourceMappingURL=TagsLambdaFunction.js.map