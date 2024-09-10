import { useState } from "react";
import { MAX_CHARACTERS } from "../lib/constants";

export default function FeedbackForm() {
  const [text, setText] = useState("");

  const charactersLeft = MAX_CHARACTERS - text.length;

  const changeHandler = (e) => {
    setText((prev) =>
      e.target.value.length <= MAX_CHARACTERS ? e.target.value : prev
    );
  };
  return (
    <form className="form">
      <textarea
        value={text}
        onChange={changeHandler}
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
