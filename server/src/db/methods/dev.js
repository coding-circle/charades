import mongoose from "mongoose";
import _shuffle from "lodash/shuffle";

import PartyModel from "../model";

// dev methods
const getAllParties = () => {
  return PartyModel.find();
};
const deleteParty = (slug) => {
  return PartyModel.deleteOne({ slug });
};
const clearParties = () => {
  return PartyModel.deleteMany({});
};

export default {
  getAllParties,
  deleteParty,
  clearParties,
};
