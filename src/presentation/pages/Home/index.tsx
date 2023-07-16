"use client";

import React from "react";
import { Milkdown, MilkdownProvider, useEditor } from "@milkdown/react";
import { Editor, rootCtx } from "@milkdown/core";
import { nord } from "@milkdown/theme-nord";
import { commonmark } from "@milkdown/preset-commonmark";
import { emoji } from "@milkdown/plugin-emoji";

const MilkdownEditor: React.FC = () => {
  const { get } = useEditor((root) =>
    Editor.make()
      .config(nord)
      .config((ctx) => {
        ctx.set(rootCtx, root);
      })
      .use(commonmark)
      .use(emoji)
  );

  return <Milkdown />;
};

export const MilkdownEditorWrapper: React.FC = () => {
  return (
    <MilkdownProvider>
      <MilkdownEditor />
    </MilkdownProvider>
  );
};
