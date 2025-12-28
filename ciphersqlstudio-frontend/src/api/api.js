export async function startSession(assignmentId) {
  const res = await fetch(
    `http://localhost:5000/api/start-session/${assignmentId}`,
    {
      method: 'POST',
    }
  );
  return res.json();
}

export async function executeQuery(query, schemaName) {
  const res = await fetch('http://localhost:5000/api/execute', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, schemaName }),
  });
  return res.json();
}

export async function getHint(assignmentId, userQuery) {
  const res = await fetch(
    `http://localhost:5000/api/hint/${assignmentId}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userQuery }),
    }
  );

  return res.json();
}
