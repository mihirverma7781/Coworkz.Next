import React, { useContext, useEffect, useState } from "react";
import SideNavHeader, { TEAM } from "./SideNavHeader";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import SideNavFooter from "./SideNavFooter";
import { useConvex, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { FileListContext } from "../../../context/FileContext";

type Props = {};

const SideNav = (props: Props) => {
  const convex = useConvex();
  const { user }: any = useKindeBrowserClient();
  const [activeTeam, setActiveTeam] = useState<TEAM>();
  const [totalFiles, setTotalFiles] = useState(0);
  const { fileList_, setFileList_ } = useContext(FileListContext);
  const createFile = useMutation(api.files.createFile);

  const onFileCreate = async (fileName: any) => {
    if (!activeTeam) {
      return toast.error("Error creating file");
    }
    createFile({
      fileName: fileName,
      teamId: activeTeam?._id,
      createdBy: user?.email,
      archive: false,
      document: "",
      whiteBoard: "",
    })
      .then((response) => {
        if (response) {
          getFiles();
          return toast.success("File created successfully!");
        }
      })
      .catch((error) => {
        return toast.error("Error creating file!");
      });
  };

  const getFiles = async () => {
    const result = await convex.query(api.files.getFiles, {
      teamId: activeTeam?._id || "",
    });
    setFileList_(result);
    setTotalFiles(result?.length);
  };

  useEffect(() => {
    activeTeam && getFiles();
  }, [activeTeam]);

  return (
    <div className="h-screen fixed w-72 border-r border-gray-100 border-[1px] p-6 flex flex-col">
      <div className="flex-1">
        <SideNavHeader user={user} setTeam={setActiveTeam} />
      </div>
      <div>
        <SideNavFooter totalFiles={totalFiles} onFileCreate={onFileCreate} />
      </div>
    </div>
  );
};

export default SideNav;
