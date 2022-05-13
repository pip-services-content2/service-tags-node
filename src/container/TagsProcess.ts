import { ProcessContainer } from 'pip-services3-container-nodex';
import { DefaultRpcFactory } from 'pip-services3-rpc-nodex';
import { DefaultSwaggerFactory } from 'pip-services3-swagger-nodex';

import { TagsServiceFactory } from '../build/TagsServiceFactory';


export class TagsProcess extends ProcessContainer {

    public constructor() {
        super("tags", "Search tags microservice");
        this._factories.add(new TagsServiceFactory);
        this._factories.add(new DefaultRpcFactory);
        this._factories.add(new DefaultSwaggerFactory);
    }

}
