const Influencer = require("../models/influencerModel");
const perplexityService = require("./perplexityService");
const {capitalizeName} = require("../utils/utils");
const claimsService = require("./claimsService");

class InfluencerService {

    async addInfluencer(params) {
        const influencer = await perplexityService.searchInfluencer(params.name, params.filter, params.token);
        if(influencer.response == false) {
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
            return {
                statusCode: 500,
                message: `error: ${error}`,
                data: {}
            };
        }
    }

    async getAllInfluencers() {
        try {
            const influencers = await Influencer.find();
            if(!influencers || influencers.length == 0) {
                return {
                    statusCode: 200,
                    message: "there are no records",
                    data: []
                }
            }
            return {
                statusCode: 200,
                message: "success",
                data: influencers
            }
        } catch (error) {
            return {
                statusCode: 500,
                message: error
            }
        }
    }

    async getInfluencerByName(params) {
        try {
            const influencer = await Influencer.find({name: capitalizeName(params.name)}).populate("claims")[0];
            if(!influencer) {
                const newInfluencer = await this.addInfluencer(params);
                return newInfluencer;
            }
            const claims = await claimsService.getClaimsByInfluencer(influencer._id, params.filter, params.token)
            return {
                statusCode: 200,
                message: "success",
                data: influencer
            };
        } catch (error) {
            return {
                statusCode: 500,
                message: error
            }
       }
    }

    async getInfluencerById(influencerId) {
        try {
            const result = await Influencer.findById(influencerId);
            if(!result) {
                return {
                    statusCode: 404,
                    message: "influencer not found.",
                    data: {}
                };
            } 
            return {
                statusCode: 200,
                message: "success",
                data: result
            };
        } catch (error) {
            return {
                statusCode: 500,
                message: error
            }
        }
        
    }

    async getInfluencersByCategory(category) {
        const infuencers = await Influencer.find({categories: category});
        if(!influencers || influencers.length == 0) {
            return {
                statusCode: 404,
                message: "There are not records.",
                data: []
            }
        }
        return {
            statusCode: 200,
            message: "success.",
            data: []
        }
    }

    async editInfluencerTrustScore(influencerId, trustScore) {
        try {
            const influencerUpdated = await Influencer.findByIdAndUpdate(
                influencerId, 
                { trustScore },
                { new: true }
            );
            return {
                statusCode: 200,
                message: "success",
                data: influencerUpdated
            }
        } catch (error) {
            return {
                statusCode: 500,
                message: error,
            }  
        }
    }

}

module.exports = new InfluencerService();