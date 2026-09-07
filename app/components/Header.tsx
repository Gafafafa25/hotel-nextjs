import Link from "next/link";
import Image from "next/image";
import {siteConfig} from "@/config/site.config";
import {layoutConfig} from "@/config/layout.config";


export default function Header() {
    const getNavItems = () => {
        return siteConfig.navItems.map((item) => {
            return <Link key={item.href}
                         href={item.href}
                         className="text-gray-700 hover:text-indigo-600 font-medium transition-colors duration-200"
            >{item.label}</Link>
        })
    }

    return (
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/*<Image src="/images/logo.png" alt={siteConfig.title} width={200} height={200}/>*/}
                    <Link href="/" className="flex-shrink-0">
                        <span className="text-2xl font-bold text-indigo-600">{siteConfig.title}</span>
                    </Link>
                </div>
                <nav className="hidden md:flex space-x-8"
                     style={{height: `h-[${layoutConfig.headerHeight}]`}}>
                    {getNavItems()}
                </nav>
            </div>
        </header>
    )
}