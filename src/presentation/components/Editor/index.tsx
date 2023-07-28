"use client";

import StarterKit from "@tiptap/starter-kit";

import Image from "@tiptap/extension-image";
// import Placeholder from "@tiptap/extension-placeholder";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import Underline from "@tiptap/extension-underline";

import { TooltipView } from "./TooltipView";
import { Command, suggestions } from "./SlashMenu";
import Table from "./Table";
import TableRow from "./TableRow";
import TableHeader from "./TableHeader";
import TableCell from "./TableCell";
import { BubbleMenu, EditorContent, useEditor } from "./React";
import { Placeholder } from "./Placeholder";

const Editor = () => {
  const editor = useEditor({
    extensions: [
      Command.configure({
        suggestions,
      }),
      Image,
      Placeholder.configure({
        placeholder: "Type / to start writing",
        includeChildren: true,
      }),
      StarterKit,
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      TaskItem,
      TaskList,
      Underline,
    ],
    content: "",
  });

  return (
    <>
      {editor && (
        <BubbleMenu editor={editor} tippyOptions={{ maxWidth: "none" }}>
          <TooltipView editor={editor} />
        </BubbleMenu>
      )}
      <EditorContent editor={editor} />
    </>
  );
};

export default Editor;
