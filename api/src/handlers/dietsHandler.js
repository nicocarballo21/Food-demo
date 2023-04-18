const {
  getAllDiets,
  getDietsInApi,
} = require("../controllers/dietsControllerDB");

const getDietsHandler = async (req, res) => {
  try {
    const getDiets = await getAllDiets();
    res.status(200).json(getDiets);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

module.exports = { getDietsHandler };
