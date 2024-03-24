import { FileListContext } from "../../../context/FileContext";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { Archive, Delete, MoreHorizontalIcon } from "lucide-react";
import moment from "moment";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

export interface FILE {
  archive: boolean;
  createdBy: string;
  document: string;
  fileName: string;
  teamId: string;
  whiteBoard: string;
  _id: string;
  _creationTime: number;
}

const FileList = () => {
  const { fileList_, setFileList_ } = useContext(FileListContext);
  const [fileList, setFileList] = useState<any>();
  const { user }: any = useKindeBrowserClient();
  const router = useRouter();

  useEffect(() => {
    setFileList(fileList_);
  }, [fileList_]);

  return (
    <div className="mt-10 border rounded-lg">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm rounded-lg">
          <thead className="text-left">
            <tr>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                File Name
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Created On
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Last Edited
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Author
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {fileList &&
              fileList.map((item: FILE, index: any) => {
                return (
                  <tr
                    onClick={() => router.push(`/workspace/${item._id}`)}
                    key={index}
                    className="odd:bg-gray-50 cursor-pointer"
                  >
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      {item?.fileName}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {moment(item._creationTime).format("DD MMM YYYY")}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {moment(item._creationTime).format("DD MMM YYYY")}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 flex gap-2 text-gray-700 items-center">
                      <Image
                        src={user?.picture}
                        alt="user"
                        height={32}
                        width={32}
                        className="rounded-full"
                      />
                      <p>
                        {user?.given_name} {user.family_name}
                      </p>
                    </td>
                    <td>
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <MoreHorizontalIcon className="w-5 h-5 cursor-pointer" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="mr-14 flex flex-col gap-1 ">
                          <DropdownMenuItem className="gap-2 cursor-pointer">
                            {" "}
                            <Archive className="h-4 w-4" /> Archive
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white cursor-pointer">
                            {" "}
                            <Delete className="h-4 w-4" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FileList;
