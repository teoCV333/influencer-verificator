const Influencer = require("../models/influencerModel");

class InfluencerService {

    async addInfluencer(data) {
        return await Influencer.create(data);
    }

    async getAllInfluencers() {
        return await Influencer.find();
    }

    async getInfluencerByName(name) {
        return await Influencer.find({name: name});
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