import Image from "next/image";
import React from "react";
import styles from "@/styles/Home.module.css";
import Link from "next/link";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { FiChevronDown } from "react-icons/fi";
import clsx from "clsx";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

function Header() {
  const [nav, setNav] = React.useState(false);
  const handleNav = () => {
    setNav(!nav);
  };

  const closeNav = () => {
    setNav(false);
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
        <ul
          style={{ color: "black" }}
          className={clsx(styles.navContainer, inter.className)}
        >
          <li>
            <Link href='/'>Blog</Link>
          </li>
          <li>
            <Link href='/'>Socials</Link>
          </li>
          <li>
            <Link href='/'>Past Socials</Link>
          </li>
          <li>
            <Link href='/' className={clsx(styles.row)} style={{ gap: 2 }}>
              Clubs
              <FiChevronDown size={14} color='black' />
            </Link>
          </li>
          <li>
            <Link href='/'>Contact</Link>
          </li>
        </ul>
        {/* Hamburger Icon */}
        <div
          style={{ color: "black" }}
          onClick={handleNav}
          className={clsx(styles.hamburgerIcon, styles.cursorPointer)}
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
              <div onClick={handleNav} className={clsx(styles.cursorPointer)}>
                <AiOutlineClose size={24} color='white' />
              </div>
            </div>
          </div>
          <div className={clsx(styles.py4, styles.col)}>
            <ul className={clsx(styles.navOverlay, inter.className)}>
              <Link href='/'>
                <li onClick={closeNav} className={clsx(styles.py4)}>
                  Blog
                </li>
              </Link>
              <Link href='/'>
                <li onClick={closeNav} className={clsx(styles.py4)}>
                  Socials
                </li>
              </Link>
              <Link href='/'>
                <li onClick={closeNav} className={clsx(styles.py4)}>
                  Past Socials
                </li>
              </Link>
              <Link href='/'>
                <li onClick={closeNav} className={clsx(styles.py4, styles.row)}>
                  Clubs
                  <FiChevronDown size={24} color='white' />
                </li>
              </Link>
              <Link href='/'>
                <li onClick={closeNav} className={clsx(styles.py4)}>
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
