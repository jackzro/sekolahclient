import React from "react";
import { Image } from "@react-pdf/renderer";
import compose from "../../styles/compose";
import ImageNext from "next/image";
import Logo from "../../assets/images/ykb-logo.png";

const ImagePdf = ({ className, placeholder, value, width, pdfMode }) => {
  const marks = {
    100: "100px",
    150: "150px",
    200: "200px",
    250: "250px",
  };

  if (pdfMode) {
    if (value) {
      return (
        <Image
          style={{
            ...compose(`image ${className ? className : ""}`),
            maxWidth: width,
          }}
          src={value}
        />
      );
    } else {
      return <></>;
    }
  }

  return (
    <div
      className={`image ${value ? "mb-5" : ""} ${className ? className : ""}`}
    >
      <ImageNext src={Logo} width="35" height="38" />
    </div>
  );
};

export default ImagePdf;
