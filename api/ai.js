export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'POST only' });
  }

  const { action, temperature, apiKey } = req.body;

  // Use client-provided key or fall back to env var
  const key = apiKey || process.env.OPENAI_API_KEY;
  if (!key) {
    return res.status(200).json({ result: getFallback(action) });
  }

  const prompts = {
    refactor: 'You are a code assistant. Refactor this code to be cleaner and more readable. Be concise, reply in 1-2 sentences describing what you improved.\n\nfunction getData(x){var r=[];for(var i=0;i<x.length;i++){if(x[i].active==true){r.push(x[i].name)}}return r}',
    summarize: 'Summarize what this module does in one sentence.\n\nimport jwt from "jsonwebtoken";\nconst sessions = new Map();\nexport function login(user, pass) { const token = jwt.sign({user}, SECRET); sessions.set(user, token); return token; }\nexport function verify(token) { return jwt.verify(token, SECRET); }\nexport function logout(user) { sessions.delete(user); }',
    build: 'You are a build system. Simulate a successful preview build output in 1-2 lines. Be concise and realistic.'
  };

  const prompt = prompts[action] || prompts.refactor;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${key}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        temperature: parseFloat(temperature) || 0.5,
        max_tokens: 150,
        messages: [{ role: 'user', content: prompt }]
      })
    });

    const data = await response.json();

    if (data.error) {
      return res.status(200).json({ result: getFallback(action) });
    }

    const result = data.choices?.[0]?.message?.content || getFallback(action);
    return res.status(200).json({ result });
  } catch {
    return res.status(200).json({ result: getFallback(action) });
  }
}

function getFallback(action) {
  const fallbacks = {
    refactor: 'Refactored: extracted filter/map pattern, used strict equality, improved naming.',
    summarize: 'This module handles JWT-based user authentication with session tracking.',
    build: 'Build complete. Preview deployed to preview-38a7c.vercel.app'
  };
  return fallbacks[action] || fallbacks.refactor;
}
