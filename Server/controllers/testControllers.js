const testController = (req, res) => {
  res.json({
    message: "API working successfully"
  });
};

module.exports = { testController };