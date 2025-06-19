import { CabinFormInput } from "../features/cabins/CreateCabinForm";
import { Cabin } from "../types/Cabin";
import { CabinApi } from "../types/CabinApi";
import { CabinDTO } from "../types/CabinDTO";
import { Setting } from "../types/Setting";
import { SettingApi } from "../types/SettingApi";

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
    image:
      typeof cabinFormInput.image === "string"
        ? cabinFormInput.image
        : cabinFormInput.image.item(0),
  };
}

export function mapCabinToCabinDTO(cabin: Cabin): CabinDTO {
  return {
    name: cabin.name,
    max_capacity: cabin.maxCapacity,
    regular_price: cabin.regularPrice,
    discount: cabin.discount,
    description: cabin.description,
    image: cabin.image,
  };
}

export function mapSettingApiToSetting(settingApi: SettingApi): Setting {
  return {
    id: settingApi.id,
    createdAt: settingApi.created_at,
    minBookingLength: settingApi.min_booking_length,
    maxBookingLength: settingApi.max_booking_length,
    maxGuestsPerBooking: settingApi.max_guests_per_booking,
    breakfastPrice: settingApi.breakfast_price,
  };
}
