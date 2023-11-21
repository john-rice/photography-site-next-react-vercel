import Image, { ImageProps } from "next/image";
import { forwardRef, useEffect, useRef } from "react";

const imageKitLoader = ({ src, width, quality }) => {
  if (src[0] === "/") src = src.slice(1);
  const params = [`w-${width}`];
  if (quality) {
    params.push(`q-${quality}`);
  }
  const paramsString = params.join(",");
  let urlEndpoint = process.env.IMAGEKIT_URL_ENDPOINT;
  if (urlEndpoint[urlEndpoint.length - 1] === "/")
    urlEndpoint = urlEndpoint.substring(0, urlEndpoint.length - 1);
  return `${urlEndpoint}/${src}?tr=${paramsString}`;
};

export const MyImage = forwardRef<HTMLImageElement, ImageProps>((_props, ref) => {
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (ref) {
      if (typeof ref === 'function') {
        ref(imgRef.current);
      } else {
        ref.current = imgRef.current;
      }
    }
  }, [ref]);

  return (
    <div ref={imgRef}>
      <Image
        loader={imageKitLoader}
        src="default-image.jpg"
        alt="Sample image"
        width={400}
        height={400}
      />
    </div>
  );
});
