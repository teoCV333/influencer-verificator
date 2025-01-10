const Claims = require("../models/claimsModel");
const Influencer = require('../models/influencerModel');

class ClaimsService {

    async addClaimsToInfluencer(influencerId, newClaims) {

        const uniqueClaims = this.removeDuplicates(influencerId, newClaims);
        /* const createdClaims = await Claims.insertMany(newClaims);
        const claimIds = createdClaims.map(claim => claim._id);

        const updatedInfluencer = await Influencer.findByIdAndUpdate(
            influencerId,
            { $push: { claims: { $each: claimIds } } },
            { new: true }
        ).populate('claims'); */

        return /* updatedInfluencer */;
    }    

    async addVerificationStateToClaim(claimId, verification) {
        const {status, sources} = verification; 
        const updatedClaim = await Claims.findByIdAndUpdate(
            claimId,
            { status, $push: { soruces: { $each: sources } } },
            { new: true }
        );

        return updatedClaim;
    }

    removeDuplicates(influencerId, newClaims) {
        const claims = newClaims.map(claim => claim.claim);
        // get existent claims and validate with AI if exist duplicate meanings and avoid them 
        console.log(claims)
    }

    verifyClaims(influencerId, claims) {
        // before save new claims, verificate with perplexity
    }

 /*    async validateDuplicateMeaning(claimId, verification) {
        const {status, sources} = verification; 
        const updatedClaim = await Claims.findByIdAndUpdate(
            claimId,
            { status, $push: { soruces: { $each: sources } } },
            { new: true }
        );

        return updatedClaim;
    } */



}

module.exports = new ClaimsService();
