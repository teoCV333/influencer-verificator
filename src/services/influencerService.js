import { Influencer } from "../models/influencerModel.js";
import perplexityService from "./perplexityService.js";

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
            const nameValidated = await perplexityService.validateInfluencerName(params.name, params.token);
            if (nameValidated.statusCode != 200) {
                return {
                    statusCode: nameValidated.statusCode,
                    message: nameValidated.message
                };
            }
            let influencer;
            influencer = await Influencer.findOne({ name: { $regex: new RegExp(`^${nameValidated.data["name"]}$`, 'i') } });
            if (!influencer) {
                const searchResults = await this.searchInfluencerWithAI(params);
                if (searchResults.statusCode != 200) { return searchResults; }
                else {
                    searchResults.data.name = nameValidated.data["name"];
                    influencer = await this.addInfluencer(searchResults.data);
                }
            }
            console.log(influencer);
            /* setTimeout(() => {
                const influencer = {
                    _id: "678e90aee8145dbcd25734a8",
                    name: "Peter Attia",
                    contentCategories: [
                        "health",
                        "medicine",
                        "longevity",
                        "nutrition",
                        "exercise"
                    ],
                    description: "Dr. Peter Attia is a physician and podcaster focusing on health, longevity, and performance. He discusses various health topics, including nutrition, exercise, and critical thinking.",
                    quantityFollowers: 469300,
                    claims: [
                        {
                            claimText: "Comparing the impact of fitness and nutrition on lifespan and healthspan: data showing fitness to be a more significant predictor of mortality than nutrition.",
                            datePosted: "2025-01-20T00:00:00.000Z",
                            postUrl: "https://www.radio.net/podcast/thepeterattiadrive",
                            categories: [
                                "health",
                                "nutrition"
                            ],
                            verificationStatus: "Verified",
                            sources: [
                                {
                                    url: "https://www.radio.net/podcast/thepeterattiadrive",
                                    title: "The Peter Attia Drive",
                                    _id: "678e90aee8145dbcd25734aa"
                                }
                            ],
                            _id: "678e90aee8145dbcd25734a9"
                        },
                        {
                            claimText: "The myth of a ‘best diet,’ factors that determine the effectiveness of a diet, and data suggesting benefits of the Mediterranean diet.",
                            datePosted: "2025-01-20T00:00:00.000Z",
                            postUrl: "https://www.radio.net/podcast/thepeterattiadrive",
                            categories: [
                                "nutrition"
                            ],
                            verificationStatus: "Verified",
                            sources: [
                                {
                                    url: "https://www.radio.net/podcast/thepeterattiadrive",
                                    title: "The Peter Attia Drive",
                                    _id: "678e90aee8145dbcd25734ac"
                                }
                            ],
                            id: "678e90aee8145dbcd25734ab"
                        },
                        {
                            claimText: "Practical considerations for individuals to identify the best diet for them: protein intake, energy balance, macronutrient adjustments, and micronutrient levels.",
                            datePosted: "2025-01-20T00:00:00.000Z",
                            postUrl: "https://www.radio.net/podcast/thepeterattiadrive",
                            categories: [
                                "nutrition"
                            ],
                            verificationStatus: "Verified",
                            sources: [
                                {
                                    url: "https://www.radio.net/podcast/thepeterattiadrive",
                                    title: "The Peter Attia Drive",
                                    _id: "678e90aee8145dbcd25734ae"
                                }
                            ],
                            _id: "678e90aee8145dbcd25734ad"
                        },
                        {
                            claimText: "The effects of ultra-processed foods on health.",
                            datePosted: "2025-01-20T00:00:00.000Z",
                            postUrl: "https://www.radio.net/podcast/thepeterattiadrive",
                            categories: [
                                "nutrition"
                            ],
                            verificationStatus: "Verified",
                            sources: [
                                {
                                    url: "https://www.radio.net/podcast/thepeterattiadrive",
                                    title: "The Peter Attia Drive",
                                    _id: "678e90aee8145dbcd25734b0"
                                }
                            ],
                            _id: "678e90aee8145dbcd25734af"
                        },
                        {
                            claimText: "Strategies to minimize microplastic exposure.",
                            datePosted: "2025-01-20T00:00:00.000Z",
                            postUrl: "https://peterattiamd.com/ama67/",
                            categories: [
                                "health",
                                "microplastics"
                            ],
                            verificationStatus: "Verified",
                            sources: [
                                {
                                    url: "https://peterattiamd.com/ama67/",
                                    title: "#332 - AMA #67: Microplastics, PFAS, and phthalates",
                                    _id: "678e90aee8145dbcd25734b2"
                                }
                            ],
                            _id: "678e90aee8145dbcd25734b1"
                        },
                        {
                            claimText: "The potential health risks of PFAS exposure.",
                            datePosted: "2025-01-20T00:00:00.000Z",
                            postUrl: "https://peterattiamd.com/ama67/",
                            categories: [
                                "health",
                                "PFAS"
                            ],
                            verificationStatus: "Verified",
                            sources: [
                                {
                                    url: "https://peterattiamd.com/ama67/",
                                    title: "#332 - AMA #67: Microplastics, PFAS, and phthalates",
                                    _id: "678e90aee8145dbcd25734b4"
                                }
                            ],
                            _id: "678e90aee8145dbcd25734b3"
                        },
                        {
                            claimText: "Practical steps to reduce exposure to phthalates in food, air, water, and personal care products.",
                            datePosted: "2025-01-20T00:00:00.000Z",
                            postUrl: "https://peterattiamd.com/ama67/",
                            categories: [
                                "health",
                                "phthalates"
                            ],
                            verificationStatus: "Verified",
                            sources: [
                                {
                                    url: "https://peterattiamd.com/ama67/",
                                    title: "#332 - AMA #67: Microplastics, PFAS, and phthalates",
                                    _id: "678e90aee8145dbcd25734b6"
                                }
                            ],
                            _id: "678e90aee8145dbcd25734b5"
                        }
                    ],
                    score: 200,
                    __v: 0
                }
                return {
                    statusCode: 200,
                    message: "success",
                    data: influencer
                }
            }, 3000); */
            return {
                stasusCode: 200,
                message: "success",
                data: influencer

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
        try {
            const searchResult = await perplexityService.searchInfluencer(name, filter, claimsNumber, token);
            if (searchResult.statusCode == 404) {
                return {
                    statusCode: 404,
                    message: `${params.name} is not an knowled health influencer.`
                };
            }
            if (searchResult.statusCode == 401) {
                return {
                    statusCode: 401,
                    message: "token invalid"
                }
            }
            if (searchResult.statusCode == 200) {
                return {
                    statusCode: 200,
                    message: "success",
                    data: searchResult.data
                }
            }
        } catch (error) {
            return {
                statusCode: 401,
                message: `Invalid Token`
            };
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

export default new InfluencerService();