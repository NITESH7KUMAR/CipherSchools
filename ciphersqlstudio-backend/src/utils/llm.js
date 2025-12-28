const Groq = require("groq-sdk");

const client = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

async function generateHint({ question, tables, userQuery }) {
  const prompt = `
You are an SQL tutor.

Rules:
- DO NOT write full SQL queries
- DO NOT give exact syntax
- ONLY give conceptual hints
- Keep response under 3 sentences

Question:
${question}

Tables:
${JSON.stringify(tables, null, 2)}

User's current query:
${userQuery || "No query yet"}

Give a helpful hint:
`;

  const response = await client.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.4,
  });

  return response.choices[0].message.content;
}

module.exports = { generateHint };
