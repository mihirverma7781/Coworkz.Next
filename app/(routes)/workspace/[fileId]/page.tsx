"use client";
import React, { useState } from "react";
import WorkspaceHeader from "../_components/WorkspaceHeader";
import Editor from "../_components/Editor";

type Props = {};

const WorkSpace = ({ params }: any) => {
  const [triggerSave, setTriggerSave] = useState(false);

  return (
    <div>
      <header>
        <WorkspaceHeader onSave={() => setTriggerSave(!triggerSave)} />
      </header>
      {/* Workspace Layout */}
      <main className="grid grid-cols-1 md:grid-cols-2">
        {/* Document */}
        <div className="h-screen">
          <Editor onSaveTrigger={triggerSave} fileId={params.fileId} />
        </div>
        {/* Canvas */}
        <div className="h-screen">Canvas</div>
      </main>
    </div>
  );
};

export default WorkSpace;
