import { useRef, useEffect } from "react";
import styles from "../styles/Home.module.css";

const TextArea = ({ defaultText, className, startFocused, onBlurCallback }) => {
  const titleRef = useRef();

  useEffect(() => {
    formatTitle();
    if (startFocused) {
      titleRef.current.focus();
    }
  }, []);

  const onBlur = () => {
    console.log("onBlur");
    formatTitle();
    onBlurCallback(titleRef.current.value); // tell parent that text officially changed
  };

  const formatTitle = () => {
    if (typeof titleRef.current === "undefined") return;
    let text = titleRef.current.value;
    if (titleRef.current !== document.activeElement) {
      text = text.trim();
      text = text
        .replace("\n\n", "\n")
        .split("\n")
        .filter((text) => text.trim().length)
        .join(" ");

      titleRef.current.value = text;
    }

    titleRef.current.style.width = text.length + 1 + "ch";
    if (text.length <= 14 && !text.includes("\n")) {
      titleRef.current.style.height = "2ch";
      return;
    }
    titleRef.current.style.height = "auto";
    titleRef.current.style.height = titleRef.current.scrollHeight + 2 + "px";
  };

  return (
    <textarea
      className={`${styles.textarea} ${className}`}
      ref={titleRef}
      style={{ width: defaultText.length + 1 + "ch" }}
      defaultValue={defaultText}
      onBlur={onBlur}
      onChange={formatTitle}
    />
  );
};

export default TextArea;
