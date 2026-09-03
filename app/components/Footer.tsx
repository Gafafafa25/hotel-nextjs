import Link from "next/link";

export default function Footer() {
    return (
        <footer className="flex items-center justify-between px-6 py-4 bg-white border-b shadow-sm">
            <nav className="flex gap-6">
                <Link href="/">Main</Link>
                <Link href="/about">About</Link>
                <Link href="/contacts">Contacts</Link>
                <Link href="/rooms">Rooms</Link>
            </nav>
            <p>Since 2026</p>
        </footer>
    );
}
