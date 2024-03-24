"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import {
  LogoutLink,
  useKindeBrowserClient,
} from "@kinde-oss/kinde-auth-nextjs";
import { useConvex, useMutation, useQuery } from "convex/react";
import React, { useEffect } from "react";
import FileList from "./_components/FileList";
import { toast } from "sonner";

type Props = {};

const Dashboard = (props: Props) => {
  const convex = useConvex();
  const { user }: any = useKindeBrowserClient();
  const createUser = useMutation(api.user.createUser);

  const checkUser = async () => {
    const result = await convex.query(api.user.getUser, { email: user?.email });
    if (!result?.length) {
      createUser({
        name: user.given_name,
        email: user.email,
        image: user.picture,
      }).then((result) => {
        toast.success("Profile created successfully");
      });
    }
  };

  useEffect(() => {
    if (user) {
      checkUser();
    }
  }, [user]);

  return (
    <div>
      <header className="mt-10">
        <h2 className="font-semibold text-xl text-gray-800">Your Files</h2>
      </header>
      <FileList />
    </div>
  );
};

export default Dashboard;
