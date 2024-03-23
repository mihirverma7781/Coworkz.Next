import { Button } from "@/components/ui/button";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { Search, Send } from "lucide-react";
import Image from "next/image";
import React from "react";

type Props = {};

const DashboardHeader = (props: Props) => {
  const { user }: any = useKindeBrowserClient();

  return (
    <div className="flex justify-end w-full items-center gap-2">
      <div className="flex items-center gap-2 border rounded-md p-1 px-2">
        <Search className="h-4 w-4 " />{" "}
        <input type="text" className="outline-none" placeholder="Search" />
      </div>

      <div>
        <Image
          src={user?.picture}
          height={32}
          width={32}
          alt="user"
          className="rounded-full"
        />
      </div>
      <Button className="flex gap-2 h-8 text-sm bg-emerald-500 hover:bg-emerald-400">
        <Send className="h-4 w-4" /> Invite
      </Button>
    </div>
  );
};

export default DashboardHeader;
