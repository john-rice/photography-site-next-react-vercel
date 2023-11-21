import imagekit from '../imageKit/imageKit';

let cachedResults;

export default async function getResults() {
  if (!cachedResults) {
    const fetchedResults = await imagekit.listFiles({
      path: 'your_imagekit_folder_path',
      limit: 400,
    });

    cachedResults = fetchedResults;
  }

  return cachedResults;
}
