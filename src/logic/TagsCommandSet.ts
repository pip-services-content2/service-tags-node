import { CommandSet } from 'pip-services3-commons-nodex';
import { ICommand } from 'pip-services3-commons-nodex';
import { Command } from 'pip-services3-commons-nodex';
import { Parameters } from 'pip-services3-commons-nodex';
import { ObjectSchema } from 'pip-services3-commons-nodex';
import { ArraySchema } from 'pip-services3-commons-nodex';
import { TypeCode } from 'pip-services3-commons-nodex';
import { DateTimeConverter } from 'pip-services3-commons-nodex';

import { PartyTagsV1Schema } from '../data/version1/PartyTagsV1Schema';
import { ITagsController } from './ITagsController';

export class TagsCommandSet extends CommandSet {
    private _logic: ITagsController;

    constructor(logic: ITagsController) {
        super();

        this._logic = logic;

        // Register commands to the database
		this.addCommand(this.makeGetTagsCommand());
		this.addCommand(this.makeSetTagsCommand());
		this.addCommand(this.makeRecordTagsCommand());
    }

	private makeGetTagsCommand(): ICommand {
		return new Command(
			"get_tags",
			new ObjectSchema(true)
				.withRequiredProperty('party_id', TypeCode.String),
            async (correlationId: string, args: Parameters) => {
                let partyId = args.getAsNullableString("party_id");
                return await this._logic.getTags(correlationId, partyId);
            }
		);
	}

	private makeSetTagsCommand(): ICommand {
		return new Command(
			"set_tags",
			new ObjectSchema(true)
				.withRequiredProperty('party_tags', new PartyTagsV1Schema()),
            async (correlationId: string, args: Parameters) => {
                let partyTags = args.get("party_tags");
				partyTags.change_time = DateTimeConverter.toNullableDateTime(partyTags.change_time);
				for (let tag of partyTags.tags) 
					tag.last_time = DateTimeConverter.toNullableDateTime(tag.last_time);

                return await this._logic.setTags(correlationId, partyTags);
            }
		);
	}

	private makeRecordTagsCommand(): ICommand {
		return new Command(
			"record_tags",
			new ObjectSchema(true)
				.withRequiredProperty('party_id', TypeCode.String)
				.withRequiredProperty('tags', new ArraySchema(TypeCode.String)),
            async (correlationId: string, args: Parameters) => {
                let partyId = args.getAsNullableString("party_id");
                let tags = args.getAsArray("tags");
				return await this._logic.recordTags(correlationId, partyId, tags);
            }
		);
	}

}