const Validator = require("fastest-validator");

const jobFunction = async (model, description, user, res) => {
  try {
    const data = {
      description,
      user,
    };
    //Validations
    const validatorData = new Validator();
    const schema = {
      description: { type: "string" },
      user: { type: "string" },
    };
    const check = validatorData.compile(schema);
    if (check(data) !== true) {
      return res
        .status(400)
        .json({ message: "Validation Errors", errors: check(data) });
    }

    //Add to database
    const response = await model.create(data);
    if (res.status(201) && response) {
      res.status(201).json({
        message: `Created successfully`,
      });
    } else {
      return res.status(404).json({
        message: "Error Occured!!! Could not be Created",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Could not be Created - Something went wrong",
      error: error.message,
    });
  }
};

module.exports = { jobFunction };
