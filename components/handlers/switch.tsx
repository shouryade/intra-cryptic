"use client"
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {hasCookie } from "cookies-next";
export default function LoginSwitch () {
    const router=useRouter();
    useEffect(()=>{
        if(hasCookie("data")) {
            router.push("/question")
          }
    }, [])

    return <>
    </>
}