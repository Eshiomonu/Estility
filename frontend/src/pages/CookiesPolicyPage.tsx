import { PageTitle } from "../components/common/PageTitle";
import { usePageTitle } from "../hooks/usePageTitle";
import { useCookiePolicy, CookieContentBlock } from "../hooks/useCookiePolicy";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import { PortableTextBlock } from "@portabletext/types";

// Convert privacy content to PortableText blocks
function formatPrivacyContent(blocks: CookieContentBlock[] | undefined): PortableTextBlock[] {
  if (!blocks) return [];

  return blocks
    .map((block): PortableTextBlock | null => {
      if (block.type === "heading") {
        return {
          _type: "block",
          style: `h${block.level ?? 1}`,
          children: block.children.map((child) => ({
            _type: "span",
            text: child.text,
            marks: [],
          })),
        };
      }

      if (block.type === "paragraph") {
        return {
          _type: "block",
          style: "normal",
          children: block.children.map((child) => ({
            _type: "span",
            text: child.text,
            marks: [],
          })),
        };
      }

      return null;
    })
    .filter((b): b is PortableTextBlock => b !== null);
}

// Tailwind-styled PortableText components
const components: PortableTextComponents = {
  block: {
    h1: ({ children }) => <h1 className="text-4xl font-extrabold mb-4">{children}</h1>,
    h2: ({ children }) => <h2 className="text-3xl font-bold mb-3">{children}</h2>,
    normal: ({ children }) => <p className="text-base mb-3">{children}</p>,
  },
};

export default function PrivacyPolicyPage() {
  const { data: titleData, loading: titleLoading, error: titleError } = usePageTitle("privacy-policy");
  const { data: contentData, loading: contentLoading, error: contentError } = useCookiePolicy();

  if (titleLoading || contentLoading) return <div className="p-6 text-center">Loading...</div>;
  if (titleError) return <div className="p-6 text-center text-red-500">{titleError}</div>;
  if (contentError) return <div className="p-6 text-center text-red-500">{contentError}</div>;
  if (!titleData) return <div className="p-6 text-center">No page title found</div>;

  const formattedContent = formatPrivacyContent(contentData?.content);

  return (
    <>
      <PageTitle data={titleData} />

      <section className="max-w-5xl mx-auto px-6 py-12 text-gray-900">
        <PortableText value={formattedContent} components={components} />
      </section>
    </>
  );
}
