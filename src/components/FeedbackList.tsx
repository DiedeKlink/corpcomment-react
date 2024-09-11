import { useEffect, useState } from "react";
import FeedbackItem from "./FeedbackItem";
import Spinner from "./Spinner";
import ErrorMessage from "./ErrorMessage";

export default function FeedbackList() {
  const [feedbackItems, setFeedbackItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const fetchFeedbckItems = async () => {
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

  useEffect(() => {
    fetchFeedbckItems();

    // setIsLoading(true);
    // fetch(
    //   "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks"
    // )
    //   .then((response) => {
    //     if (!response.ok) {
    //       throw new Error("Something went wrong.");
    //     }
    //     return response.json();
    //   })
    //   .then((data) => {
    //     setIsLoading(false);

    //     setFeedbackItems(data.feedbacks);
    //   })
    //   .catch((error) => {
    //     setErrorMessage(error.message);
    //     setIsLoading(false);
    //   });
  }, []);

  return (
    <ol className="feedback-list">
      {isLoading ? <Spinner /> : null}
      {errorMessage ? <ErrorMessage message={errorMessage} /> : null}
      {feedbackItems.map((feedbackItem) => (
        <FeedbackItem key={feedbackItem.id} feedbackItem={feedbackItem} />
      ))}
    </ol>
  );
}
