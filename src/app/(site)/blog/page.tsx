import { BlogHero } from "@/components/blog/BlogHero";
import { TopicCategories } from "@/components/blog/TopicCategories";
import { FeaturedArticle } from "@/components/blog/FeaturedArticle";
import { ArticleCard } from "@/components/blog/ArticleCard";
import { BlogSidebar } from "@/components/blog/BlogSidebar";
import { BlogNewsletterBanner } from "@/components/blog/BlogNewsletterBanner";
import { getBlogPosts } from "@/lib/blog";

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const posts = await getBlogPosts();
  const featuredPost = posts.find((post) => post.featured);
  const latestArticles = posts.filter((post) => post.slug !== featuredPost?.slug).slice(0, 4);

  return (
    <main>
      <BlogHero />
      <TopicCategories />
      {featuredPost && <FeaturedArticle post={featuredPost} />}

      <section id="latest-articles" className="bg-brand-light py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-[2fr_1fr] lg:px-8">
          <div>
            <h2 className="font-display text-2xl font-semibold text-brand-blue sm:text-3xl">
              Latest Articles
            </h2>
            {latestArticles.length === 0 ? (
              <p className="mt-8 text-sm text-brand-muted">
                No articles published yet — check back soon.
              </p>
            ) : (
              <div className="mt-8 space-y-6">
                {latestArticles.map((post) => (
                  <ArticleCard
                    key={post.slug}
                    slug={post.slug}
                    image={post.image}
                    category={post.category}
                    title={post.title}
                    excerpt={post.excerpt}
                    date={post.date}
                    readTime={post.readTime}
                  />
                ))}
              </div>
            )}
          </div>

          <BlogSidebar />
        </div>
      </section>

      <BlogNewsletterBanner />
    </main>
  );
}
