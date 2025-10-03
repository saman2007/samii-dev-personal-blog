import Link from "@/components/Link/Link";
import { Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export interface ArticleCardProps {
  title: string;
  description: string;
  date: string;
  tags: string[];
  slug: string;
  coverImage: string;
}

const ArticleCard = ({
  title,
  description,
  date,
  tags,
  slug,
  coverImage,
}: ArticleCardProps) => {
  return (
    <Link href={`/articles/${slug}`} className="group block">
      <div className="overflow-hidden rounded-lg border border-border bg-block transition-all hover:shadow-lg hover:border-green/50 h-full flex flex-col">
        <div className="relative w-full h-48 overflow-hidden bg-background">
          <Image
            src={coverImage || "/placeholder.svg"}
            alt={title}
            fill
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        <div className="flex flex-col flex-1 p-6">
          <div className="flex flex-wrap gap-2 mb-3">
            {tags.map((tag) => (
              <Badge key={tag} variant="primary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          <h3 className="text-xl font-semibold line-clamp-2 mb-2 group-hover:text-green transition-colors">
            {title}
          </h3>

          <p className="text-sm text-text-secondary line-clamp-2 mb-4 flex-1">
            {description}
          </p>

          <div className="flex items-center gap-2 text-sm text-text-secondary mt-auto">
            <Calendar className="h-4 w-4" />
            <time dateTime={date}>
              {new Date(date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;
