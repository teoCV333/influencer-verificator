const claimsService = require("../services/claimsService");
const influencerService = require("../services/influencerService");

class InfluencerController {

    async addInfluencer(req, res) {
        try {
            const result = await influencerService.addInfluencer(req.body);
            res.status(201).json(result);
        } catch (err) {
            res.status(500).json({ message: err.message })
        }
    }

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
            const result = await influencerService.getInfluencerByName(req.params.name);
            res.status(201).json(result);
        } catch (err) {
            res.status(500).json({ message: err.message })
        }
    }

    async getInfluencerByCategory(req, res) {
        try {
            const result = await influencerService.getInfluencerByCategory(req.params.category);
            res.status(201).json(result);
        } catch (err) {
            res.status(500).json({ message: err.message })
        }
    }

    async addClaimsToInfluencer(req, res) {
        try {
            const { newClaims } = req.body;
            const result = await claimsService.addClaimsToInfluencer(req.params.influencerId, newClaims);
            res.status(201).json(result);
        } catch (err) {
            res.status(500).json({ message: err.message })
        }
    }

    /* async addVerificationStateToInfluencer(req, res) {
        try {
            const { verification } = req.body;
            const result = await claimsService.addVerificationStateToInfluencer(req.params.influencerId, verification);
            res.status(201).json(result);
        } catch (err) {
            res.status(500).json({ message: err.message })
        }
    } */
}

module.exports = new InfluencerController();