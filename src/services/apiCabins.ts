import { CabinDTO } from "../types/CabinDTO";
import supabase from "../utils/supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

export async function createCabin(newCabin: CabinDTO) {
  const imageName = `${Math.random()}-${newCabin.image?.name}`.replace(
    /\//g,
    "",
  );

  const imagePath = `${import.meta.env.VITE_SUPABASE_URL}/${
    import.meta.env.VITE_SUPABASE_STORAGE_IMAGE_PATH
  }/${imageName}`;

  // 1. Upload image
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image!);

  if (storageError) {
    console.error(storageError);
    throw new Error(
      "Cabin image could not be uploaded and the cabin was not created",
    );
  }

  // 2. Create a new cabin
  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...newCabin, image: imagePath }]);

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created");
  }

  return data;
}

export async function deleteCabin(id: number) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }

  return data;
}
