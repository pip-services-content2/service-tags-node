import { IGetter } from 'pip-services3-data-nodex';
import { ISetter } from 'pip-services3-data-nodex';
import { PartyTagsV1 } from '../data/version1/PartyTagsV1';
export interface ITagsPersistence extends IGetter<PartyTagsV1, string>, ISetter<PartyTagsV1> {
    getOneById(correlationId: string, id: string): Promise<PartyTagsV1>;
    set(correlationId: string, item: PartyTagsV1): Promise<PartyTagsV1>;
}
