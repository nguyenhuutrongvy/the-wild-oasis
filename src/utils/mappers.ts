import { Cabin } from "../types/Cabin";
import { CabinDTO } from "../types/CabinDTO";

export function mapCabinToCabinDTO(cabin: Cabin): CabinDTO {
  return {
    id: cabin.id,
    createdAt: cabin.created_at,
    name: cabin.name,
    maxCapacity: cabin.max_capacity,
    regularPrice: cabin.regular_price,
    discount: cabin.discount,
    description: cabin.description,
    image: cabin.image,
  };
}
