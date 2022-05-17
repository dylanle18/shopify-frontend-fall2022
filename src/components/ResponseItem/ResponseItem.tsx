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
            <th className={styles.left_col}>Prompt:</th>
            <td className={styles.right_col}>{prompt}</td>
          </tr>
          <tr>
            <th className={styles.left_col}>Response:</th>
            <td className={styles.right_col}>{response}</td>
          </tr>
        </tbody>
      </table>
    </li>
  );
}
