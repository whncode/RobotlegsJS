// ------------------------------------------------------------------------------
//  Copyright (c) 2016 Goodgame Studios. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { ICommandExecutor } from "../../commandCenter/api/ICommandExecutor";
import { ICommandMapping } from "../../commandCenter/api/ICommandMapping";
import { ICommandMappingList } from "../../commandCenter/api/ICommandMappingList";
import { CommandPayload } from "../../commandCenter/api/CommandPayload";

import { CommandMapping } from "../../commandCenter/impl/CommandMapping";

import { IDirectCommandConfigurator } from "../../directCommandMap/dsl/IDirectCommandConfigurator";

/**
 * @private
 */
export class DirectCommandMapper implements IDirectCommandConfigurator {

    /*============================================================================*/
    /* Private Properties                                                         */
    /*============================================================================*/

    private _mappings: ICommandMappingList;

    private _mapping: ICommandMapping;

    private _executor: ICommandExecutor;

    /*============================================================================*/
    /* Constructor                                                                */
    /*============================================================================*/

    /**
     * @private
     */
    constructor(executor: ICommandExecutor, mappings: ICommandMappingList, commandClass: Object) {
        this._executor = executor;
        this._mappings = mappings;
        this._mapping = new CommandMapping(commandClass);
        this._mapping.setFireOnce(true);
        this._mappings.addMapping(this._mapping);
    }

    /*============================================================================*/
    /* Public Functions                                                           */
    /*============================================================================*/

    /**
     * @inheritDoc
     */
    public withExecuteMethod(name: string): IDirectCommandConfigurator {
        this._mapping.setExecuteMethod(name);
        return this;
    }

    /**
     * @inheritDoc
     */
    public withGuards(...guards: any[]): IDirectCommandConfigurator {
        this._mapping.addGuards(...guards);
        return this;
    }

    /**
     * @inheritDoc
     */
    public withHooks(...hooks: any[]): IDirectCommandConfigurator {
        this._mapping.addHooks(...hooks);
        return this;
    }

    /**
     * @inheritDoc
     */
    public withPayloadInjection(value: boolean = true): IDirectCommandConfigurator {
        this._mapping.setPayloadInjectionEnabled(value);
        return this;
    }

    /**
     * @inheritDoc
     */
    public execute(payload: CommandPayload = null): void {
        this._executor.executeCommands(this._mappings.getList(), payload);
    }

    /**
     * @inheritDoc
     */
    public map(commandClass: Object): IDirectCommandConfigurator {
        return new DirectCommandMapper(this._executor, this._mappings, commandClass);
    }
}
