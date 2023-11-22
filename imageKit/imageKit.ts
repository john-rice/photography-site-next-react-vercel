import ImageKit from "imagekit";

export const imagekit: ImageKit = (() => {
  try {
    // Check if all required environment variables are present
    const urlEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT;
    const publicKey = process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY;
    const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;

    if (!urlEndpoint || !publicKey || !privateKey) {
      console.error("Missing required environment variables for ImageKit");
      console.log({ urlEndpoint, publicKey, privateKey });
      throw new Error("Missing required environment variables for ImageKit");
    }

    // Initialize ImageKit with the environment variables
    return new ImageKit({
      urlEndpoint,
      publicKey,
      privateKey,
    });
  } catch (error) {
    console.error("Failed to initialize ImageKit:", error);
    // Handle the error appropriately here
  }
})();

export default imagekit;
