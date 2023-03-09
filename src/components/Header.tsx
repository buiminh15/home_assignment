import Image from "next/image";
import React from "react";
import styles from "@/styles/Home.module.css";
import Link from "next/link";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import clsx from "clsx";

function Header() {
  const [nav, setNav] = React.useState(false);
  const handleNav = () => {
    setNav(!nav);
    console.log("test");
  };
  return (
    <header className={styles.header}>
      <div className={styles.headerLogo}>
        <Link href='/'>
          <Image
            priority
            src='/assets/icons/logo.svg'
            fill
            alt='logo'
            className={styles.cursorPointer}
          />
        </Link>
      </div>
      <nav className={styles.nav}>
        <ul style={{ color: "black" }} className={styles.navContainer}>
          <li className='ml-10 text-sm uppercase hover:border-b'>
            <Link href='/'>Blog</Link>
          </li>
          <li className='ml-10 text-sm uppercase hover:border-b'>
            <Link href='/'>Socials</Link>
          </li>
          <li className='ml-10 text-sm uppercase hover:border-b'>
            <Link href='/'>Past Socials</Link>
          </li>
          <li className='ml-10 text-sm uppercase hover:border-b'>
            <Link href='/'>Clubs</Link>
          </li>
          <li className='ml-10 text-sm uppercase hover:border-b'>
            <Link href='/'>Contact</Link>
          </li>
        </ul>
        {/* Hamburger Icon */}
        <div
          style={{ color: "black" }}
          onClick={handleNav}
          className={styles.hamburgerIcon}
        >
          <AiOutlineMenu size={25} />
        </div>
      </nav>

      {/* Overlay */}
      <div
        className={clsx(
          styles.navContainerOverlayNotShow,
          nav && styles.navContainerOverlay
        )}
      >
        {/* Side Drawer Menu */}
        <div
          className={clsx(styles.navContainerSideDrawer, nav && styles.show)}
        >
          <div>
            <div className={clsx(styles.sideDrawer, styles.close)}>
              <div
                onClick={handleNav}
                className='rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer'
              >
                <AiOutlineClose size={24} />
              </div>
            </div>
          </div>
          <div className={clsx(styles.py4, styles.col)}>
            <ul className={styles.navOverlay}>
              <Link href='/'>
                <li onClick={() => setNav(false)} className={clsx(styles.py4)}>
                  Blog
                </li>
              </Link>
              <Link href='/'>
                <li onClick={() => setNav(false)} className={clsx(styles.py4)}>
                  Socials
                </li>
              </Link>
              <Link href='/'>
                <li onClick={() => setNav(false)} className={clsx(styles.py4)}>
                  Past Socials
                </li>
              </Link>
              <Link href='/'>
                <li onClick={() => setNav(false)} className={clsx(styles.py4)}>
                  Clubs
                </li>
              </Link>
              <Link href='/'>
                <li onClick={() => setNav(false)} className={clsx(styles.py4)}>
                  Contact
                </li>
              </Link>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
