import ArticleCard, {
  ArticleCardProps,
} from "@/components/ArticleCard/ArticleCard";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ARTICLES_ROUTE } from "@/data/staticRoutes";
import { Params } from "@/types/types";
import { getTranslations } from "@/lib/translation";

export interface ArticleSectionProps {
  title: string;
  articles: ArticleCardProps[];
  params: Params;
}

const ArticleSection = ({ title, articles, params }: ArticleSectionProps) => {
  const { t } = getTranslations(["common"], params);

  return (
    <section className="py-16 px-4 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-balance">
            {title}
          </h2>
          <Link
            href={`${ARTICLES_ROUTE}/${title.toLowerCase()}`}
            className="flex items-center gap-2 text-green hover:text-dark-green transition-colors group"
          >
            <span className="text-sm font-medium">{t("common.view_more")}</span>
            <ArrowRight className="rtl:rotate-180 rtl:group-hover:-translate-x-1 w-4 h-4 ltr:group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <ArticleCard key={article.slug} {...article} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArticleSection;
