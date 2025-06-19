import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { createEditCabin } from "../../services/apiCabins";
import { CabinDTO } from "../../types/CabinDTO";

export function useUpdateCabin() {
  const queryClient = useQueryClient();

  const { mutate: updateCabin, isLoading: isUpdating } = useMutation({
    mutationFn: ({ cabin, id }: { cabin: CabinDTO; id: number }) =>
      createEditCabin(cabin, id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });

      toast.success("Cabin successfully updated");
    },
    onError: (err: Error) => toast.error(err.message),
  });

  return { isUpdating, updateCabin };
}
