// app/layout.js
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import { SalonProvider } from "./context/SalonContext";
import { getSalonBySlug } from "./lib/salons";
export const metadata = async () => {
  const salonData = await getSalonBySlug("radiance-salon");
  return {
    title: salonData?.name || "Loading...",
    description: salonData?.hero?.subHeading || "Loading"
  };
};

export default async function RootLayout({ children }) {

  return (
    <html lang="en">
      <body>
        <SalonProvider>
          {children}
          <ToastContainer position="top-right" autoClose={3000} />
        </SalonProvider>
      </body>
    </html>
  );
}
