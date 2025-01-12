const influencerService = require("../services/influencerService");
const {genericResponse} = require("../utils/genericResponse");
class InfluencerController {

    async getAllInfluencers(req, res) {
        try {
            const result = await influencerService.getAllInfluencers();
            res.status(201).json(result);
        } catch (err) {
            res.status(500).json({ message: err.message })
        }
    }

    async getInfluencerByName(req, res) {
        try {
            const influencer = await influencerService.getInfluencerByName(req.params);
            const result = genericResponse(influencer);
            res.status(result.status.code).json(result);
        } catch (err) {
            res.status(500).json({ message: err.message })
        }
    }

}

module.exports = new InfluencerController();