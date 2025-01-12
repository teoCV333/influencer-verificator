const influencerService = require("../services/influencerService");
const { customHandleError } = require("../utils/errorHandler");
const { getInfluencerByNameSchema } = require("../validators/influencerValidator");
const {genericResponse} = require("../utils/genericResponse");
class InfluencerController {

    async getAllInfluencers(req, res) {
        try {
            const influencers = await influencerService.getAllInfluencers();
            return genericResponse(res, influencers);
        } catch (err) {
            return customHandleError(res, err);
        }
    }

    async getInfluencerByName(req, res) {
        try {
            const params = {
                name: req.params.name,
                filter: req.query.filter || undefined,
                token: req.headers.authorization?.split(" ")[1]
            }

            const {error} = getInfluencerByNameSchema.validate(params);

            if(error) {
                const errorResponse = {
                    status: 401,
                    message: error.details[0].message
                };
                return customHandleError(res, errorResponse);
            }

            const influencer = await influencerService.getInfluencerByName(params);
           
            return genericResponse(res, influencer);
        } catch (err) {
            return customHandleError(res, err);
        }
    }

}

module.exports = new InfluencerController();