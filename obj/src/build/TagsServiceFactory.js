"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagsServiceFactory = void 0;
const pip_services3_components_nodex_1 = require("pip-services3-components-nodex");
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const TagsMongoDbPersistence_1 = require("../persistence/TagsMongoDbPersistence");
const TagsFilePersistence_1 = require("../persistence/TagsFilePersistence");
const TagsMemoryPersistence_1 = require("../persistence/TagsMemoryPersistence");
const TagsController_1 = require("../logic/TagsController");
const TagsHttpServiceV1_1 = require("../services/version1/TagsHttpServiceV1");
class TagsServiceFactory extends pip_services3_components_nodex_1.Factory {
    constructor() {
        super();
        this.registerAsType(TagsServiceFactory.MemoryPersistenceDescriptor, TagsMemoryPersistence_1.TagsMemoryPersistence);
        this.registerAsType(TagsServiceFactory.FilePersistenceDescriptor, TagsFilePersistence_1.TagsFilePersistence);
        this.registerAsType(TagsServiceFactory.MongoDbPersistenceDescriptor, TagsMongoDbPersistence_1.TagsMongoDbPersistence);
        this.registerAsType(TagsServiceFactory.ControllerDescriptor, TagsController_1.TagsController);
        this.registerAsType(TagsServiceFactory.HttpServiceDescriptor, TagsHttpServiceV1_1.TagsHttpServiceV1);
    }
}
exports.TagsServiceFactory = TagsServiceFactory;
TagsServiceFactory.Descriptor = new pip_services3_commons_nodex_1.Descriptor("service-tags", "factory", "default", "default", "1.0");
TagsServiceFactory.MemoryPersistenceDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-tags", "persistence", "memory", "*", "1.0");
TagsServiceFactory.FilePersistenceDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-tags", "persistence", "file", "*", "1.0");
TagsServiceFactory.MongoDbPersistenceDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-tags", "persistence", "mongodb", "*", "1.0");
TagsServiceFactory.ControllerDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-tags", "controller", "default", "*", "1.0");
TagsServiceFactory.HttpServiceDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-tags", "service", "http", "*", "1.0");
//# sourceMappingURL=TagsServiceFactory.js.map