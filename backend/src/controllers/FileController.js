const Box = require("../models/Box");
const File = require("../models/File");

class FileController {
  async store(req, res) {
    const { id } = req.params;
    const box = await Box.findById(id);

    const { originalname, key } = req.file;
    const file = await File.create({
      title: originalname,
      path: key
    });

    box.files.push(file);

    await box.save();


    req.io.sockets.in(box._id).emit('file', file);
    
    res.json(file);
  }
}

module.exports = new FileController();
