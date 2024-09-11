import { useContext } from "react";
import { FeedbackItemsContext } from "../contexts/FeedbackItemsContextProvider";

export function useFeedBackItemsContext() {
  const context = useContext(FeedbackItemsContext);

  if (!context) {
    throw new Error(
      "FeedbackItemsContext is not provided in the component tree"
    );
  }

  return context;
}
