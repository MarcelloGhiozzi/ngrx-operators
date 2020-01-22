import { Operator } from './workspace.feature';

export enum BlockNames {
    CreateFeature = 'create_feature',
    CreateEntityFeature = 'create_entity_feature',
    AddAction = 'add_action',
    AddEffectMap = 'add_effect_map',
    AddHttpEffect = 'add_http_effect'
}

export const BLOCKS: Operator[] = [
    {
        id: BlockNames.CreateFeature,
        name: 'Create Feature',
        description: 'The basic starter operator: define the feature key and initial state'
    },
    {
        id: BlockNames.CreateEntityFeature,
        name: 'Create Entity Feature',
        description: 'Start from here if you are creating an entity feature with multiple entities'
    },
    {
        id: BlockNames.AddAction,
        name: 'Create Feature',
        description: 'The basic starter operator: define the feature key and initial state'
    },
    {
        id: BlockNames.AddEffectMap,
        name: 'Create Entity Feature',
        description: 'Start from here if you are creating an entity feature with multiple entities'
    },
    {
        id: BlockNames.AddHttpEffect,
        name: 'Create Feature',
        description: 'The basic starter operator: define the feature key and initial state'
    },
];


