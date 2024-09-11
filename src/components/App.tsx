import { useEffect, useState } from "react";
import { TFeedbackItem } from "../lib/types";
import Container from "./layout/Container";
import Footer from "./layout/Footer";
import HashtagList from "./HashtagList";

function App() {
  const [feedbackItems, setFeedbackItems] = useState<TFeedbackItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleAddToList = async (text: string) => {
    const companyName = text
      .split(" ")
      .find((word: string) => word.includes("#"))!
      .substring(1);
    const newItem: TFeedbackItem = {
      id: new Date().getTime(),
      text: text,
      upvoteCount: 0,
      daysAgo: 0,
      company: companyName,
      badgeLetter: companyName.substring(0, 1).toUpperCase(),
    };

    setFeedbackItems([...feedbackItems, newItem]);

    try {
      const response = await fetch(
        "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks",
        {
          method: "POST",

          body: JSON.stringify(newItem),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Something went wrong.");
      }
    } catch (error) {
      setErrorMessage("Something went wrong.");
    }
  };

  useEffect(() => {
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
    fetchFeedbckItems();
  }, []);
  return (
    <>
      <div className="app">
        <Footer />
        <Container
          feedbackItems={feedbackItems}
          isLoading={isLoading}
          errorMessage={errorMessage}
          handleAddToList={handleAddToList}
        />
        <HashtagList />
      </div>
    </>
  );
}

export default App;
