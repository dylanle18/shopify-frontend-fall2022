import { ResponseItemProps } from "components/ResponseItem";
import { useState } from "react";
import styles from "./PromptForm.module.css";
import { v4 as uuidv4 } from "uuid";

interface PromptFormProps {
  setResponses: React.Dispatch<React.SetStateAction<ResponseItemProps[]>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function PromptForm({
  setResponses,
  setLoading,
}: PromptFormProps) {
  const [prompt, setPrompt] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setPrompt(e.target.value);
  }

  async function handleSubmit() {
    setPrompt("");
    setLoading(true);
    const data = {
      prompt: prompt,
      temperature: 0.5,
      max_tokens: 128,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    };

    const r = await fetch(
      "https://api.openai.com/v1/engines/text-curie-001/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_APIKEY}`,
        },
        body: JSON.stringify(data),
      }
    );
    const json = await r.json();
    setLoading(false);
    setResponses((prevResponses) => {
      const newResponses = [{ id: uuidv4() , prompt, response: json.choices[0].text }, ...prevResponses]
      localStorage.setItem("openai-responses", JSON.stringify(newResponses))
      return newResponses;
    });
  }

  return (
    <div className={styles.form}>
      <label htmlFor="prompt">
        <h2 className={styles.form_header}>Enter Prompt</h2>
      </label>
      <textarea
        className={styles.input_area}
        id="prompt"
        cols={30}
        rows={10}
        value={prompt}
        onChange={handleChange}
        placeholder="Tell me a story"
      ></textarea>
      <button
        className={styles.submit_btn}
        onClick={handleSubmit}
        disabled={!prompt}
      >
        Submit
      </button>
    </div>
  );
}
