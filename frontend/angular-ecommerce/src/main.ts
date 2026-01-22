/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

import { OktaAuth } from '@okta/okta-auth-js';
import { OKTA_AUTH } from '@okta/okta-angular';
import myAppConfig from './app/config/my-app-config';

const oktaAuth = new OktaAuth(myAppConfig.oidc);

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    ...(appConfig.providers ?? []),
    {
      provide: OKTA_AUTH,
      useValue: oktaAuth
    }
  ]
}).catch(err => console.error(err));
