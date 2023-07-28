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
    <NodeViewWrapper as="div" className="flex gap-2 w-full relative">
      <section
        className="flex gap-1 opacity-0 hover:opacity-100"
        aria-label="left-menu"
        contentEditable="false"
      >
        <button
          type="button"
          className="btn btn-sm px-1"
          onClick={createNodeAfter}
        >
          <Icon icon="ri:add-fill" />
        </button>
        <div
          className="btn btn-sm px-1"
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
