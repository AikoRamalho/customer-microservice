import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

import {
  AuthenticationStrategy,
  KeycloakUserInfoResponse,
} from '../auth.strategy';

@Injectable()
export class KeycloakAuthenticationStrategy implements AuthenticationStrategy {
  private readonly baseURL: string;
  private readonly realm: string;

  constructor(private readonly httpService: HttpService) {
    this.baseURL = 'https://accounts.seguros.vitta.com.br/auth';
    this.realm = 'careers';
  }

  async authenticate(accessToken: string): Promise<KeycloakUserInfoResponse> {
    try {
      const url = `${this.baseURL}/realms/${this.realm}/protocol/openid-connect/userinfo`;

      const response = await firstValueFrom(
        this.httpService.get<KeycloakUserInfoResponse>(url, {
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        }),
      );

      return response.data;
    } catch (e) {
      throw new HttpException('sso indisponivel', HttpStatus.BAD_GATEWAY);
    }
  }
}
