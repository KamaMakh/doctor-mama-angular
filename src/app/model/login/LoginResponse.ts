export interface LoginResponse {
  accessToken: string;
  tokenType: string;
  roles?: (RolesEntity)[] | null;
}
export interface RolesEntity {
  role: string;
}
