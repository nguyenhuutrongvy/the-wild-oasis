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

export async function createEditCabin(newCabin: CabinDTO, id?: number) {
  const hasImagePath = typeof newCabin.image === "string";

  let imageName = "";
  if (typeof newCabin.image !== "string") {
    imageName = `${Math.random()}-${newCabin.image?.name}`.replace(/\//g, "");
  }

  const imagePath = hasImagePath
    ? newCabin.image
    : `${import.meta.env.VITE_SUPABASE_URL}/${
        import.meta.env.VITE_SUPABASE_STORAGE_IMAGE_PATH
      }/${imageName}`;

  // 1. Upload image
  if (!hasImagePath) {
    const { error: storageError } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, newCabin.image!);

    if (storageError) {
      console.error(storageError);
      throw new Error(
        `Cabin image could not be uploaded${
          !id ? " and the cabin was not created" : ""
        }`,
      );
    }
  }

  // 2. Create/ Edit cabin
  if (!id) {
    // A. Create a new cabin
    const { data, error } = await supabase
      .from("cabins")
      .insert([{ ...newCabin, image: imagePath }])
      .select()
      .single();

    if (error) {
      console.error(error);
      throw new Error("Cabin could not be created");
    }

    return data;
  } else {
    // B. Update an existing cabin
    const { data, error } = await supabase
      .from("cabins")
      .update({ ...newCabin, image: imagePath })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error(error);
      throw new Error("Cabin could not be created");
    }

    return data;
  }
}

export async function deleteCabin(id: number) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }

  return data;
}
