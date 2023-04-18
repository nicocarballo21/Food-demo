const {
  getAllDiets,
  saveDietsInDB,
} = require("../controllers/dietsControllerDB");

const getDietsHandler = async (req, res) => {
  try {
    const getDiets = await getAllDiets();
    res.status(200).json(getDiets);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

const hydrateDiets = async (req, res) => {
  try {
    const res = await saveDietsInDB;

    if (res.error) {
      return res.status(400).json({ message: err });
    }
    return res.status(200).json(res);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

module.exports = { getDietsHandler, hydrateDiets };
