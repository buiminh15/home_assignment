import clsx from "clsx";
import Image from "next/image";
import React from "react";
import SelectBanner from "../SelectBanner/SelectBanner";
import styles from "./BannerFrame.module.css";

function BannerFrame() {
  const [showSelectBanner, setShowBanner] = React.useState(false);
  const [selectedBanner, setSelectedBanner] = React.useState("");
  const handleOpenSelectBanner = () => {
    setShowBanner(true);
  };

  const handleCloseSelectBanner = () => {
    setShowBanner(false);
  };

  const handleSeletedBanner = (banner: string) => {
    setSelectedBanner(banner);
  };
  return (
    <>
      <div className={[styles.container]} onClick={handleOpenSelectBanner}>
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
            <span>Add a banner</span>
          </div>
        )}
      </div>
      {showSelectBanner && (
        <SelectBanner
          handleClose={handleCloseSelectBanner}
          handleSeletedBanner={handleSeletedBanner}
        />
      )}
    </>
  );
}

export default BannerFrame;
