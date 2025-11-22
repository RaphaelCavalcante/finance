"use client";
import BreadCrumb from "@/components/Breadcrumb";
import ListItemWrapper from "@/components/SimpleItemWrapper";
import { Button } from "@/components/ui/button";
import { IdCardIcon, PlusIcon } from "lucide-react";
import CardFormDialog from "./_components/CardForm";
import { useEffect, useMemo, useState, useTransition } from "react";
import withAuth from "@/lib/withAuth";
import { useList } from "@uidotdev/usehooks";
import { CardRegistrySchema } from "@/schemas";
import * as z from "zod";
import { Spinner } from "@/components/ui/spinner";
import { AlertWrapper } from "@/components/AlertWrapper";
import { toast, ToastContainer } from "react-toastify";

const cardsSample = [
  {
    header: "card_title 1",
    content: "card_content 1",
    media: IdCardIcon,
  },
  {
    header: "card_title 2",
    content: "card_content 2",
    media: IdCardIcon,
  },
  {
    header: "card_title 3",
    content: "card_content 3",
    media: IdCardIcon,
  },
  {
    header: "card_title 3",
    content: "card_content 3",
    media: IdCardIcon,
  },
];
interface fetchResponse {
  error: boolean;
  success: boolean;
  data: any;
}
function CardsPage() {
  const [openDialog, setOpenDialog] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [cardList, { set, removeAt }] = useList<
    z.infer<typeof CardRegistrySchema>
  >([]);
  const [selectedCard, setSelectedCard] = useState(null);

  function refreshContent() {
    startTransition(() => {
      fetch("/api/card/?method=listAll")
        .then(async (data) => {
          const result: any = await data.json();
          if (result.error) {
            throw Error("500 - internal server error");
          } else if (result.success) {
            set(result.data);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    });
  }

  useEffect(() => {
    if (!openDialog) {
      refreshContent();
    }
  }, [openDialog]);

  const renderActionButton = (card: any) => {
    const onEdit = (card: any) => {
      setSelectedCard(card);
      setOpenDialog((prev) => !prev);
    };
    const onDelete = (card: any) => {
      startTransition(() => {
        const headerOptions = {
          method: "DELETE",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(card),
        };
        fetch("/api/card", headerOptions)
          .then(async (data: any) => {
            const result = await data.json();
            console.log(result)
            if (result.success) {
              toast("Card deleted");
            } else if (result.error) {
              toast(result.message);
            }
            refreshContent();
          })
          .catch((e) => {
            console.log(e);
          });
      });
    };
    return (
      <div className="flex flex-row gap-2">
        <Button className="cursor-pointer" onClick={() => onEdit(card)}>
          Edit
        </Button>
        <AlertWrapper
          alertTitle={"Delete Card"}
          message={"This cannot be undone, procceed?"}
          triggerLabel={"Delete"}
          onConfirm={() => onDelete(card)}
        />
      </div>
    );
  };
  return (
    <div className="flex flex-col w-full h-full border rounded-2xl">
      <div className="flex flex-row w-full justify-around">
        <div className="flex flex-col p-4">
          <h1 className="text-5xl">Card List</h1>
          <BreadCrumb />
        </div>

        <div className="flex flex-row mt-auto mb-auto">
          <CardFormDialog
            open={openDialog}
            openCb={setOpenDialog}
            cardData={selectedCard}
          />
        </div>
      </div>

      <div className="flex flex-row ml-auto mr-auto mb-auto w-1/2 overflow-y-auto">
        <div className="flex flex-col w-full space-y-4">
          {isPending ? (
            <div className="flex m-auto w-full h-full">
              <div className="flex flex-col">
                <span>Loading Card List</span>
                <Spinner />
              </div>
            </div>
          ) : cardList.length > 0 ? (
            cardList.map((item, index) => (
              <ListItemWrapper
                key={`card-item-${index}`}
                header={`${item?.name}`}
                content={`Limit date: ${item?.duedate}`}
                media={<IdCardIcon />}
                actionGroup={renderActionButton(item)}
              />
            ))
          ) : (
            <div className="flex m-auto h-full w-full">Empty List.</div>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
export default withAuth(CardsPage);
