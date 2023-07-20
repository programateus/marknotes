import tippy, { Instance } from "tippy.js";
import { Extension, Editor, Range } from "@tiptap/core";
import { ReactRenderer } from "@tiptap/react";
import Suggestion, { SuggestionOptions } from "@tiptap/suggestion";

import { CommandList } from "./CommandList";

const ITEMS: SlashMenuItem[] = [
  {
    title: "Heading 1",
    command: ({ editor, range }) =>
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .setNode("heading", { level: 1 })
        .run(),
    shortcut: "#",
  },
  {
    title: "Heading 2",
    command: ({ editor, range }) =>
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .setNode("heading", { level: 2 })
        .run(),
    shortcut: "##",
  },
  {
    title: "Heading 3",
    command: ({ editor, range }) =>
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .setNode("heading", { level: 2 })
        .run(),
    shortcut: "###",
  },
  {
    title: "Heading 4",
    command: ({ editor, range }) =>
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .setNode("heading", { level: 2 })
        .run(),
    shortcut: "####",
  },
  {
    title: "Heading 5",
    command: ({ editor, range }) =>
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .setNode("heading", { level: 2 })
        .run(),
    shortcut: "#####",
  },
  {
    title: "Heading 6",
    command: ({ editor, range }) =>
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .setNode("heading", { level: 2 })
        .run(),
    shortcut: "#######",
  },
  {
    title: "Codeblock",
    command: ({ editor, range }) =>
      editor.chain().focus().deleteRange(range).toggleCodeBlock().run(),
    shortcut: "`",
  },
  {
    title: "Ordered List",
    command: ({ editor, range }) =>
      editor.chain().focus().deleteRange(range).toggleOrderedList().run(),
    shortcut: "1.",
  },
  {
    title: "Unordered List",
    command: ({ editor, range }) =>
      editor.chain().focus().deleteRange(range).toggleBulletList().run(),
    shortcut: "-",
  },
  {
    title: "Task List",
    command: ({ editor, range }) =>
      editor.chain().focus().deleteRange(range).toggleTaskList().run(),
    shortcut: "-",
  },
  {
    title: "Table",
    command: ({ editor, range }) =>
      editor.chain().focus().deleteRange(range).insertTable().run(),
    shortcut: "-",
  },
];

export type SlashMenuItem = {
  title: string;
  command: (params: { editor: Editor; range: Range }) => void;
  shortcut: string;
  type?: string;
  desc?: string;
};

export const suggestions: Partial<SuggestionOptions<SlashMenuItem>> = {
  items: ({ query }) => {
    if (!query) return ITEMS;
    return ITEMS.filter((item) => {
      return item.title.toLowerCase().startsWith(query.toLowerCase());
    });
  },

  render: () => {
    let component: ReactRenderer;
    let popup: Instance[];
    let localProps: Record<string, any> | undefined;

    return {
      onStart: (props: Record<string, any> | undefined) => {
        localProps = { ...props, event: "" };

        component = new ReactRenderer(CommandList, {
          props: localProps,
          editor: localProps?.editor,
        });

        popup = tippy("body", {
          getReferenceClientRect: localProps.clientRect,
          appendTo: () => document.body,
          content: component.element,
          showOnCreate: true,
          interactive: true,
          maxWidth: "none",
          trigger: "manual",
          placement: "bottom-start",
          animation: "shift-toward-subtle",
          duration: 250,
        });
      },

      onUpdate(props: Record<string, any> | undefined) {
        localProps = { ...props, event: "" };

        component.updateProps(localProps);

        popup[0].setProps({
          getReferenceClientRect: localProps.clientRect,
        });
      },

      onKeyDown(props) {
        component.updateProps({ ...localProps, event: props.event });

        (component.ref as any)?.onKeyDown(props);

        if (props.event.key === "Escape") {
          (popup[0] as any).hide();
          return true;
        }

        if (props.event.key === "Enter") {
          (props.event as Event).stopPropagation();
          (props.event as Event).preventDefault();
          return true;
        }

        return false;
      },

      onExit() {
        if (popup && popup[0]) popup[0]?.destroy();
        if (component) component.destroy();
      },
    };
  },
};

export type CommandExtensionOptions = {
  suggestions: Partial<SuggestionOptions<SlashMenuItem>>;
};

export const Command = Extension.create<CommandExtensionOptions>({
  name: "slash-commands",

  addOptions() {
    return {
      suggestions: {
        char: "/",
        command: ({ editor, range, props }) => {
          return props.command({ editor, range });
        },
      },
    };
  },

  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        ...this.options.suggestions,
      }),
    ];
  },
});
