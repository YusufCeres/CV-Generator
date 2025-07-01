// Use environment variable for Gemini API key
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

export async function generateEnhancedContent(content: string, contentType: "summary" | "experience"): Promise<string> {
  console.log("Enhancing content with Gemini API:", { content, contentType });
  
  let prompt = "";
  
  if (contentType === "summary") {
    prompt = `Please enhance this professional summary to make it more compelling and professional. Keep it concise (2-3 sentences) and focus on key achievements and skills. Make sure it sounds natural and authentic:

${content}`;
  } else if (contentType === "experience") {
    prompt = `Please enhance this job experience description to make it more professional and impactful. Use action verbs, quantify achievements where possible, and highlight key responsibilities. Keep it concise but comprehensive:

${content}`;
  }

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Gemini API error:", errorData);
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    console.log("Gemini API response:", data);
    
    const enhancedText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!enhancedText) {
      throw new Error("No enhanced content received from API");
    }
    
    return enhancedText.trim();
  } catch (error) {
    console.error("Error enhancing content:", error);
    throw error;
  }
}
