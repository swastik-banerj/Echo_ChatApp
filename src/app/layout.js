import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SessionWrapper from "../Helper/SessionWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Echo by SwastikBanerjee",
  description: "Echo - A Chat Web App",
  icons:{
    icon: "/Chat_Logo.JPG"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <SessionWrapper>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
         {children}
        </body>
      </SessionWrapper>
    </html>
  );
}
