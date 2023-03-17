export interface Coin {
  id: string;
  image?: {
    large: string;
    thumb: string;
    small: string;
  };
  thumb?: string;
  large?: string;
  name: string;
  symbol: string;
}
