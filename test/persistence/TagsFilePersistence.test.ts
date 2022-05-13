import { TagsFilePersistence } from '../../src/persistence/TagsFilePersistence';
import { TagsPersistenceFixture } from './TagsPersistenceFixture';

suite('TagsFilePersistence', ()=> {
    let persistence: TagsFilePersistence;
    let fixture: TagsPersistenceFixture;
    
    setup(async () => {
        persistence = new TagsFilePersistence('./data/tags.test.json');

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