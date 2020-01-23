import { NgRxEntityFeature, NgRxFeature } from 'projects/ngrx-operators/src/lib/types/ngrx.feature';
import { Monad } from 'projects/ngrx-operators/src/public-api';
import { Block, BlockToOperator, BlockArgs, BlockNames } from './workspace.operators';
import { AppModule } from 'projects/play/src/app/app.module';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

export function sampleFeature(blocks: Block[]): NgRxEntityFeature<any> | NgRxFeature  {
        const b = blocks
                .filter(block => block.id === 'start')
                .pop();
        const start: Monad<NgRxEntityFeature<any> | NgRxFeature> =
                BlockToOperator[b.tag](...Object.values(b.args).map(arg => arg.value));
        const ops = blocks.filter(block => block.id !== 'start');
        return start.pipe(
                ...ops.map(block => BlockToOperator[block.tag](...Object.values(block.args).map(arg => blockArgToValue(block, arg))))
        ).sample();
}

export function blockArgToValue(block: Block, arg: {type: BlockArgs, value?: any}) {
        if (arg.type === BlockArgs.Action) {
                return (f: NgRxFeature) => f.actions[arg.value];
        }
        if (block.tag === BlockNames.AddHttpEffect && arg.type === BlockArgs.Request) {
                return (i: Injector) => (s: Observable<any>) => s.pipe(
                        switchMap(() => i.get(HttpClient).get(arg.value))
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



