import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';

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
    const url = `${this.baseURL}/realms/${this.realm}/protocol/openid-connect/userinfo`;

    const { data } = await firstValueFrom(
      this.httpService
        .get<KeycloakUserInfoResponse>(url, {
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        })
        .pipe(
          catchError((error) => {
            if (error.response?.data?.error === 'invalid_token') {
              throw new HttpException(
                'nao autorizado',
                HttpStatus.UNAUTHORIZED,
              );
            }
            throw new HttpException(
              'sso nao disponivel',
              HttpStatus.BAD_GATEWAY,
            );
          }),
        ),
    );

    return data;
  }
}
