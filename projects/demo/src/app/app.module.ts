import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppComponent } from './app.component';
import { TodoFeatureModule } from './todo.operators/todo.feature';
import { UserFeatureModule } from './user.feature';
import { AngularFireModule } from '@angular/fire';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument(),
    AngularFireModule.initializeApp({
      apiKey: 'AIzaSyAs2MYP-Y9IuiDweiOgpwVpGNhWThGUKzA',
      authDomain: 'test-b63e2.firebaseapp.com',
      databaseURL: 'https://test-b63e2.firebaseio.com',
      projectId: 'test-b63e2',
      storageBucket: 'test-b63e2.appspot.com',
      messagingSenderId: '1019575076422',
      appId: '1:1019575076422:web:0d87384b4ae3af8df6ac47'
    }),
    UserFeatureModule,
    TodoFeatureModule,
  ],
  bootstrap: [AppComponent],
  exports: []
})
export class AppModule {}
