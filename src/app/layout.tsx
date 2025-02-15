import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import type { Metadata } from "next";

import { ThemeProvider } from "@mui/material/styles";
import { Roboto } from "next/font/google";
import Sidebar from "../components/sidebar";
import Topbar from "../components/topbar";
import "./globals.css";
import theme from "./theme";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "Invoice Hub",
  description: "Manage your invoice easily",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <div className="flex items-start min-h-screen bg-white">
              <Sidebar />
              <div className="flex-1 flex flex-col justify-start">
                <Topbar />
                <div className="pt-[52px] pl-[136px] bg-softBlue min-h-[calc(100vh-64px)]">
                  {children}
                </div>
              </div>
            </div>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
