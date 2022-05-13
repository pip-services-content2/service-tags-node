import { IdentifiableMongoDbPersistence } from 'pip-services3-mongodb-nodex';

import { PartyTagsV1 } from '../data/version1/PartyTagsV1';
import { ITagsPersistence } from './ITagsPersistence';

export class TagsMongoDbPersistence 
    extends IdentifiableMongoDbPersistence<PartyTagsV1, string> 
    implements ITagsPersistence {

    constructor() {
        super('tags');
    }

    public async set(correlationId: string, item: PartyTagsV1): Promise<PartyTagsV1> {
        if (item == null)
            return;

        item.change_time = new Date();
        return await super.set(correlationId, item);
    }
}
