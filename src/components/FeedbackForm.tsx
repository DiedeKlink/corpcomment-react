import { useState } from "react";
import { MAX_CHARACTERS } from "../lib/constants";

type FeedbackFormProps = {
  onAddToList: (text: string) => void;
};

export default function FeedbackForm({ onAddToList }: FeedbackFormProps) {
  const [text, setText] = useState("");

  const charactersLeft = MAX_CHARACTERS - text.length;

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText((prev) =>
      event.target.value.length <= MAX_CHARACTERS ? event.target.value : prev
    );
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (text.includes("#")) {
      onAddToList(text);
      setText("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <textarea
        value={text}
        onChange={handleChange}
        id="feedback-textarea"
        placeholder="blabla"
        spellCheck={false}
      ></textarea>
      <label htmlFor="feedback-textarea">
        Enter your feedback here, remember to #hashtag the company
      </label>
      <div>
        <p className="u-italic">{charactersLeft}</p>
        <button>Submit</button>
      </div>
    </form>
  );
}
