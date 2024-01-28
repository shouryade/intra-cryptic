"use client";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { Orbitron } from "next/font/google";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cookies } from "next/headers";
import { useEffect } from "react";
import axios from "axios";
import { error } from "console";
import { useRouter } from "next/navigation";
import { deleteCookie, getCookie, hasCookie } from "cookies-next";
import { ToastContainer, toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
const orbit = Orbitron({ weight: "600", subsets: ["latin"] });
interface Question {
  ques: string;
  number: number;
  images: Array<string>;
}
export default function Question() {
  const btn = useRef<HTMLButtonElement>(null);
  const answer = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [ans, setAns] = useState<Question>({
    ques: "Loading...",
    number: 1,
    images: ["/giphy.webp"],
  });
  function fetchques() {
    axios
      .get(`/api/questions/get`, {
        headers: {
          Authorization: `Bearer ${getCookie("data")}`,
          Accept: "application/json",
        },
      })
      .then((res) => {
        setAns({
          ques: "Loading...",
          number: 1,
          images: ["/giphy.webp"],
        });
        setAns(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    if (!hasCookie("data")) {
      router.push("/");
    } else {
      fetchques();
    }
  }, []);

  function handleSubmit() {
    // console.log(answer.current.value)
    toast.dismiss();
    if (btn.current) {
      btn.current.disabled = true;
    }
    toast("Checking answer", { theme: "dark" });
    const data = {
      ans: answer.current?.value,
    };

    axios
      .post(`/api/questions/verify`, data, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${getCookie("data")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          toast.dismiss();
          toast.success("Correct Answer", { theme: "colored" });
          if (btn.current) {
            btn.current.disabled = false;
          }
          // notify("correct ans");
          // setTimeout(() => {

          // }, 1000);
          fetchques();
        } else {
          toast.dismiss();
          toast.error("Wrong Answer", { theme: "colored" });
          if (btn.current) {
            btn.current.disabled = false;
          }
          // notify("wrong ans");
        }
      })
      .catch((error) => {
        toast.dismiss();
        toast.error("Error occured, try again later", { theme: "dark" });
        if (btn.current) {
          btn.current.disabled = false;
        }
        console.log(error);
      }); // console.log(e.target.value);
  }
  function ValidateAnswer() {
    if (answer.current && answer.current.value != "") {
      console.log(answer.current.value);
    }
  }
  return (
    <div
      style={orbit.style}
      className="bg-black text-white flex-col flex min-h-screen items-center justify-center gap-6"
    >
      <h1 className="text-3xl">Question {ans.number}</h1>
      {ans.ques.split("<br/>").map((e, i) => {
        return <h3 key={i}>{e}</h3>;
      })}

      <Input ref={answer} className="md:w-1/4 w-1/2" placeholder="answer" />
      <Button ref={btn} onClick={handleSubmit} type="button">
        Submit
      </Button>
      <div className="flex flex-row gap-4">
        <Link target="_blank" href="/leaderboard">
          Leaderboard
        </Link>
        <button
          onClick={() => {
            deleteCookie("data");
            router.push("/");
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
