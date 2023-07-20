import React, { useMemo } from "react";
import { NodeViewWrapper, NodeViewProps, NodeViewContent } from "@tiptap/react";
import { Icon } from "@iconify-icon/react";

export const DraggableBlockView: React.FC<NodeViewProps> = ({
  node,
  getPos,
  editor,
}) => {
  const isTable = useMemo(() => {
    const { content } = node.content as any;

    return content[0].type.name === "table";
  }, [node.content]);

  const createNodeAfter = () => {
    const pos = getPos() + node.nodeSize;

    editor.commands.insertContentAt(pos, {
      type: "draggable-block",
      content: [
        {
          type: "paragraph",
        },
      ],
    });
  };

  return (
    <NodeViewWrapper as="div" className="flex gap-2 group w-full relative">
      <section
        className="flex gap-1"
        aria-label="left-menu"
        contentEditable="false"
      >
        <button
          type="button"
          className="btn btn-sm px-1 h-2 min-h-2 group-hover:opacity-100"
          onClick={createNodeAfter}
        >
          <Icon icon="ri:add-fill" />
        </button>
        <div
          className="btn btn-sm px-1 group-hover:opacity-100"
          contentEditable={false}
          draggable
          data-drag-handle
        >
          <Icon icon="ri:draggable" />
        </div>
      </section>

      <NodeViewContent className={`w-full ${isTable ? "ml-6" : ""}`} />
    </NodeViewWrapper>
  );
};
