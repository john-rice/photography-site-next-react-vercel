import Image, { ImageProps } from "next/image";
import { forwardRef } from "react";

const imageKitLoader = ({ src, width, quality }) => {
  if (src[0] === "/") src = src.slice(1);
  const params = [`w-${width}`];
  if (quality) {
    params.push(`q-${quality}`);
  }
  const paramsString = params.join(",");
  let urlEndpoint = `https://ik.imagekit.io/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}`;
  if (urlEndpoint[urlEndpoint.length - 1] === "/")
    urlEndpoint = urlEndpoint.substring(0, urlEndpoint.length - 1);
  return `${urlEndpoint}/${src}?tr=${paramsString}`;
};

export const MyImage = forwardRef<typeof Image, ImageProps>((_props, ref) => {
  return (
    <Image
      loader={imageKitLoader}
      src="default-image.jpg"
      alt="Sample image"
      width={400}
      height={400}
      ref={ref}
    />
  );
});
