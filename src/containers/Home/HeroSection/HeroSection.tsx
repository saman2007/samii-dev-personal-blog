import Link from "@/components/Link/Link";
import { Button } from "@/components/UI/Button/button";
import { ARTICLES_ROUTE, CONTACT_ME_ROUTE } from "@/data/staticRoutes";
import { getTranslations } from "@/lib/translation";
import { Params } from "@/types/types";
import { ArrowRight } from "lucide-react";
import Markdown from "react-markdown";

export interface HeroSectionProps {
  params: Params;
}

const HeroSection = async ({ params }: HeroSectionProps) => {
  const { t } = getTranslations(["home"], params);

  return (
    <section className="relative flex items-center justify-center px-4 py-16 md:py-24">
      <div className="absolute bg-gradient-to-b from-background via-muted/30 to-background -z-10" />
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green/10 text-green text-sm font-medium border border-green/20 shadow-md shadow-green/25">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green"></span>
          </span>
          {t("home.welcom_to_blog")}
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
          <Markdown
            components={{
              p: (props) => <>{props.children}</>,
              strong: (props) => (
                <span className="text-green">{props.children}</span>
              ),
            }}
          >
            {t("home.greetings")}
          </Markdown>
          <br />
          <span className="text-text-secondary text-xl lg:text-2xl">
            {t("home.you_can_call_me")}
          </span>
        </h1>
        <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed text-pretty">
          {t("home.about_me")}
          <span className="block mt-4 text-text-primary font-medium">
            {t("home.lets_learn_and_grow")}
          </span>
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Button asChild size="lg" className="group w-44">
            <Link href={ARTICLES_ROUTE}>
              {t("home.explore_articles")}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:ltr:translate-x-1 group-hover:rtl:-translate-x-1 rtl:rotate-180" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="w-44">
            <Link href={CONTACT_ME_ROUTE}>{t("home.get_in_touch")}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
