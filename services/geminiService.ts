
import { GoogleGenAI, Type } from "@google/genai";

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      // Remove the data URL prefix
      const base64 = result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = (error) => reject(error);
  });
};

export const generateLabels = async (imageFile: File): Promise<string[]> => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set.");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const base64Image = await fileToBase64(imageFile);

  const imagePart = {
    inlineData: {
      mimeType: imageFile.type,
      data: base64Image,
    },
  };

  const textPart = {
    text: "Generate a concise list of descriptive labels for this image. The labels should be relevant tags that categorize the image's content, style, and subject matter. Return the response as a JSON object with a single key 'labels' which is an array of strings."
  };

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: { parts: [imagePart, textPart] },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            labels: {
              type: Type.ARRAY,
              description: "A list of descriptive labels for the image.",
              items: {
                type: Type.STRING,
                description: "A single label.",
              },
            },
          },
          required: ['labels'],
        },
      },
    });

    const responseText = response.text.trim();
    const parsedJson = JSON.parse(responseText);
    
    if (parsedJson && Array.isArray(parsedJson.labels)) {
      return parsedJson.labels;
    } else {
      throw new Error("Invalid response format from API.");
    }
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to communicate with the AI model.");
  }
};
