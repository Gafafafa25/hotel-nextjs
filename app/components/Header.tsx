import Link from "next/link";
import Image from "next/image";
import {siteConfig} from "@/config/site.config";
import {layoutConfig} from "@/config/layout.config";
import {getCurrentAdmin} from "@/app/lib/admin-auth";
import LogoutButton from "@/app/components/LogoutButton";


export default async function Header() {
    const admin = await getCurrentAdmin()

    const getNavItems = () => {
        return siteConfig.navItems.map((item) => {
            return <Link key={item.href}
                         href={item.href}
                         className="text-gray-700 hover:text-indigo-600 font-medium transition-colors duration-200"
            >{item.label}</Link>
        })
    }

    return (
        <header className="flex items-center justify-between px-6 py-4 bg-white border-b shadow-sm">
                <div className="flex items-center gap-2">
                    {/*<Image src="/images/logo.png" alt={siteConfig.title} width={200} height={200}/>*/}
                    <Link href="/" className="flex-shrink-0">
                        <span className="text-2xl font-bold text-indigo-600">{siteConfig.title}</span>
                    </Link>
                </div>
                <nav className="flex items-center gap-6"
                     style={{height: `h-[${layoutConfig.headerHeight}]`}}>
                    {getNavItems()}

                    {admin && (<LogoutButton/>)}
                </nav>
        </header>
    )
}