const Influencer = require("../models/influencerModel");
const perplexityService = require("./perplexityService");

class InfluencerService {

    async addInfluencer(influencer) {
        try {
            const score = this.calculateScore(influencer.claims);
            const influencerCreated = await Influencer.create({ ...influencer, score: score });
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
            const influencers = await Influencer.find().sort({ score: -1 });
            if (!influencers || influencers.length == 0) {
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
            const influencer = await Influencer.aggregate([
                { $match: { name: { $regex: new RegExp(params.name, 'i') } } },
                {
                    $project: {
                        name: 1,
                        contentCategories: 1,
                        description: 1,
                        quantityFollowers: 1,
                        claims: { $sortArray: { input: "$claims", sortBy: { datePosted: -1 } } },
                        score: 1
                    }
                }
            ]);
            if (!influencer || influencer.length == 0) {
                const searchResults = await this.searchInfluencerWithAI(params);
                if (!searchResults.statusCode == 200) {
                    return searchResults;
                }
                return await this.addInfluencer(searchResults.data);//get influencer created and update the score, or calculate the score before save for only 1 request
            } else {
                return {
                    statusCode: 200,
                    message: "success",
                    data: influencer
                }
            }
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
            if (!result) {
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
        const influencers = await Influencer.find({ categories: category });
        if (!influencers || influencers.length == 0) {
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

    async addNewClaimsToInfluencer(influencerId, claims) {
        try {
            const influencer = await Influencer.findByIdAndUpdate(
                influencerId,
                { $push: { claims: { $each: claims } } },
                { new: true }
            );
            const newScore = this.calculateScore(influencer.claims);
            const influencerUpdated = await Influencer.findByIdAndUpdate(
                influencerId,
                { score: newScore },
                { new: true }
            );
            if (!influencerUpdated) {
                return {
                    statusCode: 404,
                    message: "Influencer not found",
                };
            }
            return {
                statusCode: 200,
                message: "Claims added successfully",
                data: influencerUpdated
            };
        } catch (error) {
            console.error("Error updating influencer:", error);
            return {
                statusCode: 500,
                message: "An error occurred while updating the influencer",
                error: error.message
            };
        }
    }

    calculateScore(claims) {
        let totalClaims = 0;
        let verified = 0;
        let debunked = 0;
        if (!claims || claims.length == 0) {
            return 0;
        }
        claims.map((claim) => {
            if (claim.verificationStatus == "Verified") {
                verified++;
            }
            if (claim.verificationStatus == "Debunked") {
                debunked++;
            }
            totalClaims++;
        });
        const score = ((((verified * 2) - (debunked * 3)) / totalClaims) * 100);
        console.log(score);
        return score;
    }

    async searchInfluencerWithAI(params) {
        const { name, filter, claimsNumber, token } = params;
        const searchResult = await perplexityService.searchInfluencer(name, filter, claimsNumber, token);
        if (JSON.stringify(searchResult) === '{}') {
            return {
                statusCode: 404,
                message: `${params.name} is not an knowled health influencer.`,
                data: {}
            };
        }
        return {
            statusCode: 200,
            message: "success",
            data: searchResult.data
        }
    }

    async searchNewClaimsWithAI(params) {
        const { id, name, filter, claimsNumber, token } = params;
        const searchResult = await perplexityService.searchClaimsByInfluencer(name, filter, claimsNumber, token);
        if (JSON.stringify(searchResult) === '{}') {
            return {
                statusCode: 404,
                message: `new claims don't found`,
                data: {}
            };
        }
        const result = await this.addNewClaimsToInfluencer(id, searchResult.data);
        return {
            statusCode: 200,
            message: "success",
            data: result
        }
    }

}

module.exports = new InfluencerService();