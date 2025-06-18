import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { createEditCabin } from "../../services/apiCabins";
import { CabinDTO } from "../../types/CabinDTO";

export function useEditCabin() {
  const queryClient = useQueryClient();

  const { mutate: editCabin, isLoading: isEditing } = useMutation({
    mutationFn: ({ cabin, id }: { cabin: CabinDTO; id: number }) =>
      createEditCabin(cabin, id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });

      toast.success("Cabin successfully edited");
    },
    onError: (err: Error) => toast.error(err.message),
  });

  return { isEditing, editCabin };
}
