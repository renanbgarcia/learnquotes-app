import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthGuardService } from './services/authguard.service';
import { GetUserInfo } from './services/getUserInfo.service';

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

const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'authorizer', component: AuthorizerComponent},
  { path: '401', component: UnauthorizedComponent},
  {
    path: 'home', component: MockComponent, canActivate: [AuthGuardService],
    children: [
      { path: 'profile', component: UserprofileComponent},
      { path: 'randomquote', component: RandomquoteComponent }
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
    UserinfoComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    CollapseModule.forRoot()
  ],
  providers: [AuthGuardService, AuthorizerComponent],
  bootstrap: [AppComponent],
  entryComponents: [
    ModalContentComponent,
  ],
})
export class AppModule { }
