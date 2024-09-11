import { TFeedbackItem } from "../lib/types";
import FeedbackList from "./FeedbackList";
import Header from "./Header";

type ContainerProps = {
  feedbackItems: TFeedbackItem[];
  isLoading: boolean;
  errorMessage: string;
  handleAddToList: (text: string) => void;
};

export default function Container({
  feedbackItems,
  isLoading,
  errorMessage,
  handleAddToList,
}: ContainerProps) {
  return (
    <main className="container">
      <Header handleAddToList={handleAddToList} />
      <FeedbackList
        isLoading={isLoading}
        feedbackItems={feedbackItems}
        errorMessage={errorMessage}
      />
    </main>
  );
}
