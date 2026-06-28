// This file handles all communication with the AI (via OpenRouter)
// It is used by Emotional Translator, Intimacy Lab, and Daily Connection Capsule

const OPENROUTER_API_KEY = process.env.REACT_APP_OPENROUTER_API_KEY;
const MODEL = "openrouter/free";

// Sends a conversation to the AI and returns the AI's reply as text
export async function sendToAI(systemPrompt, conversationHistory) {
  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: MODEL,
          messages: [
            { role: "system", content: systemPrompt },
            ...conversationHistory,
          ],
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`OpenRouter request failed: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("AI request error:", error);
    return "Sorry, something went wrong while reaching the AI. Please try again.";
  }
}