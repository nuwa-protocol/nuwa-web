import type { Author } from "@/lib/data/authors";

interface AuthorCardProps {
  author: Author;
}

export default function AuthorCard({ author }: AuthorCardProps) {
  return (
    <div className="mt-3 rounded-2xl bg-gray-50 px-8 py-8 text-gray-500 dark:bg-gray-900 dark:text-gray-400">
      <div className="flex flex-wrap items-start sm:flex-nowrap">
        <div>
          <p className="text-lg font-medium text-gray-800 dark:text-gray-300">
            About {author.name}
          </p>
          <p className="mt-3">{author.bio}</p>
        </div>
      </div>
    </div>
  );
}
