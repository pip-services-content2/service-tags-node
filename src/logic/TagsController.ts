import { ConfigParams } from 'pip-services3-commons-nodex';
import { IConfigurable } from 'pip-services3-commons-nodex';
import { IReferences } from 'pip-services3-commons-nodex';
import { IReferenceable } from 'pip-services3-commons-nodex';
import { DependencyResolver } from 'pip-services3-commons-nodex';
import { ICommandable } from 'pip-services3-commons-nodex';
import { CommandSet } from 'pip-services3-commons-nodex';
import { TagsProcessor } from 'pip-services3-commons-nodex';

import { PartyTagsV1 } from '../data/version1/PartyTagsV1';
import { TagRecordV1 } from '../data/version1/TagRecordV1';
import { ITagsPersistence } from '../persistence/ITagsPersistence';
import { ITagsController } from './ITagsController';
import { TagsCommandSet } from './TagsCommandSet';

export class TagsController implements IConfigurable, IReferenceable, ICommandable, ITagsController {
    private static _defaultConfig: ConfigParams = ConfigParams.fromTuples(
        'dependencies.persistence', 'service-tags:persistence:*:*:1.0',
        'options.max_tags_count', 100
    );

    private _maxTagCount: number = 100;
    private _dependencyResolver: DependencyResolver = new DependencyResolver(TagsController._defaultConfig);
    private _persistence: ITagsPersistence;
    private _commandSet: TagsCommandSet;

    public configure(config: ConfigParams): void {
        this._dependencyResolver.configure(config);
        this._maxTagCount = config.getAsIntegerWithDefault('options.max_tag_count', this._maxTagCount);
    }

    public setReferences(references: IReferences): void {
        this._dependencyResolver.setReferences(references);
        this._persistence = this._dependencyResolver.getOneRequired<ITagsPersistence>('persistence');
    }

    public getCommandSet(): CommandSet {
        if (this._commandSet == null)
            this._commandSet = new TagsCommandSet(this);
        return this._commandSet;
    }
    
    public async getTags(correlationId: string, partyId: string): Promise<PartyTagsV1> {
        let partyTags = await this._persistence.getOneById(correlationId, partyId);

        if (partyTags == null)
            partyTags = new PartyTagsV1(partyId, []);
        return partyTags;
    }

    public async setTags(correlationId: string, partyTags: PartyTagsV1): Promise<PartyTagsV1> {
        return await this._persistence.set(correlationId, partyTags);
    }

    public updateTags(partyTags: PartyTagsV1, tags: string[]): PartyTagsV1 {
        partyTags.tags = partyTags.tags || [];

        // Add or update tags, increment their count and update last used time
        for (let tag of tags) {
            let tagRecord = partyTags.tags.find((r) => TagsProcessor.equalTags(r.tag, tag));

            if (tagRecord != null) {
                tagRecord.tag = tag;
                tagRecord.count = tagRecord.count + 1;
                tagRecord.last_time = new Date();
            } else {
                partyTags.tags.push(new TagRecordV1(tag, 1));
            }
        }
        
        return partyTags;
    }

    public trimTags(partyTags: PartyTagsV1, maxLength: number = 1000): PartyTagsV1 {
        partyTags.tags = partyTags.tags || [];

        // Limit number of tags. Remove older less used tags
        if (partyTags.tags.length > maxLength) {
            partyTags.tags = partyTags.tags.sort((r) => -r.last_time.getTime());
            partyTags.tags = partyTags.tags.slice(0, maxLength);
        }
        
        return partyTags;
    }

    public async recordTags(correlationId: string, partyId: string, tags: string[]): Promise<PartyTagsV1> {
        tags = TagsProcessor.normalizeTags(tags || []);

        // If there are no tags then skip processing
        if (tags.length == 0)
            return;

        let partyTags = await this.getTags(correlationId, partyId);

        partyTags = partyTags || new PartyTagsV1(partyId, []);

        partyTags = this.updateTags(partyTags, tags);
        partyTags = this.trimTags(partyTags, this._maxTagCount);

        return await this.setTags(correlationId, partyTags);
    }

}
