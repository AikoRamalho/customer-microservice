import { Inject, Injectable, Logger } from '@nestjs/common';

import {
  AUTHENTICATION_STRATEGY_TOKEN,
  AuthenticationStrategy,
} from './auth.strategy';

export class AuthenticationError extends Error {}

@Injectable()
export class AuthenticationService {
  private logger = new Logger(AuthenticationService.name);

  constructor(
    @Inject(AUTHENTICATION_STRATEGY_TOKEN)
    private readonly strategy: AuthenticationStrategy,
  ) {}

  async authenticate(accessToken: string): Promise<void> {
    try {
      await this.strategy.authenticate(accessToken);
    } catch (e) {
      this.logger.error(e.message, e.stack);
      throw new AuthenticationError(e.message);
    }
  }
}
