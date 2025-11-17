import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

import type { PostSummary } from "@/lib/content";
import { authors } from "@/lib/data/authors";
import { categories } from "@/lib/data/categories";
import Label from "@/components/ui/label";

interface PostCardProps {
  post: PostSummary;
  aspect?: "landscape" | "square";
  preloadImage?: boolean;
}

export default function PostCard({
  post,
  aspect = "square",
  preloadImage = false,
}: PostCardProps) {
  const author = authors.find((item) => item.slug === post.data.author);
  const category = categories.find((item) => item.slug === post.data.category);

  return (
    <div className="group cursor-pointer">
      <div
        className={clsx(
          "relative overflow-hidden rounded-md bg-gray-100 transition-all dark:bg-gray-800 hover:scale-105",
          aspect === "landscape" ? "aspect-video" : "aspect-square"
        )}
      >
        {post.coverImage ? (
          <Link href={`/${post.slug}`}>
            <Image
              src={post.coverImage}
              alt={post.data.title}
              fill
              priority={preloadImage}
              sizes="(max-width: 640px) 90vw, 480px"
              className="h-full w-full rounded-md object-cover"
            />
          </Link>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-gray-200">
            <svg
              className="h-16 w-16 text-gray-300 dark:text-gray-600"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Zm0 2v14h14V5H5Zm2 10 2.5-3.01 1.96 2.36 2.54-3.39L17 15H7Zm2-7a1 1 0 1 1-2.001.001A1 1 0 0 1 9 8Z" />
            </svg>
          </div>
        )}
      </div>

      {category ? (
        <Link href={`/category/${category.slug}`} aria-label={category.title}>
          <Label theme={category.color}>{category.title}</Label>
        </Link>
      ) : null}

      <h2 className="mt-2 text-lg font-semibold tracking-normal text-gray-900 dark:text-white">
        <Link href={`/${post.slug}`}>
          <span className="bg-gradient-to-r from-green-200 to-green-100 bg-left-bottom bg-no-repeat text-gray-900 transition-[background-size] duration-500 dark:from-purple-800 dark:to-purple-900 dark:text-white group-hover:bg-[length:100%_10px] hover:bg-[length:100%_3px] bg-[length:0px_10px]">
            {post.data.title}
          </span>
        </Link>
      </h2>

      {post.data.excerpt ? (
        <p className="mt-2 line-clamp-3 text-sm text-gray-500 dark:text-gray-400">
          {post.data.excerpt}
        </p>
      ) : null}

      <div className="mt-3 flex items-center space-x-3 text-gray-500 dark:text-gray-400">
        {author ? <span className="text-sm font-medium">{author.name}</span> : null}
        <span className="text-xs text-gray-300 dark:text-gray-600">
          &bull;
        </span>
        <time className="text-sm" dateTime={post.data.publishDate}>
          {post.formattedDate}
        </time>
      </div>
    </div>
  );
}
