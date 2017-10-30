export interface TokenResponse {
    access_token: string;
    expires_in: number;
    token_type: string;
    refresh_token?: string;
}

export interface TokenDescriptor {
    accessToken: string;
    tokenType: string;
    creationTime: number;
    expirationTime: number;
    refreshToken?: string;
}
