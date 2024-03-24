"use client";

import { api } from "@/convex/_generated/api";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useConvex } from "convex/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import SideNav from "./_components/SideNav";
import DashboardHeader from "./_components/DashboardHeader";
import { FileListContext } from "../../context/FileContext";

const DashboardLayout = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const convex = useConvex();
  const router = useRouter();
  const [fileList_, setFileList_] = useState([]);
  const { user }: any = useKindeBrowserClient();

  const checkTeams = async () => {
    const result = await convex.query(api.teams.getTeams, {
      email: user?.email,
    });
    if (!result?.length) {
      return router.push("teams/create");
    }
  };

  useEffect(() => {
    user && checkTeams();
  }, [user]);

  return (
    <div>
      <FileListContext.Provider value={{ fileList_, setFileList_ }}>
        <div className="grid grid-cols-4">
          <aside className="h-screen w-72 fixed">
            <SideNav />
          </aside>
          <main className="col-span-4 ml-72 p-8">
            <header>
              <DashboardHeader />
            </header>
            {children}
          </main>
        </div>
      </FileListContext.Provider>
    </div>
  );
};

export default DashboardLayout;
