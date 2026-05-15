import BecomeHostHero from "../../sections/BecomeHostPageSections/BecomeHostHero";
import CtaSection from "../../sections/BecomeHostPageSections/CtaSection";
import HostStepsSection from "../../sections/BecomeHostPageSections/HostStepsSection";
import WhyHostSection from "../../sections/BecomeHostPageSections/WhyHostSection";

export default function BecomeHostPage() {
  return (
    <main className="space-y-20 md:space-y-28">
      <BecomeHostHero />
      <WhyHostSection />
      <HostStepsSection />
      <CtaSection />
    </main>
  );
}
