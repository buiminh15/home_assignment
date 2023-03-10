import clsx from "clsx";
import Image from "next/image";
import React from "react";
import SelectBanner from "../SelectBanner/SelectBanner";
import styles from "./BannerFrame.module.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

type BannerFrameProps = {
  navState: boolean;
  handleSetBanner: (banner: string) => void;
  banner?: string;
  disabled?: boolean;
};

function BannerFrame({
  navState,
  banner,
  disabled,
  handleSetBanner,
}: BannerFrameProps) {
  const [showSelectBanner, setShowBanner] = React.useState(false);
  const [selectedBanner, setSelectedBanner] = React.useState("");

  React.useEffect(() => {
    if (banner) {
      setSelectedBanner(banner);
    }
  }, [banner]);

  const handleOpenSelectBanner = () => {
    if (disabled) {
      return;
    }
    setShowBanner(true);
  };

  const handleCloseSelectBanner = () => {
    setShowBanner(false);
  };

  const handleSelectedBanner = (banner: string) => {
    setSelectedBanner(banner);
    handleSetBanner(banner);
  };

  return (
    <>
      <div
        className={clsx(styles.container, navState && styles.unsetRelative)}
        onClick={handleOpenSelectBanner}
      >
        {selectedBanner ? (
          <div className={clsx(styles.bannerImage)}>
            <Image
              src={selectedBanner}
              width={300}
              height={200}
              alt=''
              style={{
                objectFit: "cover",
                width: "100%",
                height: "100%",
              }}
            />
          </div>
        ) : (
          <div className={styles.contentWrapper}>
            <Image
              src='/assets/icons/banner.svg'
              width={24}
              height={24}
              alt='banner icon'
            />
            <span className={clsx(inter.className)}>Add a banner</span>
          </div>
        )}
      </div>
      {showSelectBanner && (
        <>
          <SelectBanner
            handleClose={handleCloseSelectBanner}
            handleSelectedBanner={handleSelectedBanner}
          />
          <div className={clsx(styles.bannerOverlay)}></div>
        </>
      )}
    </>
  );
}

export default BannerFrame;
