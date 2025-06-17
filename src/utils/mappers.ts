import { CabinFormInput } from "../features/cabins/CreateCabinForm";
import { Cabin } from "../types/Cabin";
import { CabinApi } from "../types/CabinApi";
import { CabinDTO } from "../types/CabinDTO";

export function mapCabinApiToCabin(cabinApi: CabinApi): Cabin {
  return {
    id: cabinApi.id,
    createdAt: cabinApi.created_at,
    name: cabinApi.name,
    maxCapacity: cabinApi.max_capacity,
    regularPrice: cabinApi.regular_price,
    discount: cabinApi.discount,
    description: cabinApi.description,
    image: cabinApi.image,
  };
}

export function mapCabinFormInputToCabinDTO(
  cabinFormInput: CabinFormInput,
): CabinDTO {
  return {
    name: cabinFormInput.name,
    max_capacity: cabinFormInput.maxCapacity,
    regular_price: cabinFormInput.regularPrice,
    discount: cabinFormInput.discount,
    description: cabinFormInput.description,
    image: cabinFormInput.image.item(0),
  };
}
