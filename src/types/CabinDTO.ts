export type CabinDTO = {
  name: string;
  max_capacity: number;
  regular_price: number;
  discount: number;
  description: string;
  image: File | null | string;
};
