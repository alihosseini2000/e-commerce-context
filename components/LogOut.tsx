"use client"
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";


function LogOut() {
        const router = useRouter();
    
    return (
        <button
            onClick={() => {
                Cookies.remove("access_token");
                router.push("/login");
            }}
            className='bg-red-600 text-white rounded-lg px-4 py-2'>
            Log Out
        </button>
    )
}

export default LogOut