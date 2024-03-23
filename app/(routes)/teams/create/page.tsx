"use client";

import React, { use, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const CreateTeam = () => {
  const router = useRouter();
  const createTeam = useMutation(api.teams.createTeam);
  const { user }: any = useKindeBrowserClient();
  const [teamname, setTeamname] = useState("");

  const createNewTeam = () => {
    if (!teamname || !teamname?.length) {
      return toast.error("Invalid team name !");
    }
    createTeam({
      teamName: teamname,
      createdBy: user?.email,
    }).then((response) => {
      if (response) {
        router.push("/dashboard");
        return toast.success("Team created successfully !");
      }
    });
  };

  return (
    <div>
      <div className="px-6 md:px-16 my-16 md:my-24 flex items-center gap-2 justify-center">
        <Image src="/logo.svg" alt="logo" height={38} width={38} />
        <p className="text-2xl font-bold text-stone-900">Coworkz.Space</p>
      </div>

      <div className="flex flex-col items-center justify-center text-center">
        <sub className="p-4 mb-4 rounded-full bg-purple-100 text-purple-600 font-medium">
          Create Team
        </sub>
        <h2 className="text-[32px] md:text-[48px] font-bold py-3 text-stone-900">
          What Should We Call Your Team?
        </h2>
        <h3 className="text-stone-500 mt-2">
          You can always change this later from settings.
        </h3>
      </div>

      <div className="flex flex-col items-center justify-center w-full">
        <div className="mt-7 w-[90%] md:w-[40%]">
          <label className="text-stone-500 text-xs" htmlFor="teamname">
            Team Name
          </label>
          <Input
            placeholder="Enter team name"
            className="mt-2"
            onChange={(event) => setTeamname(event.target.value)}
          />
        </div>
        <Button
          disabled={!(teamname && teamname?.length > 0)}
          className="bg-emerald-500 mt-9 w-[90%] md:w-[40%] hover:bg-emerald-600 text-white"
          onClick={createNewTeam}
        >
          Create Team
        </Button>
      </div>
    </div>
  );
};

export default CreateTeam;
