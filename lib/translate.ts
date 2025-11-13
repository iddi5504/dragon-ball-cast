import { TranslationResponse } from "@/types/global";

export const translate = async (key: string, body: string): Promise<TranslationResponse | null> => {

    const response = await fetch("https://api.lecto.ai/v1/translate/text", {
        method: "POST",
        body: JSON.stringify({
            texts: [body],
            from: "es",
            to: ["en"],
        }),
        headers: { "Content-Type": "application/json", "x-api-key": process.env.NEXT_PUBLIC_LECTO_API_KEY || "" },
    });

    if (response.ok === false) {
        return null;
    }

    return await response.json();
}