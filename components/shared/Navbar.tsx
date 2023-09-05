import { 
    SignOutButton, 
    SignedIn, 
    OrganizationSwitcher, 
} from "@clerk/nextjs";
import {dark} from "@clerk/themes"
import Link from "next/link";
import Image from "next/image";


function Navbar(){
    return(
        <nav className="topbar">
            <Link href={'/'} className="flex items-center gap-4">
               <img 
               src="/images/Dove.png" 
               alt="Logo" 
               className="w-[35px] h-[35px]" />
               <p className="text-heading3-bold text-light-2 max-xs:hidden ">
                    Dove
               </p>
            </Link>

            <div className="flex items-center gap-1">
                <div className="block md:hidden">
                    <SignedIn>
                        <SignOutButton>
                            <div className="flex cursor-pointer">
                                <Image 
                                src="/assets/logout.svg" 
                                alt="Logout"
                                width={24}
                                height={24} />
                            </div>
                        </SignOutButton>
                    </SignedIn>

                </div>
                    <OrganizationSwitcher
                        appearance={{
                            baseTheme:dark,
                            elements:{
                                organizationSwitcherTrigger:"py-2 px-4"
                            }
                        }}
                    />

            </div>

        </nav>
    );
}

export default Navbar;