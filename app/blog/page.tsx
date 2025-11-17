import Container from "@/components/container";
import PageTitle from "@/components/page-title";
import PostCard from "@/components/post-card";
import { getAllPosts } from "@/lib/content";

export const metadata = {
  title: "Blog",
  description: "Dive into every story, update, and tutorial we have published.",
  // Help search engines pick the correct page URL
  alternates: { canonical: "/blog" },
  openGraph: {
    type: "website",
    title: "Blog",
    description:
      "Dive into every story, update, and tutorial we have published.",
    url: "/blog",
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <Container>
      <PageTitle
        title="Blog"
        description="Dive into every story, update, and tutorial we have published."
      />

      <div className="mt-10 grid gap-10 md:grid-cols-2 lg:gap-10 xl:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} aspect="square" />
        ))}
      </div>
    </Container>
  );
}
