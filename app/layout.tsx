import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import {siteConfig} from "@/config/site.config";
import {layoutConfig} from "@/config/layout.config";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: siteConfig.title,
    description: siteConfig.description
};

export default function RootLayout({children}: LayoutProps<"/">) {
    return (
        <html
            lang="en"
            className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
        >
        <body className="min-h-full flex flex-col">
        <Header/>
        <main className={`flex flex-col w-full justify-between items-center`}
        style={{height: `h-[calc(100vh - ${layoutConfig.headerHeight} - ${layoutConfig.footerHeight})]`}}>
        {children}
        </main>
        <Footer/>
        </body>
        </html>
    );
}
