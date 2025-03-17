
import Image from "next/image";
import Link from "next/link";
import "./globals.css";

export const metadata = {
    title: "Page not found",
    description: "Oops! This page has disappeared, just like the last sip of your cocktail.",
  };

export default function error() {
    return(
    <main className="flex flex-col items-center justify-center min-h-screen text-center p-6">
        <h1 className="text-4xl">Oops! Looks like you’ve had one too many… </h1>
        <Image
            src="/assets/spilled-glass.png"
            alt="404 - Page Not Found"
            width={500}
            height={500}
        />
        <p>This page has disappeared, just like the last sip of your cocktail. <br /> But don’t worry, the night isn’t over yet!</p>
        <div className="mt-6 flex flex-col gap-4 md:flex-row">
            <Link href="/home" className="px-6 py-4 bg-bordeaux text-beige transition hover:bg-opacity-90">
                Return to the bar
            </Link>
            <Link href="/recipes" className="px-6 py-4 border border-bordeaux transition hover:bg-bordeaux/10">
                Browse our cocktail recipes
            </Link>
        </div>
    </main>
    )
}