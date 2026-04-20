import type { Handler } from "@netlify/functions";
import fetch from "node-fetch";
import { portfolioKnowledge } from "../../src/data/profile";
import { MAX_CHAT_HISTORY } from "../../src/lib/chatbot";
import type { ChatMessage, ChatRequestBody, ChatResponseBody } from "../../src/types/chat";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
} as const;

const fallbackQuestions = portfolioKnowledge.faqSeeds.slice(0, 4);

const buildPrompt = (messages: ChatMessage[]) => {
  const conversation = messages
    .slice(-MAX_CHAT_HISTORY)
    .map((message) => `${message.role.toUpperCase()}: ${message.content}`)
    .join("\n");

  return `
You are Simrandeep Singh's portfolio assistant.

Your job:
- Help recruiters and visitors understand Simrandeep better.
- Answer only from the structured portfolio knowledge provided below.
- Do not invent facts, companies, dates, achievements, education, or technologies.
- If the answer is not present in the portfolio knowledge, say clearly that the portfolio does not contain that information.
- Keep answers concise, polished, and recruiter-friendly.
- When helpful, mention specific projects, achievements, or work experience by name.

Return valid JSON with this exact shape:
{
  "reply": "string",
  "citations": ["Identity" | "Experience" | "Projects" | "Skills" | "Achievements" | "Resume"],
  "suggestedQuestions": ["string", "string", "string"]
}

Rules for citations:
- Include only sections actually used.
- Keep between 1 and 3 citations.

Portfolio knowledge:
${JSON.stringify(portfolioKnowledge, null, 2)}

Conversation:
${conversation}
`.trim();
};

const extractText = (payload: any) =>
  payload?.candidates?.[0]?.content?.parts
    ?.map((part: { text?: string }) => part.text ?? "")
    .join("")
    .trim();

const parseModelResponse = (text: string): ChatResponseBody => {
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  const parsed = jsonMatch ? JSON.parse(jsonMatch[0]) : JSON.parse(text);

  return {
    reply:
      typeof parsed.reply === "string" && parsed.reply.trim()
        ? parsed.reply.trim()
        : "The portfolio does not contain enough information to answer that reliably.",
    citations: Array.isArray(parsed.citations)
      ? parsed.citations.filter((citation) => typeof citation === "string").slice(0, 3)
      : undefined,
    suggestedQuestions: Array.isArray(parsed.suggestedQuestions)
      ? parsed.suggestedQuestions
          .filter((question) => typeof question === "string" && question.trim())
          .slice(0, 3)
      : fallbackQuestions.slice(0, 3),
  };
};

export const handler: Handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers: corsHeaders, body: "" };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: corsHeaders,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  try {
    const apiKey = process.env.GOOGLE_AI_API_KEY;
    const model = process.env.GOOGLE_AI_MODEL || "gemini-2.0-flash";

    if (!apiKey) {
      return {
        statusCode: 500,
        headers: corsHeaders,
        body: JSON.stringify({ error: "Google AI API key not configured" }),
      };
    }

    const payload = JSON.parse(event.body || "{}") as ChatRequestBody;
    const messages = Array.isArray(payload.messages)
      ? payload.messages.filter(
          (message): message is ChatMessage =>
            !!message &&
            (message.role === "user" || message.role === "assistant") &&
            typeof message.content === "string" &&
            message.content.trim().length > 0
        )
      : [];

    if (messages.length === 0) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ error: "At least one message is required" }),
      };
    }

    const prompt = buildPrompt(messages);
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: prompt }],
            },
          ],
          generationConfig: {
            temperature: 0.2,
            topK: 24,
            topP: 0.8,
            maxOutputTokens: 500,
            responseMimeType: "application/json",
          },
        }),
      }
    );

    if (!response.ok) {
      const details = await response.text();
      console.error("Gemini request failed", { status: response.status, details });

      return {
        statusCode: 502,
        headers: corsHeaders,
        body: JSON.stringify({ error: "Gemini request failed" }),
      };
    }

    const data = await response.json();
    const text = extractText(data);

    if (!text) {
      return {
        statusCode: 502,
        headers: corsHeaders,
        body: JSON.stringify({ error: "Empty response from Gemini" }),
      };
    }

    const parsed = parseModelResponse(text);

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify(parsed),
    };
  } catch (error: any) {
    console.error("Chat function error", error);

    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({
        error: error?.message || "Unknown error",
        reply:
          "I hit a temporary issue while answering. Please try again in a moment.",
        suggestedQuestions: fallbackQuestions.slice(0, 3),
      }),
    };
  }
};
