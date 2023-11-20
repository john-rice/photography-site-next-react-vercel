# Next.js & Cloudinary example app

This example shows how to create an image gallery site using Next.js, [Cloudinary](https://cloudinary.com), and [Tailwind](https://tailwindcss.com).

## Deploy your own

You will need a Cloudinary account or access to the keys that will share photos.


[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/john-rice/photography-site-next-react-vercel&repository-name=with-cloudinary&env=NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,CLOUDINARY_API_KEY,CLOUDINARY_API_SECRET,CLOUDINARY_FOLDER&envDescription=API%20Keys%20from%20Cloudinary%20needed%20to%20run%20this%20application.)

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## How to use

Clone the repo.

Copy .env.local.example to .env.local and update the values with your own.

```bash
npm i
npm run dev
```


## References

- Cloudinary API: https://cloudinary.com/documentation/transformation_reference


## Todos

See ./todos for more

### Overview

- Add tag filtering
- Add a page for filtering/navigating by subfolder. I the case of a dog photo site, navigation to labradors/rescues/ or ausies could be examples to support. For an event photographer that could be links to specific sessions with clients as well as /christmas /babies/ family for example
- Add optional supabase integration with login to add restricted pages based on access granted
- Add a login page
- Add an admin page for granting access to restricted pages
- Discuss adding ability for managing access Cloudinary
- 