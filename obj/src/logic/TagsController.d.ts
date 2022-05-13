import { ConfigParams } from 'pip-services3-commons-nodex';
import { IConfigurable } from 'pip-services3-commons-nodex';
import { IReferences } from 'pip-services3-commons-nodex';
import { IReferenceable } from 'pip-services3-commons-nodex';
import { ICommandable } from 'pip-services3-commons-nodex';
import { CommandSet } from 'pip-services3-commons-nodex';
import { PartyTagsV1 } from '../data/version1/PartyTagsV1';
import { ITagsController } from './ITagsController';
export declare class TagsController implements IConfigurable, IReferenceable, ICommandable, ITagsController {
    private static _defaultConfig;
    private _maxTagCount;
    private _dependencyResolver;
    private _persistence;
    private _commandSet;
    configure(config: ConfigParams): void;
    setReferences(references: IReferences): void;
    getCommandSet(): CommandSet;
    getTags(correlationId: string, partyId: string): Promise<PartyTagsV1>;
    setTags(correlationId: string, partyTags: PartyTagsV1): Promise<PartyTagsV1>;
    updateTags(partyTags: PartyTagsV1, tags: string[]): PartyTagsV1;
    trimTags(partyTags: PartyTagsV1, maxLength?: number): PartyTagsV1;
    recordTags(correlationId: string, partyId: string, tags: string[]): Promise<PartyTagsV1>;
}
