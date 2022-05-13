let assert = require('chai').assert;

import { ConfigParams } from 'pip-services3-commons-nodex';

import { PartyTagsV1 } from '../../src/data/version1/PartyTagsV1';
import { TagRecordV1 } from '../../src/data/version1/TagRecordV1';
import { TagsLambdaFunction } from '../../src/container/TagsLambdaFunction';


suite('TagsLambdaFunction', ()=> {
    let lambda: TagsLambdaFunction;

    suiteSetup(async () => {
        let config = ConfigParams.fromTuples(
            'logger.descriptor', 'pip-services:logger:console:default:1.0',
            'persistence.descriptor', 'service-tags:persistence:memory:default:1.0',
            'controller.descriptor', 'service-tags:controller:default:default:1.0'
        );

        lambda = new TagsLambdaFunction();
        lambda.configure(config);
        await lambda.open(null);
    });
    
    suiteTeardown(async () => {
        await lambda.close(null);
    });
    
    test('Record Tags', async () => {
        // Record tags first time
        let partyTags = await lambda.act(
            {
                role: 'tags',
                cmd: 'record_tags',
                party_id: '1',
                tags: ['tag1', 'tag 2', 'tag_3']
            }
        );

        assert.lengthOf(partyTags.tags, 3);

        // Record tags second time
        partyTags = await lambda.act(
            {
                role: 'tags',
                cmd: 'record_tags',
                party_id: '1',
                tags: ['TAG2', 'tag3', 'tag__4']
            }
        );

        assert.lengthOf(partyTags.tags, 4);

        // Get tags
        partyTags = await lambda.act(
            {
                role: 'tags',
                cmd: 'get_tags',
                party_id: '1'
            }
        );

        assert.lengthOf(partyTags.tags, 4);
    });
});