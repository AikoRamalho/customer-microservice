import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { AuthenticationGuard } from './auth.guard';
import { AuthenticationService } from './auth.service';
import { AUTHENTICATION_STRATEGY_TOKEN } from './auth.strategy';
import { KeycloakAuthenticationStrategy } from './strategy/keycloak.strategy';

@Module({
  imports: [HttpModule],
  providers: [
    AuthenticationGuard,
    AuthenticationService,
    {
      provide: AUTHENTICATION_STRATEGY_TOKEN,
      useClass: KeycloakAuthenticationStrategy,
    },
  ],
  exports: [AuthenticationService],
})
export class AuthenticationModule {}
