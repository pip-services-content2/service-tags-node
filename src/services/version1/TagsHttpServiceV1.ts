import { Descriptor } from 'pip-services3-commons-nodex';
import { CommandableHttpService } from 'pip-services3-rpc-nodex';

export class TagsHttpServiceV1 extends CommandableHttpService {
    public constructor() {
        super('v1/tags');
        this._dependencyResolver.put('controller', new Descriptor('service-tags', 'controller', 'default', '*', '1.0'));
    }
}