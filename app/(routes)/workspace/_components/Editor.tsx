"use client";

import React, { useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
//@ts-ignore
import Header from "@editorjs/header";
//@ts-ignore
import List from "@editorjs/list";
//@ts-ignore
import Checklist from "@editorjs/checklist";
//@ts-ignore
import ImageTool from "@editorjs/image";
//@ts-ignore
import Paragraph from "@editorjs/paragraph";
//@ts-ignore
import Quote from "@editorjs/quote";
//@ts-ignore
import Warning from "@editorjs/warning";
//@ts-ignore
import Table from "@editorjs/table";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { error } from "console";

type Props = {};

const RAW_DOC = {
  time: 1550476186479,
  blocks: [
    {
      data: {
        text: "Document Name",
        level: 2,
      },
      id: "123",
      type: "header",
    },
    {
      data: {
        level: 4,
      },
      id: "1234",
      type: "header",
    },
  ],
  version: "2.8.1",
};

const Editor = ({ onSaveTrigger, fileId }: any) => {
  const ref = useRef<EditorJS>();
  const updateDocument = useMutation(api.files.updateDocument);
  const [document, setDocument] = useState(RAW_DOC);

  const initEditor = () => {
    const editor = new EditorJS({
      holder: "editorjs",
      data: document,
      tools: {
        header: {
          class: Header,
          shortcut: "CMD+SHIFT+H",
          config: {
            placeholder: "Enter a header",
            defaultLevel: 3,
          },
        },
        list: {
          class: List,
          inlineToolbar: true,
          config: {
            defaultStyle: "unordered",
          },
        },
        checklist: {
          class: Checklist,
          inlineToolbar: true,
        },
        // image: {
        //   class: ImageTool,
        //   config: {
        //     endpoints: {
        //       byFile: "http://localhost:8008/uploadFile", // Your backend file uploader endpoint
        //       byUrl: "http://localhost:8008/fetchUrl", // Your endpoint that provides uploading by Url
        //     },
        //   },
        // },
        paragraph: {
          class: Paragraph,
          inlineToolbar: true,
        },
        quote: {
          class: Quote,
          inlineToolbar: true,
          shortcut: "CMD+SHIFT+O",
          config: {
            quotePlaceholder: "Enter a quote",
            captionPlaceholder: "Quote's author",
          },
        },
        warning: {
          class: Warning,
          inlineToolbar: true,
          shortcut: "CMD+SHIFT+W",
          config: {
            titlePlaceholder: "Title",
            messagePlaceholder: "Message",
          },
        },
        table: {
          class: Table,
          inlineToolbar: true,
          config: {
            rows: 2,
            cols: 3,
          },
        },
      },
    });

    ref.current = editor;
  };

  const onSaveDocument = () => {
    if (ref.current) {
      ref?.current
        ?.save()
        .then((outputData) => {
          updateDocument({
            _id: fileId,
            document: JSON.stringify(outputData),
          })
            .then((response) => {
              return toast.success("Document Updated!");
            })
            .catch((error) => {
              return toast.error("Error updating document");
            });
        })
        .catch((error) => {
          return toast.error("Error updating document");
        });
    }
  };

  useEffect(() => {
    initEditor();
  }, []);

  useEffect(() => {
    onSaveTrigger && onSaveDocument();
  }, [onSaveTrigger]);
  return (
    <div>
      <div id="editorjs" className="ml-20"></div>
    </div>
  );
};

export default Editor;
