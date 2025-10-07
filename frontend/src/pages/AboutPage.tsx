import { usePageTitle } from "../hooks/usePageTitle";
import { PageTitle } from "../components/common/PageTitle";
import { useAbout } from "../hooks/useAbout";
import { CTAButton } from "../components/common/CTAButton";

const API_URL = "http://localhost:1337"; // move to .env in production

export default function AboutPage() {
  const { data: titleData, loading: titleLoading, error: titleError } =
    usePageTitle("about");
  const { data: aboutData, loading, error } = useAbout();

  if (titleLoading || loading) return <div className="p-6 text-center">Loading...</div>;
  if (titleError || error)
    return <div className="p-6 text-center text-red-500">{titleError || error}</div>;
  if (!titleData || !aboutData)
    return <div className="p-6 text-center">No about info found</div>;

  // pick CTA if available
  const cta = aboutData.cta_button?.[0];

  return (
    <>
      <PageTitle data={titleData} />

      <section className="max-w-7xl mx-auto px-6 py-12 space-y-10">
        {/* Mission */}
        <div className="bg-green-50 p-6 rounded-xl flex flex-col md:flex-row md:items-center md:justify-between">
          <h3 className="text-xl font-semibold text-green-900 md:w-1/3">
            {aboutData.mission_title}
          </h3>
          <p className="text-gray-700 md:w-2/3">{aboutData.mission_description}</p>
        </div>

        {/* Vision */}
        <div className="bg-purple-50 p-6 rounded-xl flex flex-col md:flex-row md:items-center md:justify-between">
          <h3 className="text-xl font-semibold text-purple-900 md:w-1/3">
            {aboutData.vision_title}
          </h3>
          <p className="text-gray-700 md:w-2/3">{aboutData.vision_description}</p>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Image */}
          <img
            src={`${API_URL}${aboutData.story_image?.formats?.medium?.url || aboutData.story_image?.url}`}
            alt={aboutData.story_title}
            className="w-full rounded-2xl object-cover"
          />

          {/* Content */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900">{aboutData.story_title}</h3>
            <p className="text-gray-600">{aboutData.story_description}</p>

            {/* CTA */}
            {cta && (
              <CTAButton
                label={cta.label}
                url={cta.url}
                type={cta.variant}
                size="large"
                state="default"
              />
            )}
          </div>
        </div>
      </section>
    </>
  );
}
