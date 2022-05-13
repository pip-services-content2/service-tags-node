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
exports.TagsCommandSet = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_3 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_4 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_5 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_6 = require("pip-services3-commons-nodex");
const PartyTagsV1Schema_1 = require("../data/version1/PartyTagsV1Schema");
class TagsCommandSet extends pip_services3_commons_nodex_1.CommandSet {
    constructor(logic) {
        super();
        this._logic = logic;
        // Register commands to the database
        this.addCommand(this.makeGetTagsCommand());
        this.addCommand(this.makeSetTagsCommand());
        this.addCommand(this.makeRecordTagsCommand());
    }
    makeGetTagsCommand() {
        return new pip_services3_commons_nodex_2.Command("get_tags", new pip_services3_commons_nodex_3.ObjectSchema(true)
            .withRequiredProperty('party_id', pip_services3_commons_nodex_5.TypeCode.String), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let partyId = args.getAsNullableString("party_id");
            return yield this._logic.getTags(correlationId, partyId);
        }));
    }
    makeSetTagsCommand() {
        return new pip_services3_commons_nodex_2.Command("set_tags", new pip_services3_commons_nodex_3.ObjectSchema(true)
            .withRequiredProperty('party_tags', new PartyTagsV1Schema_1.PartyTagsV1Schema()), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let partyTags = args.get("party_tags");
            partyTags.change_time = pip_services3_commons_nodex_6.DateTimeConverter.toNullableDateTime(partyTags.change_time);
            for (let tag of partyTags.tags)
                tag.last_time = pip_services3_commons_nodex_6.DateTimeConverter.toNullableDateTime(tag.last_time);
            return yield this._logic.setTags(correlationId, partyTags);
        }));
    }
    makeRecordTagsCommand() {
        return new pip_services3_commons_nodex_2.Command("record_tags", new pip_services3_commons_nodex_3.ObjectSchema(true)
            .withRequiredProperty('party_id', pip_services3_commons_nodex_5.TypeCode.String)
            .withRequiredProperty('tags', new pip_services3_commons_nodex_4.ArraySchema(pip_services3_commons_nodex_5.TypeCode.String)), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let partyId = args.getAsNullableString("party_id");
            let tags = args.getAsArray("tags");
            return yield this._logic.recordTags(correlationId, partyId, tags);
        }));
    }
}
exports.TagsCommandSet = TagsCommandSet;
//# sourceMappingURL=TagsCommandSet.js.map