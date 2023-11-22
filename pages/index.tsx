import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo, useRef, useState } from "react";
import Modal from "../components/Modal";
import { MyImage } from "../components/ImageKitComponent";
import type { ImageProps } from "../utils/types";
import { useLastViewedPhoto } from "../utils/useLastViewedPhoto";
import getBase64ImageUrl from "../utils/generateBlurPlaceholder";
import { Analytics } from "@vercel/analytics/react";
// import { useTransition, a} from '@react-spring/web'
import listFiles from "./api/getAll";

const MainContent: React.FC<{
  images: ImageProps[];
  photoId: string | string[] | undefined;
  allTags: string[];
}> = ({ images, photoId, allTags }) => {
  const [lastViewedPhoto, setLastViewedPhoto] = useLastViewedPhoto();
  const [tags, setTags] = useState<string[]>([]);
  const lastViewedPhotoRef = useRef<HTMLAnchorElement>(null);

  const imageState = useMemo(() => {
    if (tags.length === 0) {
      return images;
    }
    return images.filter((image) =>
      image.tags?.some((tag) => tags.includes(tag))
    );
  }, [tags]);

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
          images={imageState}
          onClose={() => {
            setLastViewedPhoto(photoId);
          }}
        />
      )}
      <div className="columns-1 gap-4 sm:columns-2 xl:columns-3 2xl:columns-4">
        <div className="after:content relative mb-5 flex h-[629px] flex-col items-center justify-end gap-4 overflow-hidden rounded-lg bg-white/10 pt-64 text-center text-white shadow-highlight after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight lg:pt-0">
          <div className="grid grid-cols-3 gap-4 overflow-auto px-4 py-2 items-center">
            {allTags?.map((tag) => (
              <div>
              <button
                key={tag}
                type="button"
                className={`rounded-full px-3 py-1 text-xs uppercase w-full ${
                  tags.includes(tag)
                    ? "bg-gray-600 text-white"
                    : "bg-black/60 text-white hover:bg-gray-500"
                }`}
                onClick={() => {
                  setTags((currTags) => {
                    if (currTags.includes(tag)) {
                      return currTags.filter((t) => t !== tag);
                    }
                    return [...currTags, tag];
                  });
                }}
              >
                {tag}
              </button>
              </div>
            ))}
          </div>
        </div>
        {imageState.map(({ id, public_id, blurDataUrl }) => (
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
              src={public_id}
              blurDataURL={blurDataUrl}
              quality={80}
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
      <Analytics />
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

const Home: NextPage = ({
  images,
  allTags,
}: {
  images: ImageProps[];
  allTags: string[];
}) => {
  const router = useRouter();
  const { photoId } = router.query;

  return (
    <>
      <Head>
        <title>Photo Sample - Vercel Next ImageKit</title>
      </Head>
      <MainContent images={images} photoId={photoId} allTags={allTags} />
      <Footer />
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const { images, allTags } = await loadImages();
  return {
    props: {
      allTags,
      images,
    },
  };
};

const loadImages = async (searchTags?: string[] | string) => {
  const results = await listFiles({
    path: "/sample-photos",
    limit: 400,
    tags: searchTags,
  });

  const allTags = Array.from(
    new Set([
      ...results.map(({ tags }) => tags).flat(),
      ...results
        .map(({ AITags }) =>
          (AITags as { name: string }[])?.map(({ name }) => name)
        )
        .flat(),
    ])
  ).filter(Boolean);

  const reducedResults: ImageProps[] = results.map((fileObject, i) => ({
    id: i,
    height: fileObject.height,
    width: fileObject.width,
    public_id: fileObject.filePath,
    format: fileObject.filePath.split(".").pop(),
    tags: Array.from(
      new Set([
        ...(fileObject.tags || []),
        ...((fileObject.AITags as { name: string }[])?.map(
          ({ name }) => name
        ) || []),
      ])
    ),
  }));

  const blurImagePromises = results.map((fileObject) => {
    return getBase64ImageUrl(fileObject.filePath);
  });

  const imagesWithBlurDataUrls = await Promise.all(blurImagePromises);

  for (let i = 0; i < reducedResults.length; i++) {
    reducedResults[i].blurDataUrl = imagesWithBlurDataUrls[i];
  }

  return { images: reducedResults, allTags };
};
