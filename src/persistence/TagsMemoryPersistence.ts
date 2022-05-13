import { IdentifiableMemoryPersistence } from 'pip-services3-data-nodex';

import { PartyTagsV1 } from '../data/version1/PartyTagsV1';
import { ITagsPersistence } from './ITagsPersistence';

export class TagsMemoryPersistence 
    extends IdentifiableMemoryPersistence<PartyTagsV1, string> 
    implements ITagsPersistence {

    constructor() {
        super();
    }

    public async set(correlationId: string, item: PartyTagsV1): Promise<PartyTagsV1> {
        if (item == null)
            return;

        item.change_time = new Date();
        return await super.set(correlationId, item);
    }
}
