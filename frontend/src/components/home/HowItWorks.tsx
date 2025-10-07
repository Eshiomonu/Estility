import { useState } from "react";
import { useHowItWorks, HowItWorksButton, Step } from "../../hooks/home/useHowItWorks";
import { CTAButton } from "../common/CTAButton"; 

export default function HowItWorksSection() {
  const { data, loading, error } = useHowItWorks();
  const [activeButtonId, setActiveButtonId] = useState<number | null>(null);

  if (loading) return <p>Loading...</p>;
  if (error || !data) return <p>{error}</p>;

  const activeButton: HowItWorksButton | undefined = data.buttons.find(
    (b) => b.id === activeButtonId
  );

  return (
    <section className="py-16">
      <div className="container mx-auto text-center">
        {/* Title */}
        <h2 className="text-3xl font-bold mb-4">{data.title}</h2>
        <p className="text-gray-600 mb-6">{data.description}</p>

        {/* CTA Buttons */}
   <div className="flex justify-center gap-4 mb-8 flex-wrap">
  {data.cta.map((cta) => (
    <CTAButton
      key={cta.id}
      size="large"
      state="default"
      label={cta.label}
      url={cta.url}
      
    />
  ))}
</div>


        {/* Step Buttons */}
        <div className="flex justify-center gap-3 mb-8 flex-wrap">
          {data.buttons.map((button) => (
            <button
              key={button.id}
              onClick={() => setActiveButtonId(button.id)}
              className={`px-4 py-2 rounded-lg border transition ${
                activeButtonId === button.id
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-700 border-gray-300"
              }`}
            >
              {button.button_name}
            </button>
          ))}
        </div>

        {/* Steps */}
        {activeButton && activeButton.steps.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-8 relative">
            {activeButton.steps.map((step, index) => (
              <StepCard key={step.id} step={step} stepNumber={index + 1} isLast={index === activeButton.steps.length - 1} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// Reusable StepCard Component
interface StepCardProps {
  step: Step;
  stepNumber: number;
  isLast: boolean;
}

const StepCard: React.FC<StepCardProps> = ({ step, stepNumber, isLast }) => (
  <div className="relative flex flex-col items-center text-center p-4 bg-white rounded-xl shadow-md">
    {/* Step Number */}
    <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center mb-4 text-lg font-bold">
      {stepNumber}
    </div>

    {/* Step Content */}
    <h4 className="font-semibold mb-2">{step.step_title}</h4>
    <p className="text-sm text-gray-600 mb-4">{step.step_description}</p>
    {step.step_image && (
      <img
        src={step.step_image.url}
        alt={step.step_title}
        className="w-28 h-28 object-contain"
      />
    )}

    {/* Connector Line (Desktop only) */}
    {!isLast && (
      <div className="hidden md:block absolute top-6 right-[-50%] w-full border-t border-gray-300"></div>
    )}
  </div>
);
