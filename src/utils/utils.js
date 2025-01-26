export function parseAssistantResponse(response) {
  try {
    return JSON.parse(response.content);
  } catch {
    const jsonMatch = response.content.match(/```json\n([\s\S]*?)\n```/);

    if (!jsonMatch || !jsonMatch[1]) {
      throw new Error("No valid JSON found in the response.");
    }

    const jsonContent = jsonMatch[1].trim();

    let jsonResponse;
    try {
      jsonResponse = JSON.parse(jsonContent);
    } catch (error) {
      throw new Error("Failed to parse JSON: " + error.message);
    }

    return jsonResponse;
  }
}
