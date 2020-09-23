export interface ConsultantsResponse {
  totalUsersCount: number;
  users?: (ConsultantResponse)[] | null;
}

export interface ConsultantResponse {
  id: number;
  email: string;
}

export interface ConsultantRequest {
  email: string;
  password: string;
}
