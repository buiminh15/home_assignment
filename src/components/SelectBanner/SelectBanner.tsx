import React from "react";
import styles from "./SelectBanner.module.css";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { BANNER_IMAGES } from "@/constants/images";
import Image from "next/image";
import clsx from "clsx";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

type SelectBannerProps = {
  handleClose: () => void;
  handleSelectedBanner: (banner: string) => void;
};

function SelectBanner({
  handleClose,
  handleSelectedBanner,
}: SelectBannerProps) {
  const [bannerUrl, setBanner] = React.useState("");
  const handleCickBanner = (banner: string) => {
    setBanner(banner);
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerSelectBanner}>
        <span className={clsx(inter.className)}>Choose a banner</span>
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
              quality={60}
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
          className={clsx(
            styles.btn,
            styles.closeBtn,
            styles.cursorPointer,
            inter.className
          )}
          onClick={handleClose}
        >
          Close
        </button>
        <button
          onClick={() => {
            handleSelectedBanner(bannerUrl);
            handleClose();
          }}
          className={clsx(
            styles.btn,
            styles.saveBtn,
            styles.cursorPointer,
            inter.className
          )}
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default SelectBanner;
