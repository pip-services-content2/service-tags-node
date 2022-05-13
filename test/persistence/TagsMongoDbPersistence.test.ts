import { ConfigParams } from 'pip-services3-commons-nodex';

import { TagsMongoDbPersistence } from '../../src/persistence/TagsMongoDbPersistence';
import { TagsPersistenceFixture } from './TagsPersistenceFixture';

suite('TagsMongoDbPersistence', ()=> {
    let persistence: TagsMongoDbPersistence;
    let fixture: TagsPersistenceFixture;

    setup(async () => {
        var MONGO_DB = process.env["MONGO_DB"] || "test";
        var MONGO_COLLECTION = process.env["MONGO_COLLECTION"] || "tags";
        var MONGO_SERVICE_HOST = process.env["MONGO_SERVICE_HOST"] || "localhost";
        var MONGO_SERVICE_PORT = process.env["MONGO_SERVICE_PORT"] || "27017";
        var MONGO_SERVICE_URI = process.env["MONGO_SERVICE_URI"];

        var dbConfig = ConfigParams.fromTuples(
            "collection", MONGO_COLLECTION,
            "connection.database", MONGO_DB,
            "connection.host", MONGO_SERVICE_HOST,
            "connection.port", MONGO_SERVICE_PORT,
            "connection.uri", MONGO_SERVICE_URI
        );

        persistence = new TagsMongoDbPersistence();
        persistence.configure(dbConfig);

        fixture = new TagsPersistenceFixture(persistence);

        await persistence.open(null);
        await persistence.clear(null);
    });
    
    teardown(async () => {
        await persistence.close(null);
    });

    test('Get and Set Tags', async () => {
        await fixture.testGetAndSetTags();
    });
});