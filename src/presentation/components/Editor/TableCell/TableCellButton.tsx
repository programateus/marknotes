import { useRef, useState } from "react";
import { Editor } from "@tiptap/core";
import { Icon } from "@iconify-icon/react";
import { useFloating, flip, shift } from "@floating-ui/react";

import { useOnClickOutside } from "@/presentation/hooks/useOnClickOutside";

const TABLE_ACTIONS = [
  {
    name: "Insert row before",
    icon: "mdi:table-row-plus-before",
    command: (editor: Editor) => editor.chain().focus().addRowBefore().run(),
  },
  {
    name: "Insert row after",
    icon: "mdi:table-row-plus-after",
    command: (editor: Editor) => editor.chain().focus().addRowAfter().run(),
  },
  {
    name: "Insert column before",
    icon: "mdi:table-column-plus-before",
    command: (editor: Editor) => editor.chain().focus().addColumnBefore().run(),
  },
  {
    name: "Insert column after",
    icon: "mdi:table-column-plus-after",
    command: (editor: Editor) => editor.chain().focus().addColumnAfter().run(),
  },
  {
    name: "Delete row",
    icon: "mdi:table-row-remove",
    command: (editor: Editor) => editor.chain().focus().deleteRow().run(),
  },
  {
    name: "Delete column",
    icon: "mdi:table-column-remove",
    command: (editor: Editor) => editor.chain().focus().deleteColumn().run(),
  },
  {
    name: "Delete table",
    icon: "mdi:table-remove",
    command: (editor: Editor) => editor.chain().focus().deleteTable().run(),
  },
];

export type TableCellButtonProps = {
  editor: Editor;
};

export const TableCellButton = ({ editor }: TableCellButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { refs, floatingStyles } = useFloating({
    open: isOpen,
    middleware: [flip(), shift()],
  });
  const containerRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(containerRef, () => setIsOpen(false));

  return (
    <div ref={containerRef} className="absolute right-0 bottom-0">
      <button
        ref={refs.setReference}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <Icon icon="material-symbols:arrow-drop-down-rounded" width={32} />
      </button>
      {isOpen && (
        <div
          ref={refs.setFloating}
          style={floatingStyles}
          className="bg-base-100 shadow border-base-200 rounded border p-2 text-sm z-10 w-[250px] space-y-1"
        >
          {TABLE_ACTIONS.map((action) => (
            <button
              key={action.name}
              onClick={() => {
                action.command(editor);
                setIsOpen(false);
              }}
              className="btn btn-sm w-full"
            >
              <Icon icon={action.icon} /> {action.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
