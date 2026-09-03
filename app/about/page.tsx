import type {Metadata} from "next";

export const metadata: Metadata = {
    title: "About",
    description: "About page",
};


export default function AboutPage() {
    return (
        <div className="">
            <h1 className="">About</h1>
            <p className="">About page</p>
        </div>
    );
}

