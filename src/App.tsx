import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, Routes } from "react-router-dom";

import Auth from "./pages/Auth";
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import NotFound from "./pages/404";
import Imunisasi from "./pages/imunisasi";
import AddDataImunisasi from "./pages/imunisasi/add-data-imunisasi";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard/*"
          element={
            <Auth>
              <Dashboard />
            </Auth>
          }
        />
        <Route
          path="/dashboard/imunisasi"
          element={
            <Auth>
              <Imunisasi />
            </Auth>
          }
        />
        <Route
          path="/dashboard/imunisasi/add-data-imunisasi"
          element={
            <Auth>
              <AddDataImunisasi />
            </Auth>
          }
        />
        <Route
          path="/dashboard/imunisasi/add-data-imunisasi/:id"
          element={
            <Auth>
              <AddDataImunisasi />
            </Auth>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </QueryClientProvider>
  );
}
