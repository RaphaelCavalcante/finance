"use client";
import FormError from "@/components/FormError";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { CardRegistrySchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogClose } from "@radix-ui/react-dialog";
import { PlusIcon } from "lucide-react";
import { useEffect, useMemo, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

function CardFormDialog({ open, openCb, cardData }: any) {
  const [isPending, startTransition] = useTransition();
  const [triggerOpen, setTrigger] = useState(false);

  useEffect(() => {
    if (openCb) {
      openCb(triggerOpen);
    }
  }, [triggerOpen]);
  const form = useForm<z.infer<typeof CardRegistrySchema>>({
    defaultValues: {
      name: "",
      duedate: "",
    },
    resolver: zodResolver(CardRegistrySchema),
  });
  useEffect(() => {
    form.reset(cardData);
    form.clearErrors();
  }, [cardData]);

  const onSubmit = (e: any, data: z.infer<typeof CardRegistrySchema>) => {
    e.preventDefault();
    let saveData = data;
    if (cardData) {
      saveData = {
        ...cardData,
        name: data.name,
        duedate: data.duedate,
      };
    }
    const headerOptions = {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(saveData),
    };

    startTransition(() => {
      fetch("/api/card?method=registry", headerOptions).then(async (data) => {
        let res = await data.json();
        if (res.error) {
          throw new Error("500 - Internal Server Error");
        } else {
          setTrigger(false);
          if(open){
            openCb(false)
          }
        }
      });
    });
  };

  return (
    <Dialog
      onOpenChange={(e) => {
        form.reset();
        setTrigger((prev: any) => e);
      }}
      open={open || triggerOpen}
    >
      <Form {...form}>
        <form
          id="cardForm"
          onSubmit={form.handleSubmit((data, event) => onSubmit(event, data))}
        >
          <DialogTrigger asChild>
            <Button className="cursor-pointer" variant="default">
              <PlusIcon /> Add New Card
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>New Card</DialogTitle>
            </DialogHeader>
            <DialogDescription />
            <div className="flex flex-col gap-10 p-2 h-auto">
              <FormField
                name="name"
                control={form.control}
                render={({ field, formState, fieldState }) => (
                  <FormItem>
                    <FormLabel>Card Name</FormLabel>
                    <FormControl>
                      <Input
                        id="name"
                        {...field}
                        form="cardForm"
                        type="text"
                        disabled={isPending}
                        placeholder="card name"
                        required
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="duedate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bill Duedate</FormLabel>
                    <FormControl>
                      <Input
                        id="bill_duedate"
                        form="cardForm"
                        required
                        {...field}
                        disabled={isPending}
                        placeholder="00/00"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <div className="flex flex-row gap-2">
                <Button
                  type="submit"
                  variant="default"
                  className="cursor-pointer"
                  disabled={isPending}
                  form="cardForm"
                >
                  Save
                  {isPending && <Spinner />}
                </Button>
                <DialogClose asChild>
                  <Button
                    variant="secondary"
                    form="cardForm"
                    onClick={() => {
                      openCb(false);
                      setTrigger(false);
                    }}
                  >
                    Cancel
                  </Button>
                </DialogClose>
              </div>
            </DialogFooter>
          </DialogContent>
        </form>
      </Form>
    </Dialog>
  );
}

export default CardFormDialog;
