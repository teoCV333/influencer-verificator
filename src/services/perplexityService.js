const prompts = require("../data/prompts.json");
const { replaceDynamicValue, parseAssistantResponse } = require("../utils/utils");

class PerplexityService {

    searchInfluencer(inputContent, dateFilter, token) {
        console.log(prompts["searchInfluencer"])
        const promptContent = replaceDynamicValue(prompts["searchInfluencer"], "<name>", inputContent);
        console.log(promptContent)
        const params = {
            token, 
            promptContent,
            dateFilter
        };
        const result = this.generalRequest(params);
        return result;
    }

    async getHealthClaims(inputContent, dateFilter, token) {
        const promptContent = replaceDynamicValue(prompts["getHealthClaims"], "getHealthClaims", "<name>", inputContent);
        const params = {
            token, 
            promptContent,
            dateFilter
        };
        const results = await this.generalRequest(params);
        console.log(results)
        const resultsVerified = await Promise.all(
            results.claims.map(async (claim) => {
                const verification = await this.verifyClaims(token, claim.claim);
                console.log(verification)
                const finalClaim = { ...claim, status: verification.status, sources: verification.sources };
                console.log(finalClaim)
                return finalClaim;
            })
        );
        return resultsVerified;
    }

    async verifyClaims(token, claim) {
        const promptContent = replaceDynamicValue(prompts["verifyClaims"], "verifyClaims", "<claim>", claim);
        const params = {
            token, 
            promptContent
        }
        const result = await this.generalRequest(params);
        return result;
    }

    async generalRequest(params) {
        const {token, promptContent, dateFilter} = params;
        const options = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: "llama-3.1-sonar-small-128k-online",
                messages: [
                    { role: "system", content: "Be precise and concise." },
                    { role: "user", content: promptContent }
                ],
                temperature: 0.2,
                top_p: 0.9,
                return_images: false,
                return_related_questions: false,
                search_recency_filter: dateFilter,
                top_k: 0,
                stream: false,
                presence_penalty: 0,
                frequency_penalty: 1
            })
        };

        try {
            const response = await fetch('https://api.perplexity.ai/chat/completions', options);
            const data = await response.json();
            
            if (!response.ok) {
                return { error: data };
            }
            const message = parseAssistantResponse(data.choices[0].message);
            return message;
        } catch (error) {
            console.error('Error:', error);
            return { message: 'Internal Server Error' };
        }
    }

}

module.exports = new PerplexityService();