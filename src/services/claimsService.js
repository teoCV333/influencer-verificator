const Claims = require("../models/claimsModel");
const Influencer = require("../models/influencerModel");
const perplexityService = require("./perplexityService");

class ClaimsService {

    async addClaimsToInfluencer(influencerId, newClaims) {
        try {
            // Create multiple claims and ignore duplicates
            const createdClaims = await Claims.insertMany(newClaims, { ordered: false });
            const claimIds = createdClaims.map(claim => claim._id);
    
            // Add the claim IDs to the influencer's claims array
            const updatedInfluencer = await Influencer.findByIdAndUpdate(
                influencerId,
                { $push: { claims: { $each: claimIds } } },
                { new: true }
            ).populate('claims'); 
    
            return updatedInfluencer;
        } catch (error) {
            if (error.writeErrors) {

                // Extract successfully inserted claims
                const insertedClaims = error.result.insertedIds.filter(id => id);
                const claimIds = Object.values(insertedClaims);
    
                // Update the influencer's claims array with the successfully inserted claims
                const updatedInfluencer = await Influencer.findByIdAndUpdate(
                    influencerId,
                    { $push: { claims: { $each: claimIds } } },
                    { new: true }
                ).populate('claims');
    
                return updatedInfluencer;
            } else {
                throw error;
            }
        }
    }

    async getClaimsByInfluencer(influencerId, dateFilter, token) {
        const influencer = await Influencer.findById(influencerId);
        const existentClaims = influencer.claims;
        let claims = [];
        if(existentClaims.length < 5) {
            await this.getNewClaims(influencerId, influencer.name, dateFilter, token)
        }
        const claimPromises = existentClaims.map(async (claim) => {
            return await Claims.findById(claim._id);
        });
        const resolvedClaims = await Promise.all(claimPromises);
        claims.push(...resolvedClaims)
        return resolvedClaims;
    }

    async getNewClaims(influencerId, influencerName, dateFilter, token) {
        const newClaims = await perplexityService.getHealthClaims(influencerName, dateFilter, token)
        await this.addClaimsToInfluencer(influencerId, newClaims);
        return;
    }
}

module.exports = new ClaimsService();
