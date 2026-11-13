import Link from "next/link";

const allNavItems = [
    {label: 'Employees', href: '/admin/employees', roles: ['admin']},
    {label: 'Rooms', href: '/admin/rooms', roles: ['admin']},
    {label: 'Bookings', href: '/admin/bookings', roles: ['admin']}
]

export default function Sidebar({role}: {role: string}) {
    const visibleNavItems = allNavItems.filter(item => item.roles.includes(role))

    return (
        <aside className="w-64 border-r p-4">
            <nav className="space-y-2">
                {visibleNavItems.map(item => (
                    <Link key={item.href} href={item.href} className="block rounded p-2 hover:bg-gray-100">
                        {item.label}
                    </Link>
                ))}
            </nav>
        </aside>
    )
}