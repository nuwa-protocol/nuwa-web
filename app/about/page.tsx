import Image from "next/image";
import Link from "next/link";

import Container from "@/components/container";
import PageTitle from "@/components/page-title";
import { authors } from "@/lib/data/authors";

export const metadata = {
  title: "About",
  description: "We are a small passionate team.",
};

export default function AboutPage() {
  return (
    <Container>
      <PageTitle title="About" description="We are a small passionate team." />

      <div className="mx-auto mt-12 grid max-w-4xl gap-10 md:grid-cols-3">
        {authors.slice(0, 3).map((author) => (
          <div key={author.slug} className="group text-center">
            <div className="aspect-square w-full overflow-hidden rounded">
              <Image
                src={author.avatar}
                alt={author.name}
                width={580}
                height={580}
                className="h-full w-full rounded object-cover transition group-hover:-translate-y-1 group-hover:shadow-xl"
              />
            </div>
            <h3 className="mt-4 text-sm text-gray-500 dark:text-gray-300">
              {author.name}
            </h3>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-14 max-w-xl text-center">
        <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-400">
          We&apos;re a multi-cultural team from around the world! We come from
          diverse backgrounds, bringing different personalities, experiences and
          skills to the job. This is what makes our team so special.
        </p>
        <div className="mt-8">
          <Link
            href="/contact"
            className="inline-flex rounded-md bg-blue-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            Get in touch
          </Link>
        </div>
      </div>
    </Container>
  );
}
