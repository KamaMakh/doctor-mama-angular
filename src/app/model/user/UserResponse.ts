export interface UsersResponse {
  totalUsersCount: number;
  users?: (UserResponse)[] | null;
}

export interface UserResponse {
  email: string;
  ownChildCount: number;
  observedChildCount: number;
}
