const csv = require("csv-parser");
const fs = require("fs");

const uploadTransactions = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const rows = [];
    let columns = [];

    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on("headers", (headers) => {
        columns = headers;
      })
      .on("data", (data) => {
        if (rows.length < 20) {
          rows.push(data); // preview only first 20
        }
      })
      .on("end", () => {
        fs.unlinkSync(req.file.path); // cleanup temp file

        return res.status(200).json({
          message: "File parsed successfully",
          columns,
          preview: rows,
        });
      });
  } catch (error) {
    console.error("UPLOAD ERROR:", error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { uploadTransactions };
