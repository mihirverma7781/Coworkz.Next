import { Button } from "@/components/ui/button";
import { Link, SaveIcon } from "lucide-react";
import Image from "next/image";
import React from "react";

type Props = {};

const WorkspaceHeader = ({ onSave }: any) => {
  return (
    <div>
      <div className="flex items-center gap-2 p-3 border-b justify-between">
        <div className="flex items-center gap-2">
          <Image src="/logo.svg" height={32} width={32} alt="logo" />
          <h2 className="font-semibold">File Name</h2>
        </div>

        <div className="flex items-center gap-2">
          <Button
            className="flex items-center gap-2 text-sm bg-purple-500 hover:bg-purple-400"
            onClick={() => onSave()}
          >
            Save <SaveIcon className="h-4 w-4" />
          </Button>
          <Button className="flex items-center gap-2 text-sm bg-emerald-500 hover:bg-emerald-400">
            Share <Link className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WorkspaceHeader;
