"use client";

import { ListWithCards } from "@/types";
import ListForm from "./list-form";
import { useEffect, useState } from "react";
import ListItem from "./list-item";

import { useAction } from "@/hooks/use-action";
import { UpdateListOrder } from "@/actions/update-list-order/schema";

import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { updateListOrder } from "@/actions/update-list-order";
import { updateCardOrder } from "@/actions/update-card-order";
import { toast } from "sonner";

interface ListContainerProps {
  // data: List[];
  data: ListWithCards[];
  boardId: string;
}

function reorder<T>(list: T[], startIndex: number, endIndex: number) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed); // will add to end of array

  return result;
}

const ListContainer = ({ data, boardId }: ListContainerProps) => {
  const [orderedData, setOrderedData] = useState(data);

  const { execute: executeUpdateListOrder } = useAction(updateListOrder, {
    onSuccess: () => {
      toast.success(`List reorderd`);
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const { execute: executeUpdateCardOrder } = useAction(updateCardOrder, {
    onSuccess: () => {
      toast.success(`Card reorderd`);
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  useEffect(() => {
    setOrderedData(data);
  }, [data]);

  const onDragEnd = (result: any) => {
    const { destination, source, type } = result;
    if (!destination) return;

    // if dropped in same position
    if (
      destination.droppableId === source.id &&
      destination.index === source.index
    )
      return;

    // user moves a list
    if (type === "list") {
      const items = reorder(orderedData, source.index, destination.index).map(
        // everything is the same expect order is now based on index (which will change the ordering)
        (item, index) => ({ ...item, order: index })
      );
      setOrderedData(items); // optimistic mutation

      // TODO: Trigger server action
      executeUpdateListOrder({ items, boardId });
    }

    // user moves a card
    if (type === "card") {
      // Lists are objects but contain arrays as cards
      let newOrderedData = [...orderedData];
      const sourceList = newOrderedData.find(
        (list) => list.id === source.droppableId
      );
      const destList = newOrderedData.find(
        (list) => list.id === destination.droppableId
      );

      // console.log("sl", sourceList);
      // console.log("dl", destList);

      if (!sourceList || !destList) return;

      // Check if cards exist on sourceList
      if (!sourceList.cards) {
        sourceList.cards = [];
      }

      // Check if cards exist on destList
      if (!destList.cards) {
        destList.cards = [];
      }

      // Moving the card in the same list
      if (source.droppableId === destination.droppableId) {
        const reorderdCards = reorder(
          sourceList.cards,
          source.index,
          destination.index
        );

        reorderdCards.forEach((card, idx) => {
          card.order = idx;
        });

        // reassign cards based on new order
        sourceList.cards = reorderdCards;

        // We are changing params in newOrderedData indirectly so upating orderedData with this updates the cards
        setOrderedData(newOrderedData);

        // TODO: trigger server action
        executeUpdateCardOrder({ boardId, items: reorderdCards });

        // User moves card to another list
      } else {
        // Remove card from source list
        const [movedCard] = sourceList.cards.splice(source.index, 1);

        // Assign new listId to moved card
        movedCard.listId = destination.droppableId;
        // Add card to destination list
        destList.cards.splice(destination.index, 0, movedCard);

        // update order of cards in source list
        sourceList.cards.forEach((card, idx) => {
          card.order = idx;
        });

        // update order of cards in destination list
        destList.cards.forEach((card, idx) => {
          card.order = idx;
        });

        // We only grabbed objects so newOrderedData still is looking at these object references
        setOrderedData(newOrderedData);
        // updating order id and list id (by its order in the current set of lists)
        executeUpdateCardOrder({
          boardId,
          items: destList.cards,
        });
      }
    }
  };

  return (
    // have to do same thing for ListItem
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="lists" type="list" direction="horizontal">
        {(provided) => (
          <ol
            // add these to ol to make them droppable
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex gap-x-3 h-full"
          >
            {orderedData.map((list, index) => {
              return <ListItem key={list.id} index={index} data={list} />;
            })}
            {provided.placeholder}
            <ListForm />
            <div className="flex-shrink-0 w-1" />
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default ListContainer;
