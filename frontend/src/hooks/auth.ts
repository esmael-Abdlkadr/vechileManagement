import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  changePassword,
  login,
  myInfo,
  signup,
  updateMe,
} from "../API/services/authService";
import { useNavigate } from "react-router-dom";
import useAuth from "../store/useAuth";
export const useSignup = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated, setIsLoading, setUser } = useAuth();
  const { mutateAsync, isError } = useMutation({
    mutationFn: signup,
    mutationKey: ["signup"],
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (data) => {
      if (data?.token) {
        localStorage.setItem("accessToken", data.token);
        setIsAuthenticated(true);
        setUser({
          id: data.user.id,
          firstName: data.user.firstName,
          lastName: data.user.lastName,
          email: data.user.email,
          createdAt: data.user.createdAt,
          updatedAt: data.user.updatedAt,
        });
        setIsLoading(false);
        navigate("/dashboard");
      }
    },
  });
  return { signup: mutateAsync, isError };
};

export const useLogin = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated, setIsLoading, setUser } = useAuth();
  const { mutateAsync, isError } = useMutation({
    mutationFn: login,
    mutationKey: ["login"],
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (data) => {
      if (data?.token) {
        console.log("data", data);
        console.log("data.token", data.token);
        localStorage.setItem("accessToken", data.token);
        setIsAuthenticated(true);
        setUser({
          id: data.user.id,
          firstName: data.user.firstName,
          lastName: data.user.lastName,
          email: data.user.email,
          createdAt: data.user.createdAt,
          updatedAt: data.user.updatedAt,
        });
        console.log("login");
        setIsLoading(false);
        navigate("/dashboard");
      }
    },
  });
  return { login: mutateAsync, isError };
};

export const useGetMyInfo = () => {
  const { data, isError } = useQuery({
    queryFn: myInfo,
    queryKey: ["myInfo"],
  });
  return { myInfo: data, isError };
};
export const useUpdateMe = () => {
  const queryClient = useQueryClient();
  const { mutateAsync, isError, isPending } = useMutation({
    mutationFn: updateMe,
    mutationKey: ["updateMe"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myInfo"] });
    },
  });
  return { updateMe: mutateAsync, isError, isPending };
};
export const useChnangePassword = () => {
  const { mutateAsync, isError, isPending } = useMutation({
    mutationFn: changePassword,
    mutationKey: ["changePassword"],
    onError: (error) => {
      console.log(error);
    },
  });
  return { changePassword: mutateAsync, isError, isPending };
};
