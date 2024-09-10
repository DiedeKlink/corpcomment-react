import FeedbackItem from "./FeedbackItem";

const feedbackItems = [
  {
    upvoteCount: 593,
    badgeLetter: "B",
    companyName: "ByteGrad",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore eius enim, eum ab omnis asperiores!",
    daysAgo: 4,
  },
  {
    upvoteCount: 345,
    badgeLetter: "S",
    companyName: "Starbucks",
    text: "Lorem ipsupisicing elit. Labore eius enim, eum ab omnis asperiores!",
    daysAgo: 4,
  },
  {
    upvoteCount: 456,
    badgeLetter: "M",
    companyName: "McDonalds",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore eius enim, eum ab omnis asperiores!",
    daysAgo: 4,
  },
];

export default function FeedbackList() {
  return (
    <ol className="feedback-list">
      {feedbackItems.map((feedbackItem) => (
        <FeedbackItem feedbackItem={feedbackItem} />
      ))}
    </ol>
  );
}
