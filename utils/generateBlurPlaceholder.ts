const cache = new Map<string, string>()

export async function getBase64ImageUrl(
  image: string
): Promise<string> {
  let url = cache.get(image)
  if (url) {
    return url
  }
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}${image}`
  )
  const buffer = await response.arrayBuffer()

  url = `data:image/jpeg;base64,${Buffer.from(buffer).toString('base64')}`
  cache.set(image, url)
  return url
}

export default getBase64ImageUrl;