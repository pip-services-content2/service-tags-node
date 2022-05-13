const restify = require('restify');
const assert = require('chai').assert;

import { ConfigParams } from 'pip-services3-commons-nodex';
import { Descriptor } from 'pip-services3-commons-nodex';
import { References } from 'pip-services3-commons-nodex';

import { PartyTagsV1 } from '../../../src/data/version1/PartyTagsV1';
import { TagRecordV1 } from '../../../src/data/version1/TagRecordV1';
import { TagsMemoryPersistence } from '../../../src/persistence/TagsMemoryPersistence';
import { TagsController } from '../../../src/logic/TagsController';
import { TagsHttpServiceV1 } from '../../../src/services/version1/TagsHttpServiceV1';

let httpConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);

let TAGS = new PartyTagsV1(
    '1',
    [
        new TagRecordV1('tag1', 10),
        new TagRecordV1('Tag 2', 3),
        new TagRecordV1('TAG3', 4)
    ]
);

suite('TagsHttpServiceV1', ()=> {
    let persistence: TagsMemoryPersistence;
    let service: TagsHttpServiceV1;

    let rest: any;

    suiteSetup(async () => {
        persistence = new TagsMemoryPersistence();
        let controller = new TagsController();

        service = new TagsHttpServiceV1();
        service.configure(httpConfig);

        let references: References = References.fromTuples(
            new Descriptor('service-tags', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('service-tags', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('service-tags', 'service', 'http', 'default', '1.0'), service
        );
        controller.setReferences(references);
        service.setReferences(references);

        await service.open(null);
    });
    
    suiteTeardown(async () => {
        await service.close(null);
    });

    setup(async () => {
        let url = 'http://localhost:3000';
        rest = restify.createJsonClient({ url: url, version: '*' });
        await persistence.clear(null);
    });
    
    test('Get and Set Tags', async () => {
        // Set party tags
        let partyTags = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/tags/set_tags',
                {
                    party_tags: TAGS
                },
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        assert.lengthOf(partyTags.tags, 3);

        // Read and check party tags
        partyTags = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/tags/get_tags',
                {
                    party_id: '1'
                },
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        assert.lengthOf(partyTags.tags, 3);
    });

    test('Record Tags', async () => {
        // Record tags first time
        let partyTags = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/tags/record_tags',
                {
                    party_id: '1',
                    tags: ['tag1', 'tag 2', 'tag_3']
                },
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });
        
        assert.lengthOf(partyTags.tags, 3);

        // Record tags second time
        partyTags = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/tags/record_tags',
                {
                    party_id: '1',
                    tags: ['TAG2', 'tag3', 'tag__4']
                },
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        assert.lengthOf(partyTags.tags, 4);

        // Get tags
        partyTags = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/tags/get_tags',
                {
                    party_id: '1'
                },
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        assert.lengthOf(partyTags.tags, 4);
    });

});