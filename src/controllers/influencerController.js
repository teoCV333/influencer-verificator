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
}

modules.exports = new InfluencerController();