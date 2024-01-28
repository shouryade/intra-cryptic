"use client";
import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Orbitron } from "next/font/google";
import { useState } from "react";
import axios from "axios";
const orbit = Orbitron({ weight: "600", subsets: ["latin"] });
interface Team {
  username: string;
  level: number;
}
const Leaderboard = () => {
  const [teams, setTeams] = useState<Array<Team>>([]);
  useEffect(() => {
    axios.get(`/api/leaderboard/get`).then((res) => {
      console.log(res.data);
      setTeams(res.data);
    });
  }, []);

  return (
    <div style={orbit.style} className="bg-black text-white min-h-screen">
      <h1 className=" text-5xl text-center p-10">Leaderboard</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/6  text-3xl">Sr No.</TableHead>
            <TableHead className=" text-3xl">Top Teams</TableHead>

            <TableHead className="text-right  text-3xl">Question No.</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {teams.map((e, i) => {
            return (
              <TableRow key={i}>
                <TableCell className=" text-3xl">{i + 1}</TableCell>
                <TableCell className="font-medium  text-3xl">
                  {e.username}
                </TableCell>
                <TableCell className="text-right  text-3xl">
                  {e.level}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default Leaderboard;
