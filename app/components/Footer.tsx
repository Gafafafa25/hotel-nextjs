import Link from "next/link";
import {siteConfig} from "@/config/site.config";
import {layoutConfig} from "@/config/layout.config";

export default function Footer() {
    const getNavItems = () => {
        return siteConfig.navItems.map((item) => {
            return <Link href={item.href}
                         key={item.href}
                         className="text-gray-700 hover:text-indigo-600 font-medium transition-colors duration-200"
            >{item.label}</Link>
        })
    }

    return (
        <footer>
            <nav className="flex justify-between items-center h-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 gap-6 lg:px-8">
                {getNavItems()}
            </nav>
            <p className=" w-full flex justify-center items-center"
               style={{height: `h-[${layoutConfig.footerHeight}]`}}>{siteConfig.description}</p>
        </footer>
    );
}
