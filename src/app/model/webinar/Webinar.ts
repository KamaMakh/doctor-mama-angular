export interface WebinarResponse {
  webinarId: number;
  name: string;
  description: string;
  price: number;
  productId?: number;
  sku_android?: string;
}

export interface WebinarRequest {
  id?: number;
  name: string;
  description: string;
  url?: string;
  price: number;
  sku_android?: string;
}

export interface VideoResponse {
  id: number;
  name: string;
  fileName: string;
  url: string;
}
