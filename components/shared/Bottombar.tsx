"use client"
import { sidebarLinks } from "@/constants";
import {usePathname, useRouter } from 'next/navigation'
import Link from "next/link";

function Bottombar(){
    const router = useRouter()
    const path = usePathname()

    return(
        <section className="bottombar">
            <div className="bottombar_container">
            {sidebarLinks.map(link => {
                
                const isActive = (path.includes(link.route) && link.route.length >1 || path === link.route);

                return(
                    <Link 
                    href={link.route}
                    key={link.label}
                    className={`bottombar_link ${isActive && 'bg-cyan-900 rounded-xl '}`}
                    >
                        
                        <img 
                        src={link.imgURL} 
                        alt={link.label}
                        className="w-[20px] h-[20px]" />
                        <p 
                        className=" text-subtle-medium text-light-1 max-sm:hidden">  
                             {link.label.split(/\s+/)[0]}
                        </p>
                    </Link>
                )} )}
            </div>
        </section>
    );
}

export default Bottombar;