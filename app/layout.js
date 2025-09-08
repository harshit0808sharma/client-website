import { ToastContainer } from "react-toastify";
import "./globals.css";
import { SalonProvider } from "./context/SalonContext";
import salonData from "./data/salon.json";
import {
  Montserrat,
  Roboto,
  Lato,
  Oswald,
  Raleway,
  Nunito,
  Mulish,
  Open_Sans,
  Poppins,
  Karla,
} from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["100","200","300","400","500","600","700","800","900"], variable: "--font-montserrat" });
const roboto = Roboto({ subsets: ["latin"], weight: ["100","300","400","500","700","900"], variable: "--font-roboto" });
const lato = Lato({ subsets: ["latin"], weight: ["100","300","400","700","900"], variable: "--font-lato" });
const oswald = Oswald({ subsets: ["latin"], weight: ["200","300","400","500","600","700"], variable: "--font-oswald" });
const raleway = Raleway({ subsets: ["latin"], weight: ["100","200","300","400","500","600","700","800","900"], variable: "--font-raleway" });
const nunito = Nunito({ subsets: ["latin"], weight: ["200","300","400","600","700","800","900"], variable: "--font-nunito" });
const mulish = Mulish({ subsets: ["latin"], weight: ["200","300","400","500","600","700","800","900"], variable: "--font-mulish" });
const openSans = Open_Sans({ subsets: ["latin"], weight: ["300","400","600","700","800"], variable: "--font-open-sans" });
const poppins = Poppins({ subsets: ["latin"], weight: ["100","200","300","400","500","600","700","800","900"], variable: "--font-poppins" });
const karla = Karla({ subsets: ["latin"], weight: ["200","300","400","500","600","700","800"], variable: "--font-karla" });

const fontMap = {
  Montserrat: montserrat,
  Roboto: roboto,
  Lato: lato,
  Oswald: oswald,
  Raleway: raleway,
  Nunito: nunito,
  Mulish: mulish,
  "Open Sans": openSans,
  Poppins: poppins,
  Karla: karla,
};

export const metadata = {
  title: salonData?.name,
  description: salonData?.hero?.subHeading
}

export default function RootLayout({ children }) {
  const fontName = salonData?.branding?.fontFamily?.split(",")[0].trim() || "Montserrat";
  const font = fontMap[fontName] || montserrat;

  return (
    <html lang="en" className={font.variable}>
      <body className={font.className}>
        <SalonProvider>
          {children}
          <ToastContainer position="top-right" autoClose={3000} />
        </SalonProvider>
      </body>
    </html>
  );
}
