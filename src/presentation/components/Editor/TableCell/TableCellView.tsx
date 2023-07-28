import { useCallback, useEffect, useState } from "react";
import { TableCellButton } from "./TableCellButton";
import { NodeViewContent, NodeViewProps, NodeViewWrapper } from "../React";

export const TableCellView = ({
  decorations,
  deleteNode,
  editor,
  extension,
  getPos,
  node,
  selected,
  updateAttributes,
}: NodeViewProps) => {
  const [isCurrentCellActive, setIsCurrentCellActive] = useState(false);

  const checkCursorInCell = () => {
    const { from, to } = editor.state.selection;
    const nodeFrom = getPos();
    const nodeTo = nodeFrom + node.nodeSize;
    setIsCurrentCellActive(nodeFrom <= from && to <= nodeTo);
  };

  useEffect(() => {
    editor.on("selectionUpdate", checkCursorInCell);
    setTimeout(checkCursorInCell, 100);
    return () => {
      editor.off("selectionUpdate", checkCursorInCell);
    };
  });

  // useEffect(() => {
  //   updateAttributes({
  //     test: "123",
  //   });
  // }, [
  //   node.attrs.colspan,
  //   node.attrs.colwidth,
  //   node.attrs.rowspan,
  //   updateAttributes,
  // ]);

  return (
    <NodeViewWrapper>
      <NodeViewContent as="p" />
      <div contentEditable={false}>
        {isCurrentCellActive && <TableCellButton editor={editor} />}
      </div>
    </NodeViewWrapper>
  );
};
