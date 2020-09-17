export interface ChildAvatarsResponse {
  totalImagesCount: number;
  images?: (ChildAvatarResponse)[] | null;
}

export interface ChildAvatarResponse {
  id: number;
  path: string;
}
