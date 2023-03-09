import clsx from "clsx";
import Image from "next/image";
import React from "react";
import styles from "./Tag.module.css";

type TagProps = {
  name: string;
  isSelected?: boolean;
  textStyle?: any;
  handleSelect?: () => void;
  handleUnSelected?: (e: any) => void;
};

function Tag({
  name,
  isSelected,
  textStyle,
  handleSelect,
  handleUnSelected,
}: TagProps) {
  return (
    <div
      onClick={handleSelect}
      className={clsx(styles.tagContainer, isSelected && styles.selectedTag)}
    >
      <span className={clsx(textStyle)}>{name}</span>
      {isSelected && (
        <Image
          src='/assets/icons/small-close.svg'
          width={6}
          height={6}
          alt='small close'
          onClick={handleUnSelected}
        />
      )}
    </div>
  );
}

export default Tag;
