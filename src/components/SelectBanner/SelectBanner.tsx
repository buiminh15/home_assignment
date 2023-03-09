import React from "react";
import styles from "./SelectBanner.module.css";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { BANNER_IMAGES } from "@/constants/images";
import Image from "next/image";
import clsx from "clsx";

type SelectBannerProps = {
  handleClose: () => void;
  handleSeletedBanner: (banner) => void;
};

function SelectBanner({ handleClose, handleSeletedBanner }: SelectBannerProps) {
  const [bannerUrl, setBanner] = React.useState("");
  const handleCickBanner = (banner: string) => {
    setBanner(banner);
  };
  return (
    <div className={styles.container}>
      <div className={styles.headerSelectBanner}>
        <span>Choose a banner</span>
        <div onClick={handleClose} className={clsx(styles.cursorPointer)}>
          <AiOutlineClose size={24} color={"#3f3f3f"} />
        </div>
      </div>
      <hr />
      <div className={styles.bodySelectBanner}>
        {BANNER_IMAGES.map((image, index) => (
          <div
            onClick={() => handleCickBanner(image)}
            key={image}
            className={clsx(
              styles.cursorPointer,
              styles.imageContainer,
              image === bannerUrl && styles.seletedBanner
            )}
          >
            <Image
              priority
              src={image}
              alt={`image-banner-${index}`}
              width={120}
              height={100}
              style={{
                objectFit: "cover",
                width: "100%",
                height: "100%",
              }}
            />
          </div>
        ))}
      </div>
      <hr />
      <div className={styles.footerSelectBanner}>
        <button
          className={clsx(styles.btn, styles.closeBtn, styles.cursorPointer)}
          onClick={handleClose}
        >
          Close
        </button>
        <button
          onClick={() => {
            handleSeletedBanner(bannerUrl);
            handleClose();
          }}
          className={clsx(styles.btn, styles.saveBtn, styles.cursorPointer)}
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default SelectBanner;