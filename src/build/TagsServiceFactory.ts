import { Factory } from 'pip-services3-components-nodex';
import { Descriptor } from 'pip-services3-commons-nodex';

import { TagsMongoDbPersistence } from '../persistence/TagsMongoDbPersistence';
import { TagsFilePersistence } from '../persistence/TagsFilePersistence';
import { TagsMemoryPersistence } from '../persistence/TagsMemoryPersistence';
import { TagsController } from '../logic/TagsController';
import { TagsHttpServiceV1 } from '../services/version1/TagsHttpServiceV1';

export class TagsServiceFactory extends Factory {
	public static Descriptor = new Descriptor("service-tags", "factory", "default", "default", "1.0");
	public static MemoryPersistenceDescriptor = new Descriptor("service-tags", "persistence", "memory", "*", "1.0");
	public static FilePersistenceDescriptor = new Descriptor("service-tags", "persistence", "file", "*", "1.0");
	public static MongoDbPersistenceDescriptor = new Descriptor("service-tags", "persistence", "mongodb", "*", "1.0");
	public static ControllerDescriptor = new Descriptor("service-tags", "controller", "default", "*", "1.0");
	public static HttpServiceDescriptor = new Descriptor("service-tags", "service", "http", "*", "1.0");
	
	constructor() {
		super();
		this.registerAsType(TagsServiceFactory.MemoryPersistenceDescriptor, TagsMemoryPersistence);
		this.registerAsType(TagsServiceFactory.FilePersistenceDescriptor, TagsFilePersistence);
		this.registerAsType(TagsServiceFactory.MongoDbPersistenceDescriptor, TagsMongoDbPersistence);
		this.registerAsType(TagsServiceFactory.ControllerDescriptor, TagsController);
		this.registerAsType(TagsServiceFactory.HttpServiceDescriptor, TagsHttpServiceV1);
	}
	
}
