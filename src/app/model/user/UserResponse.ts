export interface UsersResponse {
  totalUsersCount: number;
  users?: (UserResponse)[] | null;
}

export interface UserResponse {
  email: string;
  ownChildCount: number;
  observedChildCount: number;
}

export interface UserResponseAfterUpdate {
  id: number;
  email: string;
  enabled: boolean;
  phoneNumber?: string | null;
}

export interface UserChangePasswordRequest {
  id: number;
  newPassword: string;
}
