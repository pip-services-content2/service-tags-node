const assert = require('chai').assert;

import { Descriptor } from 'pip-services3-commons-nodex';
import { References } from 'pip-services3-commons-nodex';

import { PartyTagsV1 } from '../../src/data/version1/PartyTagsV1';
import { TagRecordV1 } from '../../src/data/version1/TagRecordV1';
import { TagsMemoryPersistence } from '../../src/persistence/TagsMemoryPersistence';
import { TagsController } from '../../src/logic/TagsController';

let TAGS = new PartyTagsV1(
    '1',
    [
        new TagRecordV1('tag1', 10),
        new TagRecordV1('Tag 2', 3),
        new TagRecordV1('TAG3', 4)
    ]
);

suite('TagsController', ()=> {
    let persistence: TagsMemoryPersistence;
    let controller: TagsController;

    suiteSetup(() => {
        persistence = new TagsMemoryPersistence();
        controller = new TagsController();

        let references: References = References.fromTuples(
            new Descriptor('service-tags', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('service-tags', 'controller', 'default', 'default', '1.0'), controller
        );

        controller.setReferences(references);
    });
    
    setup(async () => {
        await persistence.clear(null);
    });

    test('Get and Set Tags', async () => {
        // Update party tags
        let partyTags = await controller.setTags(null, TAGS);

        assert.lengthOf(partyTags.tags, 3);

        // Read and check party tags
        partyTags = await controller.getTags(null, '1');

        assert.lengthOf(partyTags.tags, 3);
    });

    test('Record Tags', async () => {
        // Record tags first time
        let partyTags = await controller.recordTags(
            null,
            '1',
            ['tag1', 'tag 2', 'tag_3']
        );

        assert.lengthOf(partyTags.tags, 3);

        // Record tags second time
        partyTags = await controller.recordTags(
            null,
            '1',
            ['TAG2', 'tag3', 'tag__4']
        );

        assert.lengthOf(partyTags.tags, 4);

        // Get tags
        partyTags = await controller.getTags(null, '1');

        assert.lengthOf(partyTags.tags, 4);

    });
    
});