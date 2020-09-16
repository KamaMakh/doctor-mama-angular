export interface UsersResponse {
  totalUserCount: number;
  users?: (UserResponse)[] | null;
}

export interface UserResponse {
  userId: number;
  email: string;
  ownChildCount: number;
  observedChildCount: number;
}
