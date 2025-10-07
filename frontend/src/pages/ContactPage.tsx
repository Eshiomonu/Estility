import { usePageTitle } from "../hooks/usePageTitle";
import { PageTitle } from "../components/common/PageTitle";
import { useContact } from "../hooks/useContact";
import { CTAButton } from "../components/common/CTAButton"; 

export default function ContactPage() {
  const { data: pageTitle, loading: titleLoading, error: titleError } = usePageTitle("contact");
  const { data: contact, loading, error } = useContact();

  if (titleLoading || loading) return <div className="p-6 text-center">Loading...</div>;
  if (titleError || error) return <div className="p-6 text-center text-red-500">{titleError || error}</div>;

  if (!pageTitle || !contact) return <div className="p-6 text-center">No contact info found</div>;

  return (
    <>
      <PageTitle data={pageTitle} />

      <section className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-8 items-center">
        {/* Left: images */}
        <div className="grid grid-cols-2 gap-4">
          {contact.images.map((img) => (
            <img key={img.id} src={img.url} alt="Contact" className="rounded-xl shadow-md" />
          ))}
        </div>

        {/* Right: text + CTA + WhatsApp */}
        <div>
          <h2 className="text-2xl font-bold mb-4">{contact.title}</h2>
          <p className="text-gray-600 mb-6">{contact.description}</p>

          {/* WhatsApp card */}
          {contact.whatsapp_url && (
            <a
              href={contact.whatsapp_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-purple-600 text-white p-4 rounded-xl shadow-lg mb-6"
            >
              <i className="fab fa-whatsapp text-3xl"></i>
              <span className="font-medium">Chat with us on WhatsApp</span>
            </a>
          )}

          {/* CTA button */}
          {contact.cta_button.length > 0 && (
            <CTAButton {...contact.cta_button[0]} />
          )}

          {/* Social links */}
          <div className="flex gap-4 mt-6">
            {contact.social_links.map((s) => (
              <a key={s.id} href={s.url} target="_blank" rel="noopener noreferrer">
                {s.platform}
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
