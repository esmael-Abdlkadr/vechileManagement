import { useMutation } from "@tanstack/react-query";
import { login, logout, signup } from "../API/services/authService";
import { useNavigate } from "react-router-dom";
import useAuth from "../store/useAuth";
const useSignup = () => {
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

const useLogin = () => {
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
        localStorage.setItem("token", data.token);
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

const useLogout = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated, clearUser } = useAuth();
  const { mutateAsync, isError } = useMutation({
    mutationFn: logout,
    mutationKey: ["logout"],
    onError: (error) => {
      console.log(error);
    },
    onSuccess: () => {
      localStorage.removeItem("token");
      setIsAuthenticated(false);
      clearUser();

      navigate("/login", { replace: true });
      // clear the history stack.
      window.history.replaceState(null, "", "/login");
    },
  });
  return { logout: mutateAsync, isError };
};

export { useSignup, useLogin, useLogout };
