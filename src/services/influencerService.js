const Influencer = require("../models/influencerModel");
const perplexityService = require("./perplexityService");
const {capitalizeName} = require("../utils/utils");
const claimsService = require("./claimsService");

class InfluencerService {

    async addInfluencer(params) {
        const influencer = await perplexityService.searchInfluencer(params.name, params.filter, params.token);
        console.log(influencer)
        if(influencer.response == "false") {
            return {
                statusCode: 404,
                message: `${params.name} is not an knowled health influencer.`,
                data: {}
            };
        }
        try {
            influencerCreated = await Influencer.create(influencer);
            await claimsService.getClaimsByInfluencer(influencerCreated._id, params.filter, params.token)
            return {
                statusCode: 200,
                message: "success",
                data: await Influencer.findById(influencerCreated._id)
            };
        } catch (error) {
            console.log("error: ", error); 
            return {
                statusCode: 500,
                message: `error: ${error}`,
                data: {}
            };
        }
    }

    async getAllInfluencers() {
        return await Influencer.find();
    }

    async getInfluencerByName(params) {
        const influencer = await Influencer.findOne({name: capitalizeName(params.name)}).populate("claims");
        if(!influencer) {
            const newInfluencer = this.addInfluencer(params);
            return newInfluencer;
        }
        const claims = await claimsService.getClaimsByInfluencer(influencer._id, params.filter, params.token)
        return {
            statusCode: 200,
            message: "success",
            data: influencer
        };
    }

    async getInfluencerById(influencerId) {
        const result = await Influencer.findById(influencerId);
        return result;
    }

    async getInfluencerByCategory(category) {
        return await Influencer.find({categories: category});
    }

    async editInfluencerTrustScore(influencerId, trustScore) {
        return await Influencer.findByIdAndUpdate(
            influencerId, 
            { trustScore },
            { new: true }
        );
    }

}

module.exports = new InfluencerService();