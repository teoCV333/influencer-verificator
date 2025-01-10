const Influencer = require("../models/influencerModel");

class InfluencerService {

    async addInfluencer(data) {
        return await Influencer.create(data);
    }

}

modules.exports = new InfluencerSercvice();