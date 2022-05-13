import { Descriptor } from 'pip-services3-commons-nodex';
import { CommandableLambdaFunction } from 'pip-services3-aws-nodex';
import { TagsServiceFactory } from '../build/TagsServiceFactory';

export class TagsLambdaFunction extends CommandableLambdaFunction {
    public constructor() {
        super("tags", "Search tags function");
        this._dependencyResolver.put('controller', new Descriptor('service-tags', 'controller', 'default', '*', '*'));
        this._factories.add(new TagsServiceFactory());
    }
}

export const handler = new TagsLambdaFunction().getHandler();