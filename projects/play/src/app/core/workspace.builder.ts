import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgRxEntityFeature, NgRxFeature } from 'projects/ngrx-operators/src/lib/types/ngrx.feature';
import { Monad, addSwitchEffect } from 'projects/ngrx-operators/src/public-api';
import { map } from 'rxjs/operators';
import { Block, BlockArgs, BlockNames, BlockToOperator } from './workspace.operators';

export function sampleFeature(blocks: Block[]): NgRxEntityFeature<any> | NgRxFeature  {
        const b = blocks
                .filter(block => block.id === 'start')
                .pop();
        const start: Monad<NgRxEntityFeature<any> | NgRxFeature> =
                BlockToOperator[b.tag](...Object.values(b.args).map(arg => arg.value));
        const ops = blocks.filter(block => block.id !== 'start');
        return start.pipe(
                ...ops.map(block => BlockToOperator[block.tag](...Object.values(block.args).map(arg => blockArgToValue(block, arg)))),
        ).sample();
}

export function blockArgToValue(block: Block, arg: {type: BlockArgs, value?: any}) {
        if (arg.type === BlockArgs.Action) {
                return (f: NgRxFeature) => f.actions[arg.value];
        }
        if (block.tag === BlockNames.AddHttpEffect && arg.type === BlockArgs.Request) {
                return (i) => i.get(HttpClient).get(arg.value).pipe(
                        map(result => ({items: result}))
                );
        }
        return arg.value;
}

@Injectable({providedIn: 'root'})
export class WorkspaceService {

        static feature: NgRxEntityFeature<any> | NgRxFeature;

        mountFeature(feature: NgRxEntityFeature<any> | NgRxFeature) {
                WorkspaceService.feature = feature;
        }
}



