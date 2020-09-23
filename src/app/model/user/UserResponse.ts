export interface UsersResponse {
  totalUsersCount: number;
  users?: (UserResponse)[] | null;
}

export interface UserResponse {
  id: number;
  email: string;
  ownChildCount: number;
  observedChildCount: number;
  adminComment?: string;
}

export interface UserResponseAfterUpdate {
  id: number;
  email: string;
  enabled: boolean;
  phoneNumber?: string | null;
  adminComment?: string;
}

export interface UserChangePasswordRequest {
  id: number;
  newPassword: string;
}
