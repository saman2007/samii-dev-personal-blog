import HeroSection from "@/containers/Home/HeroSection/HeroSection";
import { Params } from "@/types/types";

export default function Home({ params }: { params: Promise<Params> }) {
  return (
    <main>
      <HeroSection params={params} />
    </main>
  );
}
