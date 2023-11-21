import type { ImageProps } from './types'

const cache = new Map<ImageProps, string>()

export default async function getBase64ImageUrl(
  image: ImageProps
): Promise<string> {
  let url = cache.get(image)
  if (url) {
    return url
  }
  const response = await fetch(
    `https://ik.imagekit.io/${process.env.IMAGEKIT_PUBLIC_KEY}/${image.public_id}.${image.format}`
  )
  const buffer = await response.arrayBuffer()

  url = `data:image/jpeg;base64,${Buffer.from(buffer).toString('base64')}`
  cache.set(image, url)
  return url
}
