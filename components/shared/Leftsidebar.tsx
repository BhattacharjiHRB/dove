"use client"

import Link from "next/link";
import {sidebarLinks} from "@/constants"
import {usePathname, useRouter } from 'next/navigation'
import { SignOutButton, SignedIn, useAuth } from "@clerk/nextjs";


function Leftsidebar(){
    const router = useRouter()
    const path = usePathname()
    const {userId} = useAuth()

    return(
        <section className="custom-scrollbar leftsidebar">
            <div className="flex w-full flex-1 flex-col gap-3 px-3">
                {sidebarLinks.map(link => {
                
                const isActive = (path.includes(link.route) && link.route.length >1 || path === link.route);
                
                if(link.route === "/profile")link.route = `${link.route}/${userId}`
                return(
                    <Link 
                    href={link.route}
                    key={link.label}
                    className={`leftsidebar_link ${isActive && 'bg-cyan-900 rounded-xl '}`}
                    >
                        
                        <img 
                        src={link.imgURL} 
                        alt={link.label}
                        className="w-[20px] h-[20px]" />
                        <p 
                        className="text-light-2 max-lg:hidden">  
                             {link.label}
                        </p>
                    </Link>
                )} )}
            </div>
            <div className="mt-10 px-6">
                <SignedIn>
                    <SignOutButton signOutCallback={()=>
                        {router.push('/sign-in')}} >
                        <div className="flex cursor-pointer gap-4 p-3">
                            <img 
                            src={'/assets/logout.svg'} 
                            alt="logout"
                            className="w-[20px] h-[20px]" />

                            <p className=" text-light-1 max-lg:hidden">Logout</p>
                        </div>
                    </SignOutButton>
                </SignedIn>
            </div>
        </section>
    );
}

export default Leftsidebar;