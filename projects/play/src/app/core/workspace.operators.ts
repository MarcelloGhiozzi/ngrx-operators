import { createEntityFeature, createNgRxFeature, addHttpEffect, addEffectMap, addSelectableEntity, addSwitchEffect } from 'projects/ngrx-operators/src/public-api';

export enum BlockArgs {
    Number = 'number',
    String = 'string',
    Object = 'object',
    Action = 'action',
    Request = 'request'
}

export interface Block {
    id: string;
    tag: BlockNames;
    name?: string;
    description?: string;
    args?: {
        [name: string]: {
            type: BlockArgs,
            value?: any
        }
    };
}

export enum BlockNames {
    CreateFeature = 'create_feature',
    CreateEntityFeature = 'create_entity_feature',
    AddEffectMap = 'add_effect_map',
    AddHttpEffect = 'add_http_effect',
    AddSelectableEntity = 'add_selectable_entity'
}

export const BlockToOperator: {
    [P in BlockNames]: any
} = {
    [BlockNames.CreateEntityFeature]: createEntityFeature,
    [BlockNames.CreateFeature]: createNgRxFeature,
    [BlockNames.AddHttpEffect]: addSwitchEffect,
    [BlockNames.AddEffectMap]: addEffectMap,
    [BlockNames.AddSelectableEntity]: addSelectableEntity
};

export const BLOCKS: {[id: string]: Block} = {
    [BlockNames.CreateFeature]: {
        id: 'start',
        tag: BlockNames.CreateFeature,
        name: 'Create Feature',
        description: 'A basic feature with a feature selector and intial state',
        args:  {
            key: {type: BlockArgs.String, value: 'counter'},
            state: {type: BlockArgs.Object, value: {value: 0}}
        }
    },
    [BlockNames.CreateEntityFeature]: {
        id: 'start',
        tag: BlockNames.CreateEntityFeature,
        name: 'Create Entity Feature',
        description: 'This blocks creates a full entitiy feature with common selectors and actions',
        args: {
            key: {type: BlockArgs.String, value: 'todos'}
        }
    },
    [BlockNames.AddHttpEffect]: {
        id: null,
        tag: BlockNames.AddHttpEffect,
        name: 'Add Http Effect',
        description: 'Adds a trigger, success and failure actions already wired to an http request',
        args: {
            name: {type: BlockArgs.String, value: 'load'},
            url: {type: BlockArgs.Request, value: 'https://jsonplaceholder.typicode.com/todos'}
        }
    },
    [BlockNames.AddEffectMap]: {
        id: null,
        tag: BlockNames.AddEffectMap,
        name: 'Add Effect Map',
        description: 'Creates an effect that maps action A to action B',
        args: {
            from: {type: BlockArgs.Action},
            to: {type: BlockArgs.Action}
        }
    },
    [BlockNames.AddSelectableEntity]: {
        id: 'selectable',
        tag: BlockNames.AddSelectableEntity,
        name: 'Add Selectable Enitity',
        description: 'Add what needed to select a single entity from an entity feature',
        args: {}
    }
};


