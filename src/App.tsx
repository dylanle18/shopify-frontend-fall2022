import styles from "./App.module.css";
import { useLayoutEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import ResponseItem, { ResponseItemProps } from "./components/ResponseItem";
import PromptForm from "components/PromptForm";

function App() {
  const [responses, setResponses] = useState<Array<ResponseItemProps>>(JSON.parse(localStorage.getItem("openai-responses") || '[]'));
  const [loading, setLoading] = useState(false);
  const appDiv = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (loading) {
      if (appDiv.current !== null)
        appDiv.current.classList.add(styles.disabled);
    } else {
      if (appDiv.current !== null)
        appDiv.current.classList.remove(styles.disabled);
    }
  }, [loading]);

  function deleteResponse(id: string) {
    setResponses((prevResponses) => {
      const newResponses = prevResponses.filter(r => r.id !== id)
      localStorage.setItem("openai-responses", JSON.stringify(newResponses))
      return newResponses;
    });
  }

  return (
    <div className={styles.app_container} ref={appDiv}>
      { loading && <div className={styles.loading_overlay}><div className={styles.loader}>Loading...</div></div> }
      <h1 className={styles.app_header}>Fun with AI</h1>
      <PromptForm
        setResponses={setResponses}
        setLoading={setLoading}
      ></PromptForm>
      <h2 className={styles.response_header}>Responses</h2>
      <ul>
        {responses.map((r) => (
          <ResponseItem
            key={uuidv4()}
            id={r.id}
            prompt={r.prompt}
            response={r.response}
            deleteResponse={deleteResponse}
          ></ResponseItem>
        ))}
      </ul>
    </div>
  );
}

export default App;
