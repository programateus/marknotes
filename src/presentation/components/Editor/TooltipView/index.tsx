import { useEffect, useState } from "react";
import { Editor } from "@tiptap/core";
import { Icon } from "@iconify-icon/react";
import { CellSelection } from "@tiptap/pm/tables";

type TooltipViewProps = {
  editor: Editor;
};

export const TooltipView = ({ editor }: TooltipViewProps) => {
  const [cellsSelected, setCellsSelected] = useState(0);
  useEffect(() => {
    if (editor.state.selection instanceof CellSelection) {
      let selected = 0;
      (editor.state.selection as CellSelection).forEachCell(() => {
        selected++;
      });
      setCellsSelected(selected);
    } else {
      setCellsSelected(0);
    }
  }, [editor.state.selection]);

  return (
    <div className="bg-base-100 p-1 border-base-200 rounded-md border shadow-md space-x-1 flex">
      <div className="space-x-1">
        <button
          className={`btn btn-sm ${
            editor.isActive("bold") ? "btn-active" : ""
          }`}
          onClick={() => editor.chain().toggleBold().focus().run()}
        >
          <Icon icon="material-symbols:format-bold-rounded" />
        </button>
        <button
          className={`btn btn-sm ${
            editor.isActive("italic") ? "btn-active" : ""
          }`}
          onClick={() => editor.chain().toggleItalic().focus().run()}
        >
          <Icon icon="material-symbols:format-italic-rounded" />
        </button>
        <button
          className={`btn btn-sm ${
            editor.isActive("underline") ? "btn-active" : ""
          }`}
          onClick={() => editor.chain().toggleUnderline().focus().run()}
        >
          <Icon icon="material-symbols:format-underlined-rounded" />
        </button>
        <button
          className={`btn btn-sm ${
            editor.isActive("strike") ? "btn-active" : ""
          }`}
          onClick={() => editor.chain().toggleStrike().focus().run()}
        >
          <Icon icon="material-symbols:format-strikethrough-rounded" />
        </button>
      </div>

      <div className="divider lg:divider-horizontal" />

      <div className="space-x-1">
        <button
          className={`btn btn-sm ${
            editor.isActive("bulletList") ? "btn-active" : ""
          }`}
          onClick={() => editor.chain().toggleBulletList().focus().run()}
        >
          <Icon icon="material-symbols:format-list-bulleted-rounded" />
        </button>
        <button
          className={`btn btn-sm ${
            editor.isActive("orderedList") ? "btn-active" : ""
          }`}
          onClick={() => editor.chain().toggleOrderedList().focus().run()}
        >
          <Icon icon="material-symbols:format-list-numbered-rounded" />
        </button>
      </div>

      <div className="divider lg:divider-horizontal" />

      <div className="space-x-1">
        <button
          className={`btn btn-sm ${
            editor.isActive("blockquote") ? "btn-active" : ""
          }`}
          onClick={() => editor.chain().toggleBlockquote().focus().run()}
        >
          <Icon icon="material-symbols:format-quote-rounded" />
        </button>
        <button
          className={`btn btn-sm ${
            editor.isActive("codeBlock") ? "btn-active" : ""
          }`}
          onClick={() => editor.chain().toggleCodeBlock().focus().run()}
        >
          <Icon icon="material-symbols:code-blocks-rounded" />
        </button>
      </div>

      {/* {editor.state.selection instanceof CellSelection && (
        <>
          <div className="divider lg:divider-horizontal" />
          <div className="space-x-1">
            {cellsSelected > 1 ? (
              <button
                className="btn btn-sm"
                onClick={() => {
                  editor.chain().focus().mergeCells().run();
                  editor.commands.fixTables();
                }}
              >
                <Icon icon="ri:merge-cells-horizontal" />
              </button>
            ) : (
              <button
                className="btn btn-sm"
                onClick={() => {
                  editor.chain().focus().splitCell().run();
                  editor.commands.fixTables();
                }}
              >
                <Icon icon="ri:split-cells-horizontal" />
              </button>
            )}
          </div>
        </>
      )} */}
    </div>
  );
};
