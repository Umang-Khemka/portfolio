import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Umang Gajjar — Full Stack Developer",
  description:
    "Building scalable backend platforms, AI-powered products, and delightful digital experiences.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="grid-bg" />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
