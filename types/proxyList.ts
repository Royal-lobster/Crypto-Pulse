export interface ProxyListResponse {
  count: number;
  next: any;
  previous: any;
  results: Result[];
}

export interface Result {
  id: string;
  username: string;
  password: string;
  proxy_address: string;
  port: number;
  valid: boolean;
  last_verification: string;
  country_code: string;
  city_name: string;
  created_at: string;
}
