import { useParams } from "react-router-dom";
import Editor from "@monaco-editor/react";
import { useEffect, useState } from "react";
import { startSession, executeQuery, getHint } from "../api/api";

function AssignmentAttempt() {
  const { id } = useParams();

  const [assignment, setAssignment] = useState(null);
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [schemaName, setSchemaName] = useState(null);
  const [workspaceLoading, setWorkspaceLoading] = useState(true);
  const [hint, setHint] = useState("");

  useEffect(() => {
    async function init() {
      try {
        const res = await fetch(`http://localhost:5000/api/assignments/${id}`);
        const data = await res.json();
        setAssignment(data);

        const session = await startSession(id);
        setSchemaName(session.schemaName);
      } catch (err) {
        setError("Failed to load assignment");
      } finally {
        setWorkspaceLoading(false);
      }
    }

    init();
  }, [id]);

  if (workspaceLoading) {
    return <p>Initializing workspace…</p>;
  }

  if (!assignment) {
    return <p>Assignment not found</p>;
  }

  return (
    <div className="attempt-page">
      <section className="question-panel">
        <h2>{assignment.title}</h2>
        <p>{assignment.question}</p>
      </section>

      <section className="workspace">
        <div className="sample-data">
          <h3>Table: {assignment.sampleTables[0].tableName}</h3>
          <ul>
            {assignment.sampleTables[0].columns.map((col) => (
              <li key={col.columnName}>
                {col.columnName} ({col.dataType})
              </li>
            ))}
          </ul>
        </div>

        <div className="sql-editor">
          <h3>SQL Editor</h3>

          <Editor
            height="200px"
            defaultLanguage="sql"
            value={query}
            onChange={(value) => setQuery(value || "")}
          />

          <div className="editor-actions">
            <button
              disabled={!schemaName}
              onClick={async () => {
                setError("");
                setResult(null);

                if (!query.trim()) {
                  setError("Query cannot be empty");
                  return;
                }

                const response = await executeQuery(query, schemaName);

                if (!response.success) {
                  setError(response.error);
                  return;
                }

                setResult(response.rows);
              }}
            >
              Execute Query
            </button>
            <button
              className="hint-btn"
              onClick={async () => {
                setHint("");
                const res = await getHint(id, query);
                setHint(res.hint);
              }}
            >
              Get Hint
            </button>
          </div>
          {hint && (
            <div className="hint-box">
              <strong>Hint:</strong> {hint}
            </div>
          )}

          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>

        <div className="results">
          <h3>Results</h3>

          {!result && <p>No results yet</p>}

          {result && (
            <table>
              <thead>
                <tr>
                  {Object.keys(result[0]).map((col) => (
                    <th key={col}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {result.map((row, idx) => (
                  <tr key={idx}>
                    {Object.values(row).map((val, i) => (
                      <td key={i}>{val}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>
    </div>
  );
}

export default AssignmentAttempt;
