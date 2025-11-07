import { notFound } from "next/navigation";
import Container from "@/components/container";
import PageTitle from "@/components/page-title";
import PostCard from "@/components/post-card";
import { getAllPosts } from "@/lib/content";
import { categories } from "@/lib/data/categories";

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const category = categories.find((cat) => cat.slug === params.slug);

  if (!category) {
    return {
      title: "Category Not Found",
    };
  }

  return {
    title: `${category.title} Posts`,
    description: `Browse all posts in the ${category.title} category.`,
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = categories.find((cat) => cat.slug === params.slug);

  if (!category) {
    notFound();
  }

  const posts = getAllPosts().filter(
    (post) => post.data.category === params.slug
  );

  return (
    <Container>
      <PageTitle
        title={`${category.title} Posts`}
        description={`Browse all posts in the ${category.title} category.`}
      />

      {posts.length === 0 ? (
        <div className="mt-10 text-center text-gray-500 dark:text-gray-400">
          No posts found in this category yet.
        </div>
      ) : (
        <div className="mt-10 grid gap-10 md:grid-cols-2 lg:gap-10 xl:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} aspect="square" />
          ))}
        </div>
      )}
    </Container>
  );
}

