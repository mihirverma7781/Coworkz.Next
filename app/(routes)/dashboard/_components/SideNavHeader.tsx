"use client";

import {
  ChevronDown,
  LayoutGridIcon,
  LogOut,
  Settings,
  Users,
} from "lucide-react";
import Image from "next/image";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import { Separator } from "@/components/ui/separator";
import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export interface TEAM {
  createdBy: string;
  teamName: string;
  _id: string;
}

const SideNavHeader = ({ user, setTeam }: any) => {
  const convex = useConvex();
  const router = useRouter();
  const [teamList, setTeamList] = useState<TEAM[]>([]);
  const [activeTeam, setActiveTeam] = useState<TEAM>();
  const SIDE_NAV_MENU: any = [
    {
      id: 1,
      name: "Create Team",
      path: "/teams/create",
      icon: <Users className="h-4 w-4" />,
    },
    {
      id: 2,
      name: "Settings",
      path: "/settings",
      icon: <Settings className="h-4 w-4" />,
    },
  ];

  const getTeamsList = async () => {
    const response = await convex.query(api.teams.getTeams, {
      email: user?.email,
    });
    setTeamList(response);
    setActiveTeam(response[0]);
  };

  const onMenuClick = (item: any) => {
    if (item.path) {
      return router.push("/teams/create");
    } else {
      toast.error("Error navigating!");
    }
  };

  useEffect(() => {
    user && getTeamsList();
  }, [user]);

  useEffect(() => {
    activeTeam && setTeam(activeTeam);
  }, [activeTeam]);

  return (
    <div>
      <Popover>
        <div className="flex gap-3 items-center hover:bg-gray-100 p-3 rounded-lg cursor-pointer">
          <Image src="/logo.svg" height={24} width={24} alt="logo" />
          <PopoverTrigger>
            {activeTeam && (
              <p className=" flex gap-2 items-center font-bold text-[17px] text-stone-800">
                {activeTeam?.teamName}
                <ChevronDown />{" "}
              </p>
            )}
          </PopoverTrigger>
          <PopoverContent className="ml-6 p-4 mt-4">
            {/* Team Section */}
            <div>
              {teamList?.map((item, index) => (
                <h2
                  onClick={() => setActiveTeam(item)}
                  key={index}
                  className={`p-2 rounded-lg cursor-pointer mb-2 font-semibold ${
                    activeTeam?._id === item._id
                      ? "hover:bg-purple-400 hover:text-white bg-purple-500 text-white"
                      : "hover:bg-purple-100 hover:text-purple-500"
                  } `}
                >
                  {item?.teamName}
                </h2>
              ))}
            </div>
            <Separator className="my-2 bg-slate-100" />
            {/* Options Section */}
            <div className="">
              {SIDE_NAV_MENU?.map((item: any, index: number) => (
                <div
                  key={item.id}
                  onClick={() => onMenuClick(item)}
                  className="flex gap-2 items-center p-2 hover:bg-gray-100 rounded-lg cursor-pointer"
                >
                  <figure>{item.icon}</figure>
                  <h2>{item.name}</h2>
                </div>
              ))}
              <LogoutLink>
                <div className="flex gap-2 items-center p-2 hover:bg-red-50 rounded-lg cursor-pointer">
                  <figure>
                    <LogOut className="h-4 w-4 text-red-500" />
                  </figure>
                  <h2 className="text-red-500">Logout</h2>
                </div>
              </LogoutLink>
              <Separator className="my-2 bg-slate-100" />
            </div>
            {/* User Info Section */}
            {user && (
              <div className="mt-2 flex items-center gap-2">
                <Image
                  src={user?.picture}
                  alt="user-profile"
                  height={32}
                  width={32}
                  className="rounded-full"
                />
                <div>
                  <h2 className="text-[14px] font-semibold">
                    {user?.given_name} {user?.family_name}
                  </h2>
                  <h2 className="text-[12px] text-gray-400">{user?.email}</h2>
                </div>
              </div>
            )}
          </PopoverContent>
        </div>
      </Popover>

      {/* All files Button */}
      <Button
        variant={"outline"}
        className="w-full justify-start gap-2 font-bold mt-8 bg-gray-50 border-gray-100"
      >
        {" "}
        <LayoutGridIcon className="h5 w-5" /> All Files{" "}
        <span className="ml-auto font-normal text-xs text-gray-300">A</span>
      </Button>
    </div>
  );
};

export default SideNavHeader;
