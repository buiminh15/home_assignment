import clsx from "clsx";
import Image from "next/image";
import React from "react";
import styles from "./Tag.module.css";

type TagProps = {
  name: string;
  isSelected?: boolean;
  handleSelect?: () => void;
  handleUnSelected?: () => void;
};

function Tag({ name, isSelected, handleSelect, handleUnSelected }: TagProps) {
  return (
    <div
      onClick={handleSelect}
      className={clsx(styles.tagContainer, isSelected && styles.selectedTag)}
    >
      <span>{name}</span>
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
