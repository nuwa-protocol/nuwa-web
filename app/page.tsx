import Container from "@/components/container";
import PostCard from "@/components/post-card";
import { getAllPosts } from "@/lib/content";
import Link from "next/link";

export const metadata = {
  title: "Home",
  description:
    "Welcome to Stablo, a minimal blog built with Next.js and Markdown.",
};

export default function HomePage() {
  const posts = getAllPosts();
  const latestPosts = posts.slice(0, 3);
  const highlights = [
    "Research-backed case studies on product and systems design.",
    "Practical notes on scaling engineering teams with clarity.",
    "Open journaling about wins, missteps, and everything between.",
  ];

  return (
    <Container>
      <section className="grid gap-10 py-20 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-500">
            Fresh perspectives for curious minds
          </p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight text-gray-900 dark:text-white md:text-5xl">
            Build calm, thoughtful products and share the journey.
          </h1>
          <p className="mt-6 text-lg text-gray-600 dark:text-gray-300">
            Nuwa chronicles experiments in design systems, developer tools, and
            the teams behind them. Learn with us as we ship, reflect, and refine
            in public.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/blog"
              className="rounded-full bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
            >
              Read the blog
            </Link>
            <Link
              href="/about"
              className="rounded-full border border-gray-200 px-6 py-3 text-sm font-semibold text-gray-700 transition hover:border-gray-900 hover:text-gray-900 dark:border-gray-700 dark:text-gray-200 dark:hover:border-white dark:hover:text-white"
            >
              Meet the team
            </Link>
          </div>
        </div>

        <div className="rounded-3xl border border-gray-100 bg-gray-50 p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900/40">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-500">
            What to expect
          </p>
          <ul className="mt-6 space-y-4 text-base text-gray-700 dark:text-gray-300">
            {highlights.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span
                  className="mt-2 inline-block h-2 w-2 rounded-full bg-blue-500"
                  aria-hidden="true"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-12">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-500">
              Latest from the blog
            </p>
            <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">
              Recent writing
            </h2>
          </div>
          <Link
            href="/blog"
            className="text-sm font-semibold text-gray-900 underline-offset-4 hover:underline dark:text-gray-50"
          >
            View all posts
          </Link>
        </div>

        {latestPosts.length ? (
          <div className="mt-8 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {latestPosts.map((post, index) => (
              <PostCard
                key={post.slug}
                post={post}
                aspect={index === 0 ? "landscape" : "square"}
                preloadImage={index === 0}
              />
            ))}
          </div>
        ) : (
          <p className="mt-8 text-gray-600 dark:text-gray-300">
            No posts just yet. Check back soon!
          </p>
        )}
      </section>
    </Container>
  );
}
