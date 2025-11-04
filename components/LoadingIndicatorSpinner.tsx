import { LoaderIcon, SplinePointerIcon } from "lucide-react";
import { Item, ItemContent, ItemMedia, ItemTitle } from "./ui/item";
import { Spinner } from "./ui/spinner";

interface LoadingIndicatorProps {
  text?: string;
  type: string;
  style?: string;
}
function LoadingIndicator({
  text = "",
  type = "spinner",
  style = "size-6 text-blue-500",
}: LoadingIndicatorProps) {
  return (
    <div className="flex w-full max-w-xs flex-col gap-4 [--radius:1rem]">
      <Item>
        <ItemMedia>
          <Spinner className={`${style}`} />
        </ItemMedia>
        <ItemContent>
          <ItemTitle className="line-clamp-1 text-2xl font-serif">{text}</ItemTitle>
        </ItemContent>
      </Item>
    </div>
  );
}
export default LoadingIndicator;
