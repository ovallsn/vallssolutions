import localFont from "next/font/local";

export const sansFont = localFont({
  src: "../../public/assets/fonts/dm-sans-latin.woff2",
  variable: "--font-sans",
  display: "swap",
  weight: "400 700",
});

export const displayFont = localFont({
  src: [
    {
      path: "../../public/assets/fonts/newsreader-latin.woff2",
      weight: "300 700",
      style: "normal",
    },
    {
      path: "../../public/assets/fonts/newsreader-italic-latin.woff2",
      weight: "300 700",
      style: "italic",
    },
  ],
  variable: "--font-display",
  display: "swap",
});
