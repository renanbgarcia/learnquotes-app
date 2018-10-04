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
import { ContextMenuModule } from 'ngx-contextmenu'

import { AppComponent } from './app.component';
import { RandomquoteComponent } from './randomquote/randomquote.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { LoginComponent } from './login/login.component';
import { MockComponent } from './mock/mock.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { AuthorizerComponent } from './authorizer/authorizer.component';
import { ModalContentComponent } from './modal/lOutmodal';
import { UserinfoComponent } from './userprofile/userinfo/userinfo.component';
import { HighlightTextDirective } from './directives/highlight-text.directive';
import { SplitWordsDirective } from './directives/split-words.directive'
import { EscapeHtmlPipe } from './pipes/keep-html.pipe';
import { VocabComponent } from './vocab/vocab.component';

const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'authorizer', component: AuthorizerComponent},
  { path: '401', component: UnauthorizedComponent},
  {
    path: 'home', component: MockComponent, //canActivate: [AuthGuardService],
    children: [
      { path: 'profile', component: UserprofileComponent},
      { path: 'randomquote', component: RandomquoteComponent },
      { path: 'vocabulario', component: VocabComponent }
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
    EscapeHtmlPipe,
    VocabComponent
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
  ],
  providers: [AuthGuardService, AuthorizerComponent, VocabComponent],
  bootstrap: [AppComponent],
  entryComponents: [
    ModalContentComponent,
    ModalWordOptionComponent
  ],
})
export class AppModule { }
