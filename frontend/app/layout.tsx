import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Task Manager Application",
    description: "Developed by Vijay Meena",
};

import { GoogleOAuthProvider } from '@react-oauth/google';
import Navbar from "@/components/navbar";


export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <GoogleOAuthProvider clientId="295208657218-55mfol1rks6ebe205c9iv05413ubidp9.apps.googleusercontent.com">
                <body className={inter.className}>
                    <Navbar />
                    {children}
                </body>
            </GoogleOAuthProvider>
        </html>
    );
}
