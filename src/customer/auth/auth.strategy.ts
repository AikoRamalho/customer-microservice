export const AUTHENTICATION_STRATEGY_TOKEN = 'AuthenticationStrategy';

export interface KeycloakUserInfoResponse {
  sub: string;
  email_verified: boolean;
  preferred_username: string;
}

export interface AuthenticationStrategy {
  authenticate(accessToken: string): Promise<KeycloakUserInfoResponse>;
}
