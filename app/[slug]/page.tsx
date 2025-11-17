import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import Container from "@/components/container";
import Label from "@/components/ui/label";
import { getPostBySlug, getPostSlugs } from "@/lib/content";
import { authors } from "@/lib/data/authors";
import { categories } from "@/lib/data/categories";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

export async function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return {};
  }

  const url = new URL(params.slug, siteUrl);

  const imageUrl = post.coverImage
    ? new URL(post.coverImage, siteUrl).toString()
    : undefined;

  return {
    title: post.data.title,
    description: post.data.excerpt,
    alternates: {
      canonical: url.toString(),
    },
    openGraph: {
      type: "article",
      title: post.data.title,
      description: post.data.excerpt,
      url: url.toString(),
      publishedTime: post.data.publishDate,
      tags: post.data.tags,
      images: imageUrl ? [{ url: imageUrl, alt: post.data.title }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.data.title,
      description: post.data.excerpt,
      images: imageUrl ? [imageUrl] : undefined,
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const author = authors.find((item) => item.slug === post.data.author);
  const category = categories.find(
    (item) => item.slug === post.data.category
  );

  // Build JSON-LD for richer search results
  const canonicalUrl = new URL(params.slug, siteUrl).toString();
  const imageUrl = post.coverImage
    ? new URL(post.coverImage, siteUrl).toString()
    : undefined;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.data.title,
    description: post.data.excerpt,
    image: imageUrl ? [imageUrl] : undefined,
    datePublished: post.data.publishDate,
    dateModified: post.data.publishDate,
    author: author
      ? { "@type": "Person", name: author.name }
      : { "@type": "Person", name: post.data.author },
    mainEntityOfPage: { "@type": "WebPage", "@id": canonicalUrl },
    publisher: {
      "@type": "Organization",
      name: "Nuwa AI Team",
      logo: {
        "@type": "ImageObject",
        url: new URL("/logo/light.png", siteUrl).toString(),
      },
    },
  } as const;

  return (
    <>
      <script
        type="application/ld+json"
        // JSON-LD must be raw JSON in a script tag
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Container>
        <div className="mx-auto max-w-screen-md text-center">
          {category ? (
            <Label theme={category.color}>{category.title}</Label>
          ) : null}
          <h1 className="mt-2 mb-3 text-3xl font-semibold tracking-tight text-gray-900 dark:text-white lg:text-4xl lg:leading-snug">
            {post.data.title}
          </h1>

          <div className="mt-3 flex justify-center text-gray-500">
            {author ? (
              <div className=" flex flex-col gap-3">
                <p className="text-gray-500 dark:text-gray-400">{author.name}</p>
                <div className="flex items-center justify-center space-x-2 text-sm">
                  <time
                    className="text-gray-500 dark:text-gray-400"
                    dateTime={post.data.publishDate}
                  >
                    {post.formattedDate}
                  </time>
                  <span>
                    · {post.readingTimeMinutes}
                    {post.readingTimeMinutes === 1 ? " min" : " mins"} read
                  </span>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </Container>

      {post.coverImage ? (
        <div className="relative z-0 mx-auto aspect-video max-w-screen-lg overflow-hidden lg:rounded-lg">
          <Image
            src={post.coverImage}
            alt={post.data.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="h-full w-full object-cover"
          />
        </div>
      ) : null}

      <Container>
        <article className="mx-auto max-w-screen-md">
          <div className="prose prose-base mx-auto my-3 dark:prose-invert prose-a:text-blue-600">
            {/* eslint-disable-next-line react/no-danger */}
            <div dangerouslySetInnerHTML={{ __html: post.html }} />

            {post.data.tags && post.data.tags.length > 0 ? (
              <div className="mt-6 flex flex-wrap items-center gap-3">
                {post.data.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-sm text-gray-500 dark:text-gray-400"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            ) : null}
          </div>

          <div className="my-7 flex justify-center">
            <Link
              href="/"
              className="rounded-md bg-blue-50 px-5 py-3 text-sm text-blue-600 transition hover:bg-blue-100 dark:bg-gray-700 dark:text-white"
            >
              ← View all posts
            </Link>
          </div>

          {/* Author card removed per request */}
        </article>
      </Container>
    </>
  );
}
