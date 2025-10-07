import { useEffect, useState } from "react";
import { getPosts, Post } from "../services/posts";
import { PageTitle } from "../components/common/PageTitle";
import { usePageTitle } from "../hooks/usePageTitle";

export default function BlogPage() {
  // Page title hook (fetches from Strapi page-titles collection)
  const { data: titleData, loading: titleLoading, error: titleError } =
    usePageTitle("blog");

  // Posts state
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);

  useEffect(() => {
    getPosts(page).then((res) => {
      setPosts(res.data);
      setPageCount(res.meta.pagination.pageCount);
    });
  }, [page]);

  if (titleLoading) return <div className="p-6 text-center">Loading title...</div>;
  if (titleError) return <div className="p-6 text-center text-red-500">{titleError}</div>;
  if (!titleData) return <div className="p-6 text-center">No page title found</div>;

  if (!posts.length) return <div className="text-center py-10">Loading posts...</div>;

  const [recent, ...others] = posts;

  return (
    <>
      {/* Dynamic Page Title */}
      <PageTitle data={titleData} />

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Recent Blog Post */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-6">Recent blog posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <img
                src={recent.coverImage?.url}
                alt={recent.title}
                className="rounded-xl w-full h-72 object-cover"
              />
              <div className="mt-4">
                <p className="text-sm text-gray-500">
                  {recent.author} • {new Date(recent.publishedAt).toDateString()}
                </p>
                <h3 className="text-2xl font-bold mt-2">{recent.title}</h3>
                <p className="text-gray-600 mt-1">{recent.excerpt}</p>
              </div>
            </div>
            <div className="flex flex-col gap-6">
              {others.slice(0, 2).map((post) => (
                <div key={post.id} className="flex gap-4">
                  <img
                    src={post.coverImage?.url}
                    alt={post.title}
                    className="w-32 h-24 rounded-lg object-cover"
                  />
                  <div>
                    <p className="text-sm text-gray-500">
                      {post.author} • {new Date(post.publishedAt).toDateString()}
                    </p>
                    <h4 className="font-semibold">{post.title}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* All Blog Posts */}
        <section>
          <h2 className="text-xl font-semibold mb-6">All blog posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {others.map((post) => (
              <div key={post.id}>
                <img
                  src={post.coverImage?.url}
                  alt={post.title}
                  className="rounded-xl w-full h-48 object-cover"
                />
                <div className="mt-3">
                  <p className="text-sm text-gray-500">
                    {post.author} • {new Date(post.publishedAt).toDateString()}
                  </p>
                  <h3 className="font-bold text-lg mt-1">{post.title}</h3>
                  <p className="text-gray-600 mt-1">{post.excerpt}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Pagination */}
        <div className="flex justify-center items-center mt-10 gap-2">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="px-3 py-1 rounded-md border disabled:opacity-50"
          >
            Prev
          </button>

          {Array.from({ length: pageCount }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-3 py-1 rounded-md border ${
                page === i + 1 ? "bg-gray-800 text-white" : ""
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => setPage((p) => Math.min(p + 1, pageCount))}
            disabled={page === pageCount}
            className="px-3 py-1 rounded-md border disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}
