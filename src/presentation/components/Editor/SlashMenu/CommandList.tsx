/* eslint-disable react/display-name */
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { Editor, Range } from "@tiptap/core";

import { SlashMenuItem } from ".";

export type CommandListProps = {
  items: SlashMenuItem[];
  editor: Editor;
  command: any;
  text: string;
  range: Range;
};

export const CommandList = forwardRef<HTMLDivElement, CommandListProps>(
  (props, ref) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const scrollToButton = useCallback(() => {
      const button = document.querySelector(
        `button[data-index="${currentIndex}"]`
      );
      if (button) {
        button.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }, [currentIndex]);

    useEffect(() => {
      scrollToButton();
    }, [scrollToButton]);

    const upHandler = useCallback(() => {
      setCurrentIndex((currentIndex) =>
        currentIndex === 0 ? props.items.length - 1 : currentIndex - 1
      );
    }, [props.items.length]);

    const downHandler = useCallback(() => {
      setCurrentIndex((currentIndex) =>
        currentIndex === props.items.length - 1 ? 0 : currentIndex + 1
      );
    }, [props.items.length]);

    const enterHandler = useCallback(() => {
      props.command(props.items[currentIndex]);
    }, [props, currentIndex]);

    useImperativeHandle(
      ref as any,
      () => ({
        onKeyDown({ event }: { event: KeyboardEvent }) {
          if (event.key === "ArrowUp") {
            event.preventDefault();
            event.stopPropagation();
            upHandler();
            return true;
          }
          if (event.key === "ArrowDown") {
            event.preventDefault();
            event.stopPropagation();
            downHandler();
            return true;
          }
          if (event.key === "Enter") {
            event.preventDefault();
            event.stopPropagation();
            enterHandler();
            return true;
          }
          return false;
        },
      }),
      [downHandler, enterHandler, upHandler]
    );

    return (
      <div
        ref={ref}
        className="bg-base-100 p-1 border-base-200 rounded-md border shadow-md"
        style={{ maxHeight: "200px", overflowY: "auto", overflowX: "hidden" }}
      >
        <div className="space-y-1 flex flex-col">
          {props.items.length === 0 && (
            <div className="text-center text-base-content opacity-50">
              Sem resultados
            </div>
          )}
          {props.items.map((item, index) => (
            <button
              key={item.title}
              className={`btn btn-sm ${
                currentIndex === index ? "btn-active" : ""
              }`}
              data-index={index}
              onClick={() => {
                props.command(item);
              }}
            >
              {item.title}
            </button>
          ))}
        </div>
      </div>
    );
  }
);
