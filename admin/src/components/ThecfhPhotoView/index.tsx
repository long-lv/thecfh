import { PhotoProvider, PhotoView } from "react-photo-view";
import Image from "next/image";
import IPropsThecfhPhoView from "./type";
import defaulImgFail from "../../assets/images/imageLoadFail.png";
import { useState } from "react";

export default function TheCfhPhotoView(props: IPropsThecfhPhoView) {
  const {
    src,
    alt = "photo",
    style,
    className,
    width = 200,
    height = 200,
    photoClosable = true,
    maskOpacity = 0.8,
    isSlider = false,
    photos = [],
  } = props;


	const [errorImages, setErrorImages] = useState<Record<string, boolean>>({});

  const handleError = (url: string) => {
    setErrorImages((prev) => ({ ...prev, [url]: true }));
  };

  const renderImage = (imgSrc: string, key?: number) => {
    const displaySrc = errorImages[imgSrc] ? defaulImgFail.src : imgSrc;

    return (
      <PhotoView key={key} src={displaySrc}>
        <Image
          src={displaySrc}
          loading="lazy"
          onError={() => handleError(imgSrc)}
          style={{
            ...style,
            objectFit: "cover",
            transition: "0.3s",
          }}
          alt={alt}
          className={`cursor-pointer rounded-lg hover:opacity-90 ${className || ""}`}
          width={width}
          height={height}
        />
      </PhotoView>
    );
  };

  return (
    <PhotoProvider photoClosable={photoClosable} maskOpacity={maskOpacity}>
      {isSlider && photos.length > 0
        ? photos.map((photo, index) => renderImage(photo, index))
        : renderImage(src || "")}
    </PhotoProvider>
  );
}
