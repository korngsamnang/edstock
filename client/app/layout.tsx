import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/app/_styles/globals.css";
import DashboardWrapper from "@/app/_components/dashboard-wrapper";
import React from "react";

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
    title: "Edstock | Inventory Management System",
    description: "A simple inventory management system",
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
                <DashboardWrapper> {children}</DashboardWrapper>
            </body>
        </html>
    );
}
