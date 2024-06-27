import React, { useEffect, useState } from "react";
import "./cursor.scss";
import { CustomCursorProps } from "../propses/CustomCursorProps";

const CustomCursorComponent: React.FC<CustomCursorProps> = (
  props: CustomCursorProps
) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  const [isCursorVisible, setIsCursorVisible] = useState(true);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    function isTouchDevice() {
      return "ontouchstart" in window || navigator.maxTouchPoints > 0;
    }

    if (isTouchDevice()) {
      const body = document.querySelector("body");
      if (body) {
        body.style.cursor = "none";
        setIsCursorVisible(false);
      }

      return;
    }

    const body = document.querySelector("body");
    if (body) {
      body.style.overflow = "hidden";
    }

    document.addEventListener("mousemove", moveCursor);

    return () => {
      document.removeEventListener("mousemove", moveCursor);
    };
  }, [cursorPosition]);

  return (
    <>
      {isCursorVisible && (
        <>
          {props.highlight && (
            <div
              className="hero-background__highlight"
              style={{
                top: `${cursorPosition.y}px`,
                left: `${cursorPosition.x}px`,
              }}
            ></div>
          )}
          {props.cursor && (
            <div
              className="custom-cursor "
              style={{
                top: `${cursorPosition.y}px`,
                left: `${cursorPosition.x}px`,
              }}
            ></div>
          )}
          {props.coordinates && (
            <div
              className="cursor-coordinates"
              style={{
                top: `${cursorPosition.y}px`,
                left: `${cursorPosition.x}px`,
              }}
            >
              <span aria-hidden="true">{`x: ${cursorPosition.x}`}</span>
              <span aria-hidden="true">{`y: ${cursorPosition.y}`}</span>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default CustomCursorComponent;
