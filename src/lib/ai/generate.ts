import { createServerFn } from "@tanstack/react-start";
import { briefSchema, parseKit } from "@/lib/corey/schema";
import { KIT_JSON_SCHEMA } from "@/lib/corey/json-schema";
import { SYSTEM_PROMPT, userPrompt } from "./prompts";
import { z } from "zod";

const generateInput = z.object({
  brief: briefSchema,
});

const speakInput = z.object({
  text: z.string().min(8).max(700),
});

type ChatOk = { ok: true; text: string };
type ChatErr = { ok: false; error: string };

async function chatJson(messages: { role: "system" | "user"; content: string }[]): Promise<ChatOk | ChatErr> {
  const apiKey = process.env.XAI_API_KEY;
  if (!apiKey) return { ok: false, error: "AI is not available in this environment" };

  const body = {
    model: "grok-4.5",
    messages,
    temperature: 0.6,
    max_tokens: 6000,
    response_format: {
      type: "json_schema",
      json_schema: {
        name: "corey_kit",
        schema: KIT_JSON_SCHEMA,
        strict: true,
      },
    },
  };

  const res = await fetch("https://api.x.ai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const fallback = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "grok-4.5",
        messages,
        temperature: 0.6,
        max_tokens: 6000,
        response_format: { type: "json_object" },
      }),
    });
    if (!fallback.ok) {
      return { ok: false, error: `xAI API error ${res.status}` };
    }
    const fb = (await fallback.json()) as { choices?: { message?: { content?: string } }[] };
    return { ok: true, text: fb.choices?.[0]?.message?.content ?? "" };
  }

  const json = (await res.json()) as { choices?: { message?: { content?: string } }[] };
  return { ok: true, text: json.choices?.[0]?.message?.content ?? "" };
}

export const generateKit = createServerFn({ method: "POST" })
  .validator((input: unknown) => generateInput.parse(input))
  .handler(async ({ data }) => {
    const result = await chatJson([
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: userPrompt(data.brief) },
    ]);
    if (!result.ok) return result;
    try {
      const kit = parseKit(result.text);
      return { ok: true as const, kit };
    } catch (err) {
      const message = err instanceof Error ? err.message : "Could not parse kit";
      return { ok: false as const, error: message };
    }
  });

export const speakPitch = createServerFn({ method: "POST" })
  .validator((input: unknown) => speakInput.parse(input))
  .handler(async ({ data }) => {
    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) return { ok: false as const, error: "AI is not available in this environment" };

    const res = await fetch("https://api.x.ai/v1/tts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ text: data.text, voice_id: "eve" }),
    });
    if (!res.ok) {
      return { ok: false as const, error: `Voice error ${res.status}` };
    }
    const buf = Buffer.from(await res.arrayBuffer());
    const mime = res.headers.get("content-type") || "audio/mpeg";
    return { ok: true as const, mime, base64: buf.toString("base64") };
  });
