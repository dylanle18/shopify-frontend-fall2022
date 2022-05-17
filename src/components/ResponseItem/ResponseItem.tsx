import styles from "./ResponseItem.module.css";

export interface ResponseItemProps {
  id: string;
  prompt: string;
  response: string;
  deleteResponse?: (id: string) => void;
}

export default function ResponseItem({
  id,
  prompt,
  response,
  deleteResponse,
}: ResponseItemProps) {
  return (
    <li
      className={styles.container}
      onClick={() => {
        if (deleteResponse) {
          deleteResponse(id);
        }
      }}
    >
      <table className={styles.table}>
        <tbody>
          <tr>
            <th>Prompt:</th>
            <td>{prompt}</td>
          </tr>
          <tr>
            <th>Response:</th>
            <td>{response}</td>
          </tr>
        </tbody>
      </table>
    </li>
  );
}
