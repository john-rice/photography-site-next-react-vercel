import imagekit from "../../imageKit/imageKit";

export default async function listFiles(options) {
  try {
    const result = await imagekit.listFiles(options);
    const resultsWithUrls = result.map((result) => ({
      ...result,
      url: imagekit.url({
        path: result.filePath,
        transformation: [{ quality: 80 }],
      }),
    }));
    return resultsWithUrls;
  } catch (error) {
    console.error("Failed to list files", error);
    return null;
  }
}
