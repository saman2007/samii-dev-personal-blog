import Link from "next/link";
import { NavigationItem } from "./NavigationBar";

export interface DesktopNavigationItemsProps {
  items: NavigationItem[];
}

const DesktopNavigationItems = ({ items }: DesktopNavigationItemsProps) => {
  return (
    <div className="hidden md:flex items-center gap-6">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="text-sm font-medium text-text-secondary hover:text-green transition-colors duration-200"
        >
          {item.text}
        </Link>
      ))}
    </div>
  );
};

export default DesktopNavigationItems;
