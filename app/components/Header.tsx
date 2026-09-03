import Link from "next/link";

export default function Header() {
    return (
        <header>
            <div>
                logo
            </div>
            <nav>
                <Link href="/">Main</Link>
                <Link href="/about">About</Link>
                <Link href="/contacts">Contacts</Link>
                <Link href="/rooms">Rooms</Link>
            </nav>
        </header>
    )
}