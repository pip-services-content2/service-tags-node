import { IdentifiableMemoryPersistence } from 'pip-services3-data-nodex';
import { PartyTagsV1 } from '../data/version1/PartyTagsV1';
import { ITagsPersistence } from './ITagsPersistence';
export declare class TagsMemoryPersistence extends IdentifiableMemoryPersistence<PartyTagsV1, string> implements ITagsPersistence {
    constructor();
    set(correlationId: string, item: PartyTagsV1): Promise<PartyTagsV1>;
}
