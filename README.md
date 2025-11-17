# Stablo Next.js Blog

This folder contains a Markdown-powered blog that recreates the look and feel of the original **Stablo Astro** template, but rebuilt with **Next.js 14** and **Tailwind CSS**.

The site automatically generates SEO tags for every page, exposes each story at `/the-post-slug`, and lists all posts on the home page.

---

## Getting Started

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Start a local preview**

   ```bash
   npm run dev
   ```

   Visit [http://localhost:3000](http://localhost:3000) to view the site.

3. **Sync post images (only needed after you add or update images)**

   ```bash
   npm run sync:assets
   ```

   This copies the images that sit next to every Markdown file into `public/posts`, so the browser can load them.

---

## How Posts Are Organised

Every article lives in its own folder inside `content/posts`.

```
content/
  posts/
    a-new-face-of-nuwa-ai-honoring-origins-empowering-futures/
      index.md
      blog7.webp
    prompt-is-law/
      index.md
      blog10.webp
    …
```

Each folder contains:

- `index.md` – the article content plus its metadata (the **frontmatter**).
- Any images used by the post, stored beside the Markdown file (for example `blog7.webp`).

The hero image for a post is referenced from the frontmatter. Keep the file name the same as written in the frontmatter (e.g. `image: "./blog7.webp"`).

---

## Editing An Existing Post

1. Open the folder for the post inside `content/posts/<the-post-slug>/`.
2. Edit `index.md` in any text editor. The very top of the file is the **frontmatter**:

   ```yaml
   ---
   title: "Your Post Title"
   excerpt: "A short teaser used on card previews."
   publishDate: "2025-06-19T00:00:00.000Z"
   image: "./blog7.webp"
   category: "branding"
   author: "summer"
   tags: [nuwa, identity]
   ---
   ```

   - **title**: The headline displayed on the page and in SEO tags.
   - **excerpt**: One or two sentences that appear in the post grid and meta description.
   - **publishDate**: Use the full date format shown above (year-month-day plus time).
   - **image**: File name of the hero image stored in the same folder.
   - **category**: One of the predefined categories (`branding`, `tech`, `product`, etc.).
   - **author**: One of the author IDs listed in `lib/data/authors.ts`.
   - **tags**: Optional keywords (comma-separated, keep them lowercase).
   - **draft** *(optional)*: Add `draft: true` to hide the post from the site.

3. Below the frontmatter you can write or edit the post with normal Markdown: headings (`##`), bold, italic, links, bullet lists, block quotes, and so on.
4. If you swap or add images, make sure the new files sit in the same folder as `index.md`, and update the `image` field (or Markdown image references) to match the file name.
5. Run `npm run sync:assets` so those images are copied to `public/posts`.

Changes are picked up automatically when you refresh the page in development. During a production build (`npm run build`) the site re-reads all Markdown files, copies their images, and regenerates the SEO metadata.

---

## Creating A New Post

### Option 1: Use the Interactive Script (Recommended)

Run the interactive post creator:

```bash
npm run new:post
```

This will guide you through creating a new post with all the required frontmatter fields. It will:
- Generate a URL-friendly slug from your title
- Create the post folder structure
- Set up the template with your metadata
- Add a placeholder cover image

After running the script, you can:
1. Edit `content/posts/<your-slug>/index.md` to write your content
2. Replace `cover-image.webp` with your actual hero image
3. Set `draft: false` when ready to publish
4. Run `npm run sync:assets` to copy images

### Option 2: Manual Creation

1. Copy the template folder:
   ```bash
   cp -r content/posts/_template content/posts/my-new-story
   ```
2. Rename the folder to your desired URL slug (e.g. `my-new-story`)
3. Open the new `index.md` and update every frontmatter field
4. Replace the body content with your new article
5. Add a hero image file to the folder and point `image` at it
6. Run `npm run sync:assets`

The new post will automatically appear on the home page, the blog, and at `/<your-slug>`.

📚 **For detailed guidance**, see `content/posts/README.md`

---

## Understanding SEO Output

- The home, blog, and about pages define their own titles and descriptions.
- Each post page uses the frontmatter (`title`, `excerpt`, `publishDate`, `tags`, `image`) to populate HTML `<title>`, meta description, Open Graph, and Twitter Card tags.
- If you supply `tags`, they are also included as Open Graph article tags.
- The optional environment variable `NEXT_PUBLIC_SITE_URL` can be set in `.env` to ensure canonical URLs and social sharing images are absolute.

---

## Helpful Commands

- `npm run dev` – start the local Next.js dev server.
- `npm run build` – build the production-ready site.
- `npm run start` – run the built site locally.
- `npm run lint` – run ESLint checks.
- `npm run sync:assets` – copy Markdown co-located images into `public/posts`.
- `npm run new:post` – interactive script to create a new blog post.

---

## Troubleshooting Tips For Editors

- If an image does not appear, confirm the file name in `index.md` exactly matches the image file next to it and rerun `npm run sync:assets`.
- If a post is missing from the home page, make sure `draft` is not set to `true` and the `publishDate` is valid.
- Use a free tool such as [YAML Validator](https://www.yamllint.com/) if you suspect there is a typo in the frontmatter.
- When in doubt, copy the structure of an existing post and adjust it slowly.
