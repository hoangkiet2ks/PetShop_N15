import { useState } from "react";
import HeaderTop from "../components/header/HeaderTop";
import PreviewCart from "../pages/previewCart/PreviewCart";
import HeaderBottom from "../components/header/HeaderBottom";
import AnnoucementBar from "../components/header/AnnoucementBar";
import "../css/header/Header.css";

const Header = () => {
  return (
    <>
      <div className="header">
        <HeaderTop />
        <PreviewCart />
        <HeaderBottom />
        <AnnoucementBar />
      </div>
    </>
  );
};

export default Header;
