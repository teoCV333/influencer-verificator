import influencerService from "../services/influencerService.js";
import {
  getInfluencerByNameSchema,
  searchNewInfluencerClaimsSchema,
} from "../validators/influencerValidator.js";
import { genericResponse } from "../utils/genericResponse.js";
import { errorHandler } from "../utils/errorHandler.js";
import { ValidationError } from "../utils/errors.js";

export default class InfluencerController {
  async addNewInfluencer(req, res) {
    try {
      const influencer = await influencerService.addInfluencer();
      return genericResponse(res, influencer);
    } catch (err) {
      errorHandler(res, err);
    }
  }

  async getAllInfluencers(req, res) {
    try {
      const influencers = await influencerService.getAllInfluencers();
      return genericResponse(res, influencers);
    } catch (err) {
      errorHandler(res, err);
    }
  }

  async getInfluencerById(req, res) {
    try {
      const influencer = await influencerService.getInfluencerById(
        req.params.id
      );
      return genericResponse(res, influencer);
    } catch (err) {
      errorHandler(res, err);
    }
  }

  async getInfluencerByName(req, res) {
    try {
      const params = {
        name: req.params.name,
        filter: req.query.filter || "month",
        claimsNumber: req.query.claimsNumber || "50",
        token: req.headers.authorization?.split(" ")[1],
      };

      const { error } = getInfluencerByNameSchema.validate(params);

      if (error) {
        throw new ValidationError("invalid values");
      }

      const influencer = await influencerService.getInfluencerByName(params);

      return genericResponse(res, influencer);
    } catch (err) {
      errorHandler(res, err);
    }
  }

  /*  async searchNewInfluencerClaims(req, res) {
    try {
      const params = {
        id: req.params.id,
        name: req.query.name,
        filter: req.query.filter || "month",
        claimsNumber: req.query.claimsNumber || 50,
        token: req.headers.authorization?.split(" ")[1],
      };

      const { error } = searchNewInfluencerClaimsSchema.validate(params);

      if (error) {
        //error hand
      }
      const results = await influencerService.searchNewClaimsWithAI(params);
      return genericResponse(res, influencer);
    } catch (err) {
      throw Error();
    }
  } */
}
