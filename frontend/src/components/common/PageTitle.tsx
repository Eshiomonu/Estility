import { PageTitleData } from "../../hooks/usePageTitle";

interface PageTitleProps {
  data: PageTitleData;
  backgroundColor?: string; 
}

export const PageTitle = ({
  data,
  backgroundColor = "bg-[#1D0B32]", 
}: PageTitleProps) => {
  return (
    <section
      className={`${backgroundColor} w-full flex flex-col items-center justify-center py-[63px] px-[80px] gap-[16px]`}
      style={{ minHeight: "179px", opacity: 1 }}
    >
      {/* Title */}
      <h1
        className="text-center text-white"
        style={{
          fontFamily: "Inter, sans-serif",
          fontWeight: 800,
          fontSize: "60px",
          lineHeight: "99px",
          letterSpacing: "-0.04em",
        }}
      >
        {data.title}
      </h1>

      {/* Description */}
      {data.description && (
        <p
          className="text-center text-white max-w-[1280px]"
          style={{
            fontFamily: "Sora, sans-serif",
            fontWeight: 400,
            fontSize: "18px",
            lineHeight: "32px",
            letterSpacing: "0em",
          }}
        >
          {data.description}
        </p>
      )}
    </section>
  );
};
