"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Archive, Command, Flag, GitBranch } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { DialogClose } from "@radix-ui/react-dialog";

const SideNavFooter = ({ onFileCreate, totalFiles }: any) => {
  const BOTTOM_MENU_LIST = [
    {
      id: 1,
      name: "Getting Started",
      icon: <Flag className="h-4 w-4" />,
      path: "",
    },
    {
      id: 2,
      name: "Github",
      icon: <GitBranch className="h-4 w-4" />,
      path: "",
    },
    {
      id: 3,
      name: "Archive",
      icon: <Archive className="h-4 w-4" />,
      path: "",
    },
  ];
  const [fileInput, setFileInput] = useState("");

  return (
    <div>
      {BOTTOM_MENU_LIST?.map((item, index) => {
        return (
          <div
            key={index}
            className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer rounded-lg"
          >
            <figure>{item.icon}</figure>
            <h2 className="text-[14px]">{item.name}</h2>
          </div>
        );
      })}

      {/* Add New File Button */}
      <div>
        <Dialog>
          <DialogTrigger className="w-full" asChild>
            <Button className="w-full mt-4 justify-start bg-emerald-500 hover:bg-emerald-400">
              Add New File{" "}
              <span className="ml-auto flex gap-1 text-xs items-center">
                <Command className="w-3 h-3" /> N
              </span>
            </Button>
          </DialogTrigger>
          {/* Content */}
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New File</DialogTitle>
              <DialogDescription className="pt-4">
                <label className="text-xs text-gray-400" htmlFor="filename">
                  {" "}
                  File Name
                </label>
                <Input
                  placeholder="Enter file name"
                  className="mt-1"
                  onChange={(event) => setFileInput(event.target.value)}
                />
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="sm:justify-end">
              <DialogClose asChild>
                <Button
                  type="button"
                  disabled={!(fileInput && fileInput?.length > 3)}
                  className="bg-emerald-500 hover:bg-emerald-400"
                  onClick={() => onFileCreate(fileInput)}
                >
                  Create
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Progress Bar */}
      <div>
        <div className="h-4 w-full rounded-full mt-4 bg-gray-200">
          <div
            className="h-4 rounded-full bg-purple-500"
            style={{
              width: `${(totalFiles / 5) * 100}%`,
            }}
          ></div>
        </div>
        <h2 className="text-sm mt-4 text-gray-500">
          <strong>{totalFiles}</strong> out of <strong>5</strong> files used.
        </h2>
        <h2 className="text-xs mt-2">
          <strong className="text-blue-800">Upgrade</strong> your plan to get{" "}
          <strong>Unlimited</strong> access.
        </h2>
      </div>
    </div>
  );
};

export default SideNavFooter;
