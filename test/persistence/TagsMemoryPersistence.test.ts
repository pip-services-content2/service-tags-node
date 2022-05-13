import { TagsMemoryPersistence } from '../../src/persistence/TagsMemoryPersistence';
import { TagsPersistenceFixture } from './TagsPersistenceFixture';

suite('TagsMemoryPersistence', ()=> {
    let persistence: TagsMemoryPersistence;
    let fixture: TagsPersistenceFixture;
    
    setup(async () => {
        persistence = new TagsMemoryPersistence();
        fixture = new TagsPersistenceFixture(persistence);
        
        await persistence.open(null);
    });
    
    teardown(async () => {
        await persistence.close(null);
    });
        
    test('Get and Set Tags', async () => {
        await fixture.testGetAndSetTags();
    });

});