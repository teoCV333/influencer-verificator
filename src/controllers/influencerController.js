const influencerService = require("../services/influencerService");
const { customHandleError } = require("../utils/errorHandler");
const { getInfluencerByNameSchema } = require("../validators/influencerValidator");
const { genericResponse } = require("../utils/genericResponse");

class InfluencerController {

    async addNewInfluencer(req, res) {
        try {
            const influencer = await influencerService.addInfluencer();
            return genericResponse(res, influencer);
        } catch (err) {
            return res.status(err.statusCode).json();
        }
    }

    async getAllInfluencers(req, res) {
        try {
            const influencers = await influencerService.getAllInfluencers();
            return genericResponse(res, influencers);
        } catch (err) {
            return customHandleError(res, err);
        }
    }

    async getInfluencerById(req, res) {
        try {
            const influencer = await influencerService.getInfluencerById(req.params.id);
            return genericResponse(res, influencer);
        } catch (err) {
            return customHandleError(res, err);
        }
    }

    async getInfluencerByName(req, res) {
        try {
            const params = {
                name: req.params.name,
                filter: req.query.filter || 'month',
                claimsNumber: req.query.claimsNumber || "50",
                token: req.headers.authorization?.split(" ")[1]
            }

            const { error } = getInfluencerByNameSchema.validate(params);
            
            let result = await influencerService.getInfluencerByName(params);

            if (error) {
                result = {
                    statusCode: 401,
                    message: error.details[0].message
                };
            }

            return genericResponse(res, result);
        } catch (err) {
            return res.status(err.statusCode).json();
        }
    }

    /* async searchNewInfluencerClaims(req, res) {
        try {
            const params = {
                id: req.params.id,
                name: req.query.name,
                filter: req.query.filter || 'month',
                claimsNumber: req.query.claimsNumber || 50,
                token: req.headers.authorization?.split(" ")[1]
            }

            const { error } = searchNewInfluencerClaimsSchema.validate(params);

            if (error) {
                const errorResponse = {
                    status: 400,
                    message: error.details[0].message
                };
                return customHandleError(res, errorResponse);
            }
            const results = await influencerService.searchNewClaimsWithAI(params);
            return genericResponse(res, influencer);
        } catch (err) {
            return customHandleError(res, err);
        }
    } */

}

module.exports = new InfluencerController();