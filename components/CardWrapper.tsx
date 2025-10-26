import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "./ui/card";

interface CardProps {
  headerLabel?: string;
  showButtons: boolean;
  children: React.ReactNode;
}
function CardWrapper({ headerLabel, showButtons, children }: CardProps) {
  return (
    <Card className="flex w-full">
      <CardHeader>
        <CardTitle className="w-full">
          <div className="flex justify-center"> {headerLabel} </div>
        </CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
export default CardWrapper;
