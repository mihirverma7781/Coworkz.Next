"use client";
import React, { useEffect, useState } from "react";
import WorkspaceHeader from "../_components/WorkspaceHeader";
import Editor from "../_components/Editor";
import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";
import { FILE } from "../../dashboard/_components/FileList";
import Canvas from "../_components/Canvas";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

type Props = {};

const WorkSpace = ({ params }: any) => {
  const [triggerSave, setTriggerSave] = useState(false);
  const [fileData, setFileData] = useState<FILE>();
  const convex = useConvex();

  const getFile = async () => {
    const result = await convex.query(api.files.getFileById, {
      _id: params.fileId,
    });

    setFileData(result);
  };

  useEffect(() => {
    params?.fileId && getFile();
  }, []);

  return (
    <div>
      <header>
        <WorkspaceHeader onSave={() => setTriggerSave(!triggerSave)} />
      </header>
      {/* Workspace Layout */}
      <main className="flex flex-col md:flex-row">
        <PanelGroup autoSaveId="example" direction="horizontal">
          {/* Document */}
          <Panel minSize={10}>
            <div className="min-w-28 w-full h-96 md:h-[calc(100vh-68px)] overflow-y-auto ">
              <Editor
                onSaveTrigger={triggerSave}
                fileId={params.fileId}
                fileData={fileData}
              />
            </div>
          </Panel>
          <PanelResizeHandle />
          {/* Canvas */}
          <Panel>
            <div className="w-full h-[calc(100vh-68px)] border-t md:border-l-2 border-gray-100 md:border-t-0">
              <Canvas
                onSaveTrigger={triggerSave}
                fileId={params.fileId}
                fileData={fileData}
              />
            </div>
          </Panel>
          <PanelResizeHandle />
        </PanelGroup>
      </main>
    </div>
  );
};

export default WorkSpace;
