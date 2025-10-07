import { Button } from "@/components/UI/Button/Button";
import { Search } from "lucide-react";

const SearchButton = () => {
  return (
    <Button variant="ghost" size="icon">
      <Search className="h-5 w-5" />
    </Button>
  );
};

export default SearchButton;
