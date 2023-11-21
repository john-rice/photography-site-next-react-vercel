import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import type { ImageProps } from '../../utils/types'
import listFiles from '../api/getAll'
import Carousel from '../../components/Carousel'

const Home: NextPage = ({ currentPhoto }: { currentPhoto: ImageProps }) => {
  const router = useRouter()
  const { photoId } = router.query
  const index = Number(photoId)

  return (
    <>
      <Head>
        <title>Doggy Time</title>
      </Head>
      <main className="mx-auto max-w-[1960px] p-4">
        <Carousel
          currentPhoto={currentPhoto}
          index={index}
        />
      </main>
    </>
  )
}

export default Home

export const getStaticProps: GetStaticProps = async (context) => {
  const results = await listFiles({
    path: "/sample-photos",
    limit: 400,
  });

  const reducedResults: ImageProps[] = results.map((result, i) => ({
    id: i,
    height: result.height,
    width: result.width,
    public_id: result.filePath,
    format: result.filePath.split('.').pop(),
    url: result.url
  }));

  const currentPhoto = reducedResults.find(
    (img) => img.id === Number(context.params.photoId)
  )

  return {
    props: {
      currentPhoto: currentPhoto,
    },
  }
}

export async function getStaticPaths() {
  const results = await listFiles({
    path: "/sample-photos",
    limit: 400,
  });

  const fullPaths = results.map((_file, i) => ({ params: { photoId: i.toString() } }));

  return {
    paths: fullPaths,
    fallback: false,
  }
}
