import Image, { ImageProps } from "next/image";
import { forwardRef, useEffect, useRef, useState } from "react";

const imageKitLoader = ({ src, width, quality }) => {
  if (src[0] === "/") src = src.slice(1);
  const params = [`w-${width}`];
  if (quality) {
    params.push(`q-${quality}`);
  }
  const paramsString = params.join(",");
  let urlEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT;
  return `${urlEndpoint}/${src}?tr=${paramsString}`;
};

export const MyImage = forwardRef<HTMLImageElement, ImageProps>(
  (props, ref) => {
    const imgRef = useRef<HTMLImageElement>(null);
    const [blurDataUrl, setBlurDataUrl] = useState("");

    useEffect(() => {
      fetch(
        process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT +
          `/${props.src}?tr=n-ik_ml_thumbnail`
      )
        .then((res) => {
          return res.blob();
        })
        .then((blob) => {
          const url = URL.createObjectURL(blob);
          setBlurDataUrl(url);
        });
    }, [props.src]);

    useEffect(() => {
      if (ref) {
        if (typeof ref === "function") {
          ref(imgRef.current);
        } else {
          ref.current = imgRef.current;
        }
      }
    }, [ref]);
    return (
      <div ref={imgRef}>
        <Image loader={imageKitLoader} placeholder={blurDataUrl ? "empty" : undefined} blurDataURL={blurDataUrl} {...props} />
      </div>
    );
  }
);
