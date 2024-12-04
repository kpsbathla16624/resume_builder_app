import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ResumeProvider } from "./context/appContext";
import { ActiveStepProvider } from "./context/navigationcontext";
import { ToastContainer } from "react-toastify";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
       <ResumeProvider>
          <ActiveStepProvider>
        {children}
          </ ActiveStepProvider>
         </ResumeProvider >
      </body>
    </html>
  );
}
