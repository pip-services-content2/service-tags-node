const assert = require('chai').assert;

import { ITagsPersistence } from '../../src/persistence/ITagsPersistence';
import { PartyTagsV1 } from '../../src/data/version1/PartyTagsV1';
import { TagRecordV1 } from '../../src/data/version1/TagRecordV1';

let TAGS = new PartyTagsV1(
    '1',
    [
        new TagRecordV1('tag1', 10),
        new TagRecordV1('Tag 2', 3),
        new TagRecordV1('TAG3', 4)
    ]
);
    
export class TagsPersistenceFixture {
    private _persistence: ITagsPersistence;
    
    constructor( persistence) {
        assert.isNotNull( persistence);
        this._persistence =  persistence;
    }

    public async testGetAndSetTags() {
        // Set party tags
        let partyTags = await this._persistence.set(null, TAGS);

        assert.lengthOf(partyTags.tags, 3);

        // Read and check party tags
        partyTags = await this._persistence.getOneById(null, '1');

        assert.lengthOf(partyTags.tags, 3);
    }

}
