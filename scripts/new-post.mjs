#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import readline from 'node:readline';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const postsDir = path.join(rootDir, 'content', 'posts');
const templateDir = path.join(postsDir, '_template');

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(query) {
  return new Promise((resolve) => rl.question(query, resolve));
}

function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function formatDate(date) {
  return date.toISOString();
}

async function main() {
  console.log('\n📝 Create a New Blog Post\n');

  // Get post title
  const title = await question('Post title: ');
  if (!title.trim()) {
    console.error('❌ Title is required');
    process.exit(1);
  }

  // Generate slug
  const defaultSlug = slugify(title);
  const slugAnswer = await question(`Post slug (${defaultSlug}): `);
  const slug = slugAnswer.trim() || defaultSlug;

  // Validate slug
  if (!/^[a-z0-9-]+$/.test(slug)) {
    console.error('❌ Slug must contain only lowercase letters, numbers, and hyphens');
    process.exit(1);
  }

  // Check if post already exists
  const postDir = path.join(postsDir, slug);
  if (fs.existsSync(postDir)) {
    console.error(`❌ Post "${slug}" already exists`);
    process.exit(1);
  }

  // Get excerpt
  const excerpt = await question('Brief excerpt: ');

  // Get category
  console.log('\nAvailable categories:');
  console.log('  - tech (Blue)');
  console.log('  - product (Green)');
  console.log('  - insights (Orange)');
  console.log('  - branding (Purple)');
  console.log('  - milestone (Pink)');
  const category = await question('Category (tech): ');
  const selectedCategory = category.trim() || 'tech';

  // Get author
  console.log('\nAvailable authors:');
  console.log('  - arpit');
  console.log('  - haichao');
  console.log('  - sarah');
  console.log('  - summer');
  console.log('  - jolestar-wang');
  const author = await question('Author slug (jolestar-wang): ');
  const selectedAuthor = author.trim() || 'jolestar-wang';

  // Get tags
  const tagsInput = await question('Tags (comma-separated): ');
  const tags = tagsInput
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean);

  rl.close();

  // Create post directory
  fs.mkdirSync(postDir, { recursive: true });

  // Read template
  const templatePath = path.join(templateDir, 'index.md');
  let template = fs.readFileSync(templatePath, 'utf8');

  // Replace template variables
  const now = formatDate(new Date());
  const tagsYaml = tags.length > 0 ? `[${tags.map((tag) => `"${tag}"`).join(', ')}]` : '[]';

  template = template
    .replace('Your Article Title Goes Here', title)
    .replace(
      'A brief summary of your article (1-2 sentences). This will appear in article previews and meta descriptions.',
      excerpt || 'Add a compelling excerpt here'
    )
    .replace('2025-01-01T00:00:00.000Z', now)
    .replace('category: "tech"', `category: "${selectedCategory}"`)
    .replace('author: "your-author-slug"', `author: "${selectedAuthor}"`)
    .replace('tags: ["tag1", "tag2", "tag3"]', `tags: ${tagsYaml}`);

  // Write index.md
  fs.writeFileSync(path.join(postDir, 'index.md'), template);

  // Copy placeholder image
  const placeholderSrc = path.join(templateDir, 'cover-image.webp');
  const placeholderDest = path.join(postDir, 'cover-image.webp');
  if (fs.existsSync(placeholderSrc)) {
    fs.copyFileSync(placeholderSrc, placeholderDest);
  }

  console.log('\n✅ Post created successfully!\n');
  console.log(`📁 Location: content/posts/${slug}/`);
  console.log(`📝 Edit: content/posts/${slug}/index.md`);
  console.log(`🖼️  Add cover image: content/posts/${slug}/cover-image.webp`);
  console.log(`\n🔗 Preview at: http://localhost:3000/${slug}\n`);
  console.log('💡 Remember to:');
  console.log('   1. Replace the cover image');
  console.log('   2. Write your content');
  console.log('   3. Set draft: false when ready to publish\n');
}

main().catch((error) => {
  console.error('Error:', error);
  process.exit(1);
});

