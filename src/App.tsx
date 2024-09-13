import React from "react";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";
import routes from "@/routes";

import "@/styles/index.scss";
import "swiper/css";
import { Toaster } from "sonner";
import { AuthProvider } from "./context/AuthContext";

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <RouterProvider router={routes} />
        <Toaster position="top-right" expand={false} />
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
