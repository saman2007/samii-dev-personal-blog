import { Params } from "@/types/types";
import ArticleSection from "../ArticleSection/ArticleSection";
import { getTranslations } from "@/lib/translation";

export interface SomeArticleCategoriesProps {
  params: Params;
}

const SomeArticleCategories = ({ params }: SomeArticleCategoriesProps) => {
  const { t } = getTranslations(["common", "home"], params);

  // Mock data for articles
  const newestArticles = [
    {
      title: t("home.a1_title"),
      description: t("home.a1_description"),
      date: "2024-01-15",
      tags: [t("home.a1_tags_1"), t("home.a1_tags_2"), t("home.a1_tags_3")],
      slug: "getting-started-nextjs-15",
      coverImage: "/nextjs-development-coding.jpg",
    },
    {
      title: t("home.a2_title"),
      description: t("home.a2_description"),
      date: "2024-01-10",
      tags: [t("home.a2_tags_1"), t("home.a2_tags_2"), t("home.a2_tags_3")],
      slug: "building-scalable-apis-nodejs",
      coverImage: "/api-development-server-code.jpg",
    },
    {
      title: t("home.a3_title"),
      description: t("home.a3_description"),
      date: "2024-01-05",
      tags: [t("home.a3_tags_1"), t("home.a3_tags_2"), t("home.a3_tags_3")],
      slug: "mastering-typescript-generics",
      coverImage: "/typescript-code.png",
    },
  ];

  const webDevelopmentArticles = [
    {
      title: t("home.a4_title"),
      description: t("home.a4_description"),
      date: "2023-12-28",
      tags: [t("home.a4_tags_1"), t("home.a4_tags_2"), t("home.a4_tags_3")],
      slug: "css-grid-vs-flexbox",
      coverImage: "/css-layout-design-web.jpg",
    },
    {
      title: t("home.a5_title"),
      description: t("home.a5_description"),
      date: "2023-12-20",
      tags: [t("home.a5_tags_1"), t("home.a5_tags_2"), t("home.a5_tags_3")],
      slug: "optimizing-react-performance",
      coverImage: "/react-performance-optimization.png",
    },
    {
      title: t("home.a6_title"),
      description: t("home.a6_description"),
      date: "2023-12-15",
      tags: [t("home.a6_tags_1"), t("home.a6_tags_2"), t("home.a6_tags_3")],
      slug: "modern-authentication-patterns",
      coverImage: "/security-authentication-lock.jpg",
    },
  ];

  const tutorialsArticles = [
    {
      title: t("home.a7_title"),
      description: t("home.a7_description"),
      date: "2023-12-10",
      tags: [t("home.a7_tags_1"), t("home.a7_tags_2"), t("home.a7_tags_3")],
      slug: "building-realtime-chat-app",
      coverImage: "/chat-application-messaging.jpg",
    },
    {
      title: t("home.a8_title"),
      description: t("home.a8_description"),
      date: "2023-12-05",
      tags: [t("home.a8_tags_1"), t("home.a8_tags_2"), t("home.a8_tags_3")],
      slug: "docker-for-beginners",
      coverImage: "/docker-containers-deployment.png",
    },
    {
      title: t("home.a9_title"),
      description: t("home.a9_description"),
      date: "2023-11-30",
      tags: [t("home.a9_tags_1"), t("home.a9_tags_2"), t("home.a9_tags_3")],
      slug: "introduction-to-graphql",
      coverImage: "/graphql-api-data.jpg",
    },
  ];

  return (
    <>
      <ArticleSection
        title={t("home.section_title_newest")}
        articles={newestArticles}
        params={params}
      />
      <ArticleSection
        title={t("home.section_title_web_development")}
        articles={webDevelopmentArticles}
        params={params}
      />
      <ArticleSection
        title={t("home.section_title_tutorials")}
        articles={tutorialsArticles}
        params={params}
      />
    </>
  );
};

export default SomeArticleCategories;
