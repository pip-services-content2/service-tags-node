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
exports.TagsController = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_3 = require("pip-services3-commons-nodex");
const PartyTagsV1_1 = require("../data/version1/PartyTagsV1");
const TagRecordV1_1 = require("../data/version1/TagRecordV1");
const TagsCommandSet_1 = require("./TagsCommandSet");
class TagsController {
    constructor() {
        this._maxTagCount = 100;
        this._dependencyResolver = new pip_services3_commons_nodex_2.DependencyResolver(TagsController._defaultConfig);
    }
    configure(config) {
        this._dependencyResolver.configure(config);
        this._maxTagCount = config.getAsIntegerWithDefault('options.max_tag_count', this._maxTagCount);
    }
    setReferences(references) {
        this._dependencyResolver.setReferences(references);
        this._persistence = this._dependencyResolver.getOneRequired('persistence');
    }
    getCommandSet() {
        if (this._commandSet == null)
            this._commandSet = new TagsCommandSet_1.TagsCommandSet(this);
        return this._commandSet;
    }
    getTags(correlationId, partyId) {
        return __awaiter(this, void 0, void 0, function* () {
            let partyTags = yield this._persistence.getOneById(correlationId, partyId);
            if (partyTags == null)
                partyTags = new PartyTagsV1_1.PartyTagsV1(partyId, []);
            return partyTags;
        });
    }
    setTags(correlationId, partyTags) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._persistence.set(correlationId, partyTags);
        });
    }
    updateTags(partyTags, tags) {
        partyTags.tags = partyTags.tags || [];
        // Add or update tags, increment their count and update last used time
        for (let tag of tags) {
            let tagRecord = partyTags.tags.find((r) => pip_services3_commons_nodex_3.TagsProcessor.equalTags(r.tag, tag));
            if (tagRecord != null) {
                tagRecord.tag = tag;
                tagRecord.count = tagRecord.count + 1;
                tagRecord.last_time = new Date();
            }
            else {
                partyTags.tags.push(new TagRecordV1_1.TagRecordV1(tag, 1));
            }
        }
        return partyTags;
    }
    trimTags(partyTags, maxLength = 1000) {
        partyTags.tags = partyTags.tags || [];
        // Limit number of tags. Remove older less used tags
        if (partyTags.tags.length > maxLength) {
            partyTags.tags = partyTags.tags.sort((r) => -r.last_time.getTime());
            partyTags.tags = partyTags.tags.slice(0, maxLength);
        }
        return partyTags;
    }
    recordTags(correlationId, partyId, tags) {
        return __awaiter(this, void 0, void 0, function* () {
            tags = pip_services3_commons_nodex_3.TagsProcessor.normalizeTags(tags || []);
            // If there are no tags then skip processing
            if (tags.length == 0)
                return;
            let partyTags = yield this.getTags(correlationId, partyId);
            partyTags = partyTags || new PartyTagsV1_1.PartyTagsV1(partyId, []);
            partyTags = this.updateTags(partyTags, tags);
            partyTags = this.trimTags(partyTags, this._maxTagCount);
            return yield this.setTags(correlationId, partyTags);
        });
    }
}
exports.TagsController = TagsController;
TagsController._defaultConfig = pip_services3_commons_nodex_1.ConfigParams.fromTuples('dependencies.persistence', 'service-tags:persistence:*:*:1.0', 'options.max_tags_count', 100);
//# sourceMappingURL=TagsController.js.map