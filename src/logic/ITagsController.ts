import { PartyTagsV1 } from '../data/version1/PartyTagsV1';

export interface ITagsController {
    getTags(correlationId: string, partyId: string): Promise<PartyTagsV1>;

    setTags(correlationId: string, partyTags: PartyTagsV1): Promise<PartyTagsV1>;
    
    recordTags(correlationId: string, partyId: string, tags: string[]): Promise<PartyTagsV1>;
}
