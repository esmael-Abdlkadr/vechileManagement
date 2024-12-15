import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addVechile,
  deleteVechile,
  getVechile,
  getVechiles,
  updateVechile,
} from "../API/services/vechileService";

export const useAddVechile = () => {
  const queryCleint = useQueryClient();
  const { mutateAsync, isPending, isSuccess } = useMutation({
    mutationFn: addVechile,
    mutationKey: ["addvechile"],
    onSuccess: () => {
      queryCleint.invalidateQueries({ queryKey: ["vechiles"] });
    },
  });
  return { addNewVechile: mutateAsync, isPending, isSuccess };
};

interface VechileFilters {
  page: number;
  limit: number;
  //   sortField: string;
  //   sortDirection: "asc" | "desc";
}

export const useGetAllVechiles = (filters: VechileFilters) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["vechiles", filters],
    queryFn: ({ queryKey }) => getVechiles(queryKey[1] as VechileFilters),
  });
  return { data, isLoading, isError };
};
export const useGetVechle = (id: string) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["vechile", id],
    queryFn: () => getVechile(id),
    enabled: !!id,
  });
  return { vechile: data, isLoading, isError };
};
export const useUpdateVechile = () => {
  const queryCleint = useQueryClient();
  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["vechile"],
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      updateVechile(id, data),
    onSuccess: () => {
      queryCleint.invalidateQueries({ queryKey: ["vechiles"] });
    },
  });
  return { updateVechiles: mutateAsync, isPending };
};
export const useDeleteVechile = (id: string) => {
  const queryCleint = useQueryClient();
  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["deleteVechile", id],
    mutationFn: () => deleteVechile(id),
    onSuccess: () => {
      queryCleint.invalidateQueries({ queryKey: ["vechiles"] });
    },
  });
  return { deleteVechiles: mutateAsync, isPending };
};
