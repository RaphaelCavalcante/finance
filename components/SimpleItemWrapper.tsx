import { Item, ItemActions, ItemContent, ItemHeader, ItemTitle } from "./ui/item";

type ItemComponent = {
  header: string;
  content: String;
  media: any;
  actionGroup: any;
};
export default function ListItemWrapper({
  header,
  content,
  media,
  actionGroup,
  ...props
}: ItemComponent) {
  return (
    <Item variant={"outline"}>
      <ItemHeader>{header}</ItemHeader>
      {media}
      <ItemContent>
        <ItemTitle>{content}</ItemTitle>
      </ItemContent>
      <ItemActions>{actionGroup}</ItemActions>
    </Item>
  );
}
