# 📝 Blog Posts Guide

This directory contains all blog posts for the website. Each post is a separate folder with its own `index.md` file and assets.

## 🚀 Quick Start: Creating a New Post

### Step 1: Copy the Template

```bash
# From the project root
cp -r content/posts/_template content/posts/your-post-slug
```

**Important:** Use a URL-friendly slug (lowercase, hyphens, no spaces)
- ✅ Good: `my-awesome-post`, `how-to-build-agents`
- ❌ Bad: `My Awesome Post`, `how_to_build_agents`, `article 1`

### Step 2: Edit the Frontmatter

Open `content/posts/your-post-slug/index.md` and update the metadata at the top:

```yaml
---
title: "Your Engaging Article Title"
excerpt: "A compelling one-line summary of your post"
publishDate: "2025-11-06T00:00:00.000Z"
image: "./cover-image.webp"
category: "tech"
author: "your-author-slug"
tags: ["ai", "blockchain", "tutorial"]
draft: true
---
```

#### Required Fields

- **`title`**: The main title of your article
- **`excerpt`**: Brief summary (shown in previews, SEO descriptions)
- **`publishDate`**: ISO 8601 format date (use current date/time)
- **`category`**: Must match one of the available categories (see below)
- **`author`**: Must match an author slug (see below)

#### Optional Fields

- **`image`**: Path to cover image (relative to post folder)
- **`tags`**: Array of relevant keywords
- **`draft`**: Set to `true` to hide from production, `false` to publish

### Step 3: Add Your Cover Image

1. Place your cover image in the post folder
2. Recommended: WebP format for best performance
3. Update the `image` field in frontmatter to match the filename

```yaml
image: "./my-cover-image.webp"
```

### Step 4: Write Your Content

Use Markdown format (supports GitHub Flavored Markdown):

- **Headings**: `##`, `###`, `####`
- **Bold**: `**text**`
- **Italic**: `*text*`
- **Code**: `` `inline` `` or triple backticks for blocks
- **Links**: `[text](url)`
- **Images**: `![alt](./image.webp)`
- **Lists**: `-` or `1.` for bullet/numbered lists
- **Blockquotes**: `> quote`

### Step 5: Preview Locally

```bash
pnpm dev
```

Visit `http://localhost:3000/your-post-slug` to see your post.

### Step 6: Publish

When ready to publish:
1. Set `draft: false` in frontmatter
2. Verify the `publishDate` is correct
3. Commit and push your changes
4. Run `pnpm build` to generate static pages

---

## 🎨 Content Best Practices

### Writing Tips

1. **Hook readers early**: Start with a compelling question or problem
2. **Use clear structure**: Break content into logical sections
3. **Keep paragraphs short**: 3-5 sentences max
4. **Add examples**: Code snippets, images, real-world scenarios
5. **Include visuals**: Screenshots, diagrams, or illustrations
6. **End with action**: Call-to-action or key takeaway

### SEO Optimization

- Write descriptive titles (50-60 characters)
- Craft compelling excerpts (120-160 characters)
- Use relevant tags (3-5 tags per post)
- Include alt text for images
- Add internal/external links where relevant

### Technical Considerations

- **Image formats**: Prefer WebP for best compression
- **Image size**: Aim for < 500KB per image
- **Code blocks**: Always specify the language for syntax highlighting
- **Links**: Use HTTPS links; check for broken links before publishing

---

## 📁 Folder Structure

```
content/posts/
├── _template/                    # Template for new posts
│   ├── index.md
│   └── cover-image.webp
├── your-post-slug/               # Your actual post
│   ├── index.md                  # Post content and metadata
│   ├── cover-image.webp          # Cover image
│   └── diagram.png               # Other images used in post
└── README.md                     # This file
```

### How It Works

1. **During development**: Content is read from `content/posts/`
2. **During build**: 
   - Markdown is converted to HTML
   - Images are copied to `public/posts/`
   - Static pages are generated for each post
3. **In production**: Only the generated HTML and public images are served

---

## 🔧 Troubleshooting

### Post not showing up?

- ✅ Check `draft` is set to `false`
- ✅ Verify folder name matches URL slug
- ✅ Ensure `index.md` exists in the post folder
- ✅ Restart dev server after creating new posts

### Images not displaying?

- ✅ Check image path is relative (`./image.webp`)
- ✅ Verify image file exists in post folder
- ✅ Ensure `image` field in frontmatter matches filename
- ✅ Run `pnpm build` to copy images to public folder

### Build errors?

- ✅ Validate frontmatter YAML syntax (colons, quotes, dashes)
- ✅ Check category and author slugs are valid
- ✅ Ensure `publishDate` is in ISO 8601 format
- ✅ Look for Markdown syntax errors

### Author or category not found?

- ✅ Add new authors to `/lib/data/authors.ts`
- ✅ Add new categories to `/lib/data/categories.ts`
- ✅ Restart dev server after making changes

---

## 🤝 Contributing

Questions or suggestions for improving the blog system? Open an issue or reach out to the team!

Happy writing! ✍️

