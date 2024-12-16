import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { queryClient, toastOption } from "./config/config";
import Spinner from "./components/Spinner";
import ProtectedRoute from "./utils/ProtectedRoute";
import Layout from "./pages/Layout";
import VehicleTable from "./pages/Vechiles";
import useAuth from "./store/useAuth";
import ReportView from "./pages/ReportView";

const AuthPage = lazy(() => import("./pages/AuthPage"));
const PageNotFound = lazy(() => import("./pages/pageNotFound"));

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Navigate to="/auth?mode=signin" replace />
              )
            }
          />
          <Route
            path="/auth"
            element={
              <Suspense
                fallback={<Spinner size="large" color="text-green-500" />}
              >
                <AuthPage />
              </Suspense>
            }
          />
          <Route
            path="/signin"
            element={<Navigate to={"/auth?mode=signin"} replace />}
          />
          <Route
            path="/signup"
            element={<Navigate to={"/auth?mode=signup"} replace />}
          />
          {/* protected routes */}
          <Route path="/dashboard" element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              <Route index element={<VehicleTable />} />
              <Route path="report-view" element={<ReportView />} />
            </Route>
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-center" toastOptions={toastOption} />
    </QueryClientProvider>
  );
}

export default App;
