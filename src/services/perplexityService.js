const { parseAssistantResponse } = require("../utils/utils");

class PerplexityService {

  async searchInfluencer(influencerName, dateFilter, numberOfClaims, token) {
    console.log(token)
    const promptContent = `
Role: Advanced Research Assistant for Health and Medicine Influencers

Task:
Research and analyze content from ${influencerName} within a given date range, focusing on health and medicine-related categories. If the influencer is not health/medicine-related, return an empty JSON object.

Each claim must be verified against reliable scientific sources, categorized as follows:
- Verified: Strong evidence from reputable sources.
- Questionable: Insufficient evidence or anecdotal information.
- Debunked: Proven false or misleading by credible sources.

For each claim, provide:
- Verification Status
- Source(s): List URLs and titles of reputable journals.

Return the results always using this JSON format:
{
  "name": "",
  "contentCategories": ["", "", ""],
  "description": "",
  "quantityFollowers": 0,
  "claims": [
    {
      "claimText": "",
      "datePosted": "",
      "postUrl": "",
      "categories": ["", ""],
      "verificationStatus": "",
      "sources": [
        {
          "url": "",
          "title": ""
        }
      ]
    }
  ]
}

Input Parameters:
- Influencer Name to research: ${influencerName}
- Date Filter: ${dateFilter}
- Number of Claims: ${numberOfClaims}

Date Filter Logic:
- "week": Claims from the last 7 days.
- "month": Claims from the last 30 days.
- "year": Claims from the last 365 days.

Data to Retrieve (if health/medicine-related):
- Full Name
- Content Categories (e.g., "nutrition," "exercise")
- Description (5-line summary of title, affiliations, focus areas)
- Follower Count (approximate total across all platforms, only a number example: 300000)
- Claims (up to ${numberOfClaims}, ordered chronologically):
  - Claim text
  - Date posted
  - Original post URL
  - Related categories
  - Verification Status
  - Source(s)

If Non-Health Related Influencer:
- Return an empty JSON object: {}

Notes:
- Only include claims within the specified date range.
- Ensure claims are ordered from most recent to oldest.
`;

    const result = await this.generalRequest({ promptContent, dateFilter, token });
    return result;
  }

  async searchClaimsByInfluencer(influencerName, dateFilter, numberOfClaims, token) {
    const promptContent = `
Role: Advanced Research Assistant for Health and Medicine Influencers

Task:
Your task is to research and analyze content posted from ${influencerName} within a given date range, ensuring the results align with health and medicine-related categories. The date range will filter claims based on the provided input (e.g., "week," "month," "year").

In addition, each claim must be verified against reliable scientific journals and sources, and the verification status must be determined using the following criteria:

Verified: Supported by strong scientific evidence from reputable sources.
Questionable: Lacks sufficient evidence or is based on anecdotal information.
Debunked: Proven false or misleading by credible sources.
For each claim, provide the following information:

Verification Status: Indicate whether the claim is Verified, Questionable, or Debunked.
Source(s): List the reliable journals or sources used for verification, only the URL and title.
Follow these requirements strictly and output the results in JSON format:


Input Parameters:
- Influencer Name to research claims: ${influencerName}
- Date Filter: ${dateFilter}
- Number of Claims: ${numberOfClaims}

"week": Retrieve claims posted from 7 days ago to the current day.
"month": Retrieve claims posted from 30 days ago to the current day.
"year": Retrieve claims posted from 365 days ago to the current day.
Ensure that each claim falls within the appropriate date range for the filter.
Data to Retrieve (If Health/Medicine Related):

Claims: A list of health/medicine-related posts containing health claims, filtered by the given date range and capped by the specified number of claims. Each claim must include:
The claim text in a simple, short sentence.
The date posted.
The original post URL.
The categories to which the claim relates (e.g., "Nutrition," "Medicine").
Verification Status: Indicate whether the claim is Verified, Questionable, or Debunked.
Source(s): List the URLs and titles of reputable journals or sources used for verification.

If Non-Health Related Claims:

Return a void JSON object: {}

Formatting:	 
Return the results always using this JSON format:
[
    {
      "claimText": "",
      "datePosted": "",
      "postUrl": "",
      "categories": ["", ""],
      "verificationStatus": "",
      "sources": [
        {
          "url": "",
          "title": ""
        }
      ]
    }
]

Notes:
The claims should only include posts made within the time frame of the selected filter ("week," "month," "year").
The date filter logic automatically adjusts the date range for each claim to match the filter you specify.
Claims must be ordered chronologically, from the most recent claim to the oldest, based on the filter's date range.
Each claim's verification status must be supported by reputable scientific sources, and the verification status should be updated accordingly (Verified, Questionable, Debunked).

`;
    const result = await this.generalRequest({ promptContent, dateFilter, token });
    return result;
  }

  async generalRequest({ promptContent, dateFilter, token }) {
    if (token == "" || !token) {
      throw new Error("Missing required parameters: token");
    }


    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: "llama-3.1-sonar-small-128k-online",
        messages: [
          { role: "system", content: "Be precise and concise." },
          { role: "user", content: promptContent }
        ],
        temperature: 0.2,
        top_p: 0.9,
        search_recency_filter: dateFilter,
        return_images: false,
        return_related_questions: false,
        top_k: 0,
        stream: false,
        presence_penalty: 0,
        frequency_penalty: 1,
      }),
    };

    try {
      const response = await fetch('https://api.perplexity.ai/chat/completions', options);
      const data = await response.json();

      if (!response.ok) {
        return {
          statusCode: 401,
          message: data
        };
      }
      const result = parseAssistantResponse(data.choices[0].message);
      return {
        statusCode: 200,
        message: "success",
        data: result
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: `Internal Server Error: ${error}`
      };
    }
  }

}

module.exports = new PerplexityService();