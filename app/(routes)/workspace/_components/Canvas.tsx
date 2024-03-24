"use client";

import React, { useEffect, useState } from "react";
import { Excalidraw, MainMenu, WelcomeScreen } from "@excalidraw/excalidraw";
import Image from "next/image";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { FILE } from "../../dashboard/_components/FileList";

type Props = {};

const Canvas = ({
  onSaveTrigger,
  fileId,
  fileData,
}: {
  onSaveTrigger: any;
  fileId: any;
  fileData: any;
}) => {
  const [whiteBoardData, setWhiteBoardData] = useState<any>();
  const updateWhiteBoard = useMutation(api.files.updateWhiteBoard);

  const saveWhiteBoard = async () => {
    updateWhiteBoard({
      _id: fileId,
      whiteBoard: JSON.stringify(whiteBoardData),
    })
      .then((response) => {
        console.log(response);
        toast.success("Whiteboard updated");
      })
      .catch((error) => {
        toast.error("Error updating whiteboard");
      });
  };

  useEffect(() => {
    onSaveTrigger && saveWhiteBoard();
  }, [onSaveTrigger]);

  return (
    <div className="h-canvas">
      {fileData && (
        <Excalidraw
          initialData={{
            elements: fileData?.whiteBoard && JSON.parse(fileData?.whiteBoard),
          }}
          theme="light"
          onChange={(excalidrawElements, appState, files) =>
            setWhiteBoardData(excalidrawElements)
          }
          UIOptions={{
            canvasActions: {
              saveToActiveFile: false,
              loadScene: false,
              export: false,
              toggleTheme: false,
            },
          }}
        >
          <MainMenu>
            <MainMenu.DefaultItems.LoadScene />
            <MainMenu.DefaultItems.Export />
            <MainMenu.DefaultItems.SaveAsImage />
            <MainMenu.DefaultItems.ClearCanvas />
            <MainMenu.DefaultItems.ChangeCanvasBackground />
            <MainMenu.DefaultItems.SaveToActiveFile />
          </MainMenu>
          <WelcomeScreen>
            <WelcomeScreen.Hints.MenuHint />
            <WelcomeScreen.Hints.ToolbarHint />
            <WelcomeScreen.Hints.HelpHint />
            <WelcomeScreen.Center>
              <WelcomeScreen.Center.Logo>
                <div className="flex items-center gap-2">
                  <Image
                    src={"/logo.svg"}
                    alt="logo"
                    height={42}
                    width={42}
                    style={{ opacity: "0.5" }}
                  />{" "}
                  <p className="text-2xl font-sans font-bold">Coworkz.Space</p>
                </div>
              </WelcomeScreen.Center.Logo>
              <WelcomeScreen.Center.Heading>
                Welcome to Coworkz.Space !
              </WelcomeScreen.Center.Heading>
            </WelcomeScreen.Center>
          </WelcomeScreen>
        </Excalidraw>
      )}
    </div>
  );
};

export default Canvas;
