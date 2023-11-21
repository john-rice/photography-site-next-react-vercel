import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import Modal from "../components/Modal";
import { MyImage } from "../components/ImageKitComponent";
import imagekit from "../imageKit/imageKit";
import type { ImageProps } from "../utils/types";
import { useLastViewedPhoto } from "../utils/useLastViewedPhoto";
import getBase64ImageUrl from "../utils/generateBlurPlaceholder";

const MainContent: React.FC<{
  images: ImageProps[];
  photoId: string | string[] | undefined;
}> = ({ images, photoId }) => {
  const [lastViewedPhoto, setLastViewedPhoto] = useLastViewedPhoto();

  const lastViewedPhotoRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    // This effect keeps track of the last viewed photo in the modal to keep the index page in sync when the user navigates back
    if (lastViewedPhoto && !photoId) {
      lastViewedPhotoRef.current.scrollIntoView({ block: "center" });
      setLastViewedPhoto(null);
    }
  }, [photoId, lastViewedPhoto, setLastViewedPhoto]);

  return (
    <main className="mx-auto max-w-[1960px] p-4">
      {photoId && (
        <Modal
          images={images}
          onClose={() => {
            setLastViewedPhoto(photoId);
          }}
        />
      )}
      <div className="columns-1 gap-4 sm:columns-2 xl:columns-3 2xl:columns-4">
        <div className="after:content relative mb-5 flex h-[629px] flex-col items-center justify-end gap-4 overflow-hidden rounded-lg bg-white/10 px-6 pb-16 pt-64 text-center text-white shadow-highlight after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight lg:pt-0">
          <div className="absolute inset-0 flex items-center justify-center opacity-20">
            <span className="absolute bottom-0 left-0 right-0 h-[400px] bg-gradient-to-b from-black/0 via-black to-black"></span>
          </div>
          <h1 className="mb-4 mt-8 text-base font-bold uppercase tracking-widest">
            All The Photos
          </h1>
          <p className="max-w-[40ch] text-white/75 sm:max-w-[32ch]">
            This is the photo site description block!
          </p>
        </div>
        {images.map(({ id, public_id, format, blurDataUrl }) => (
          <Link
            key={id}
            href={`/?photoId=${id}`}
            as={`/p/${id}`}
            ref={id === Number(lastViewedPhoto) ? lastViewedPhotoRef : null}
            shallow
            className="after:content group relative mb-5 block w-full cursor-zoom-in after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight"
          >
            <MyImage
              alt="Photo Description"
              className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
              style={{ transform: "translate3d(0, 0, 0)" }}
              placeholder="blur"
              blurDataURL={blurDataUrl}
              src={imagekit.url({
                path: `${public_id}.${format}`,
                transformation: [{ quality: 80 }],
              })}
              width={720}
              height={480}
              sizes="(max-width: 640px) 100vw,
                  (max-width: 1280px) 50vw,
                  (max-width: 1536px) 33vw,
                  25vw"
            />
          </Link>
        ))}
      </div>
    </main>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="p-6 text-center text-white/80 sm:p-12">
      Work in progress to have an updated demo template for photo sites.
    </footer>
  );
};

const Home: NextPage = ({ images }: { images: ImageProps[] }) => {
  const router = useRouter();
  const { photoId } = router.query;

  return (
    <>
      <Head>
        <title>Photo Sample - Vercel Next ImageKit</title>
      </Head>
      <MainContent images={images} photoId={photoId} />
      <Footer />
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const results = await imagekit.listFiles({
    path: "your_imagekit_folder_path",
    limit: 400,
  });

  const reducedResults: ImageProps[] = results.map((fileObject, i) => ({
    id: i,
    height: fileObject.height,
    width: fileObject.width,
    public_id: fileObject.filePath,
    format: fileObject.filePath.split(".").pop(),
    url: imagekit.url({
      path: fileObject.filePath,
      transformation: [{ quality: 80 }],
    }),
  }));

  const blurImagePromises = results.map((fileObject, i) => {
    const imageProps: ImageProps = {
      id: i, 
      height: fileObject.height,
      width: fileObject.width,
      public_id: fileObject.filePath,
      format: fileObject.filePath.split(".").pop(),
      url: fileObject.url,
    };
    return getBase64ImageUrl(imageProps);
  });

  const imagesWithBlurDataUrls = await Promise.all(blurImagePromises);

  for (let i = 0; i < reducedResults.length; i++) {
    reducedResults[i].blurDataUrl = imagesWithBlurDataUrls[i];
  }

  return {
    props: {
      images: reducedResults,
    },
  };
};
