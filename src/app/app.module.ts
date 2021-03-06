import { ModalWordOptionComponent } from './modal/modalWordOption';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PopoverModule } from 'ngx-bootstrap/popover'
import { AccordionModule, AlertModule, TabsModule } from 'ngx-bootstrap';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthGuardService } from './services/authguard.service';
import { ContextMenuModule } from 'ngx-contextmenu';
import { MzIconMdiModule } from 'ngx-materialize';
import { MzCardModule } from 'ngx-materialize';
import { MzButtonModule } from 'ngx-materialize';
import { MzNavbarModule } from 'ngx-materialize';
import { MzTabModule } from 'ngx-materialize';
import { MzInputModule } from 'ngx-materialize';
import { MzSelectModule } from 'ngx-materialize';
import { MzBadgeModule } from 'ngx-materialize';
import { MzToastModule } from 'ngx-materialize';
import { MzCollectionModule } from 'ngx-materialize';
import { MzModalModule } from 'ngx-materialize';
import { FlashcardsService } from './services/flashcards.service';

import { AppComponent } from './app.component';
import { RandomquoteComponent } from './components/randomquote/randomquote.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { LoginComponent } from './components/login/login.component';
import { MockComponent } from './components/mock/mock.component';
import { UserprofileComponent } from './components/userprofile/userprofile.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { AuthorizerComponent } from './authorizer/authorizer.component';
import { ModalContentComponent } from './modal/lOutmodal';
import { UserinfoComponent } from './components/userprofile/userinfo/userinfo.component';
import { HighlightTextDirective } from './directives/highlight-text.directive';
import { SplitWordsDirective } from './directives/split-words.directive';
import { VocabComponent } from './components/vocab/vocab.component';
import { TrainingComponent } from './components/training/training.component';
import { FlashcardsHomeComponent } from './flashcards-home/flashcards-home.component';
import { StartComponent } from './components/start/start.component';

const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'authorizer', component: AuthorizerComponent},
  { path: '401', component: UnauthorizedComponent},
  {
    path: 'home', component: MockComponent, // canActivate: [AuthGuardService],
    children: [
      { path: 'profile', component: UserprofileComponent},
      { path: 'randomquote', component: RandomquoteComponent },
      { path: 'vocabulario', component: VocabComponent },
      { path: 'training/flashcards/play', component: TrainingComponent },
      { path: 'training/flashcards/start', component: FlashcardsHomeComponent },
      { path: 'start', component: StartComponent }
    ]
}
];

@NgModule({
  declarations: [
    AppComponent,
    RandomquoteComponent,
    SpinnerComponent,
    LoginComponent,
    MockComponent,
    UserprofileComponent,
    UnauthorizedComponent,
    AuthorizerComponent,
    ModalContentComponent,
    ModalWordOptionComponent,
    UserinfoComponent,
    HighlightTextDirective,
    SplitWordsDirective,
    VocabComponent,
    TrainingComponent,
    FlashcardsHomeComponent,
    StartComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    CollapseModule.forRoot(),
    AccordionModule.forRoot(),
    AlertModule.forRoot(),
    ContextMenuModule.forRoot(),
    TabsModule.forRoot(),
    PopoverModule.forRoot(),
    MzIconMdiModule,
    MzCardModule,
    MzButtonModule,
    MzNavbarModule,
    MzTabModule,
    MzInputModule,
    MzSelectModule,
    MzBadgeModule,
    MzToastModule,
    MzCollectionModule,
    MzModalModule,
  ],
  providers: [AuthGuardService, AuthorizerComponent, VocabComponent, FlashcardsService],
  bootstrap: [AppComponent],
  entryComponents: [
    ModalContentComponent,
    ModalWordOptionComponent,
  ],
})
export class AppModule { }
