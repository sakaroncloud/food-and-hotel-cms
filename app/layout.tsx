import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import TanstackProvider from "@/components/providers/tanstack-provider";
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const inter = Inter({
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Juba Hospitality",
  description: "Online Food Delivery and Hotel Booking",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <TanstackProvider>

      <html lang="en">
        <body
          className={` ${inter.className} antialiased`}
        >
          <AntdRegistry>{children}</AntdRegistry>
          <Toaster
            toastOptions={{
              className: "text-sm capitalize",
            }}
          />
          <ReactQueryDevtools initialIsOpen={false} />
        </body>
      </html>
    </TanstackProvider>

  );
}
