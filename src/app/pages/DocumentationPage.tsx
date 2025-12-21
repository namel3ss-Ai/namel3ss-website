import { Navigation } from "../components/Navigation";
import { DocumentationSection } from "../components/DocumentationSection";

export function DocumentationPage() {
  return (
    <div className="relative bg-white min-h-screen">
      <Navigation />
      <DocumentationSection />
    </div>
  );
}