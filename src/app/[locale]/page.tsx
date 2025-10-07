import HeroSection from "@/containers/Home/HeroSection/HeroSection";
import SomeArticleCategories from "@/containers/Home/SomeArticleCategories/SomeArticleCategories";
import { Params } from "@/types/types";

const HomePage = async ({ params: paramsPr }: { params: Promise<Params> }) => {
  const params = await paramsPr;

  return (
    <main>
      <HeroSection params={params} />
      <SomeArticleCategories params={params} />
    </main>
  );
};

export default HomePage;
