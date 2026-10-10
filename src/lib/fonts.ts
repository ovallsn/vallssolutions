import localFont from "next/font/local";

export const sansFont = localFont({
  src: "../../public/assets/fonts/dm-sans-latin.woff2",
  variable: "--font-sans",
  display: "swap",
  weight: "400 700",
});

export const displayFont = localFont({
  src: "../../public/assets/fonts/manrope-variable-latin.woff2",
  variable: "--font-display",
  display: "swap",
  weight: "400 800",
});
