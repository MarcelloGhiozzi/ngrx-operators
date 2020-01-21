import { Injectable } from '@angular/core';
import { NgRxFeature, NgRxEntityFeature } from 'projects/ngrx-operators/src/lib/types/ngrx.feature';
import { createEntityFeature } from 'projects/ngrx-operators/src/public-api';


@Injectable({providedIn: 'root'})
export class KeeperService {

    public build: NgRxFeature | NgRxEntityFeature<any> = createEntityFeature('build').sample();

}
