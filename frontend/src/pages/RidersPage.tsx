import { usePageTitle } from "../hooks/usePageTitle";
import { PageTitle } from "../components/common/PageTitle";

export default function PartnerPage() {
  const { data, loading, error } = usePageTitle("rider");

  if (loading) return <div className="p-6 text-center">Loading...</div>;
  if (error) return <div className="p-6 text-center text-red-500">{error}</div>;
  if (!data) return <div className="p-6 text-center">No page title found</div>;

  return (
    <>
      <PageTitle data={data} />

      {/* Additional About content */}
      <section className="max-w-7xl mx-auto px-6 py-12">
      
      </section>
    </>
  );
}
