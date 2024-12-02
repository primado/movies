import movie_icon from "@/public/movie_icon.png"
import Image from "next/image"
import Link from "next/link"

export default function Navbar() {

    return (
        <nav className="flex justify-around items-center py-5 bg-[#d1d4ff]">
            <div className="text-lg text-black font-semibold flex items-center justify-center gap-1">
                <Image
                    src={movie_icon}
                    alt="Movie icon"
                    className="object-fill w-6"
                />
                <span>Movies</span>
            </div>
            <ul className="text-base text-black font-semibold">
                <li><Link href={"/"} className="text-black/75">Home</Link></li>
            </ul>
        </nav>
    )
    
};
