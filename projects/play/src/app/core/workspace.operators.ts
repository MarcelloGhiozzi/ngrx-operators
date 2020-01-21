import { Operator } from './workspace.feature';
import { createNgRxFeature, createEntityFeature } from 'projects/ngrx-operators/src/public-api';

export const OPERATORS: Operator[] = [
    {
        id: 'create_feature',
        name: 'Create Feature',
        args: ['key'],
        function: createNgRxFeature
    },
    {
        id: 'create_entity_feature',
        name: 'Create Entity Feature',
        args: ['key'],
        function: createEntityFeature
    }
];
