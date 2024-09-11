import { useContext, useEffect, useState } from "react";
import { FeedbackItemsContext } from "../contexts/FeedbackItemsContextProvider";
import { TFeedbackItem } from "./types";

export function useFeedBackItemsContext() {
  const context = useContext(FeedbackItemsContext);

  if (!context) {
    throw new Error(
      "FeedbackItemsContext is not provided in the component tree"
    );
  }

  return context;
}

export function useFeedbackItems() {
  const [feedbackItems, setFeedbackItems] = useState<TFeedbackItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchFeedbackItems = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks"
        );
        if (!response.ok) {
          throw new Error("Something went wrong.");
        }
        const data = await response.json();
        setIsLoading(false);
        setFeedbackItems(data.feedbacks);
      } catch (error) {
        setErrorMessage("Something went wrong.");
        setIsLoading(false);
      }
    };
    fetchFeedbackItems();
  }, []);

  return {
    feedbackItems,
    isLoading,
    errorMessage,
    setFeedbackItems,
    setErrorMessage,
  };
}
