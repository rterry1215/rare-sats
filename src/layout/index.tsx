import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import PageLoading from "@/components/Loading/PageLoading";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { InscriptionsProvider } from "@/context/InscriptionsContext";
import { SatAddressProvider } from "@/context/SatAddressContext";

export default function Layout() {
  return (
    <div className="text-white">
      <InscriptionsProvider>
        <SatAddressProvider>
          <Suspense fallback={<PageLoading />}>
            <Header />
            <Outlet />
            <Footer />
          </Suspense>
        </SatAddressProvider>
      </InscriptionsProvider>
    </div>
  );
}
