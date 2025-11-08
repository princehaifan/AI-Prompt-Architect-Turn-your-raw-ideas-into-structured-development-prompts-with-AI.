
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export async function generatePrompt(idea: string): Promise<string> {
  const masterPrompt = `
Act as a world-class senior product manager and software architect. Your task is to take a user's raw application idea and transform it into a detailed, structured design and development prompt.

You MUST follow this exact structure for your response:
1. A concise, one-paragraph description of the mobile or web app.
2. A bulleted list under the heading "Your app should make it easy to:".
3. A bulleted list under the heading "Key Screens (15 max)". This list must include some core, required screens relevant to the app idea, and also include several "Extra key screen of your choice" placeholders for the designer to fill in. Always include an "Admin Dashboard" and a "Support Page".

HERE IS A PERFECT EXAMPLE of the desired output format:

--- EXAMPLE START ---
Design a mobile app that helps users explore, book, and share campsite availability across multiple parks and regions.

Your app should make it easy to:
- Browse campsites via map + filters (region, amenities, availability)
- View live availability, join waitlists, and get notifications
- Handle bookings + payments clearly
- Invite friends to share trips / split costs

Key Screens (15 max)
- Sign-Up / Onboarding
- Map / Search + Filter
- Campsite Detail Page
- Availability Calendar
- Waitlist Flow
- Booking + Payment
- Booking Confirmation
- Trip Sharing
- Extra key screen of your choice
- Extra key screen of your choice
- Order History
- Admin Onboarding
- Admin Dashboard
- Manual Override
- Support Page
--- EXAMPLE END ---

Now, take the following user input and generate a prompt in the exact same format. Do not ask any questions. Just provide the results directly.

USER INPUT: "${idea}"
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: masterPrompt,
    });
    return response.text.trim();
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to communicate with the AI model.");
  }
}
