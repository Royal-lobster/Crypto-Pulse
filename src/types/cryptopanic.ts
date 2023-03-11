export interface ResponseData {
  count: number;
  next: string;
  previous?: null;
  results?: Results[] | null;
}
export interface Results {
  kind: string;
  domain: string;
  votes: Votes;
  source: Source;
  title: string;
  published_at: string;
  slug: string;
  currencies?: Currencies[] | null;
  id: number;
  url: string;
  created_at: string;
}
export interface Votes {
  negative: number;
  positive: number;
  important: number;
  liked: number;
  disliked: number;
  lol: number;
  toxic: number;
  saved: number;
  comments: number;
}
export interface Source {
  title: string;
  region: string;
  domain: string;
  path?: null;
}
export interface Currencies {
  code: string;
  title: string;
  slug: string;
  url: string;
}
