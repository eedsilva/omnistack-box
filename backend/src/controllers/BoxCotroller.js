const Box = require("../models/Box");

class BoxController {
  async store(req, res) {
    const box = await Box.create(req.body);

    res.json(box);
  }

  async show(req, res) {
    const { id } = req.params;

    const box = await Box.findById(id).populate('files');

    return res.json(box);
  }
}

module.exports = new BoxController();
