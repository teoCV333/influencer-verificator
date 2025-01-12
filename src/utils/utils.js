function replaceDynamicValue(jsonString, target, valueToReplace) {;
    const regex = new RegExp(`${target}`, "g")
    return jsonString.replace(regex, valueToReplace);
}
function parseAssistantResponse(response) {
    
    const jsonMatch = response.content.match(/```json\n([\s\S]*?)\n```/);

    if (!jsonMatch || !jsonMatch[1]) {
        throw new Error('No valid JSON found in the response.');
    }


    const jsonContent = jsonMatch[1].trim();

    let jsonResponse;
    try {
        jsonResponse = JSON.parse(jsonContent); 
    } catch (error) {
        throw new Error('Failed to parse JSON: ' + error.message);
    }

    return jsonResponse;
}

function capitalizeName(name) {
    return name
        .split(' ')
        .map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
        .join(' ');
}

module.exports = { replaceDynamicValue, parseAssistantResponse, capitalizeName};