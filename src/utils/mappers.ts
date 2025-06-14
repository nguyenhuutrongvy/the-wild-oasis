import { Cabin } from "../types/Cabin";
import { CabinApi } from "../types/CabinApi";

export function mapCabinApiToCabin(cabin: CabinApi): Cabin {
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
