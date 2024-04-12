const { Schema, models, model } = require("mongoose");

const otpSchema = new Schema(
  {
    phone: {
      type: String,
      required: true,
    },

    code: {
      type: String,
      required: true,
    },

    expTime: {
      type: Number,
      required: true,
    },

    useTimes: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const otpModel = models.Otp || model("Otp", otpSchema);

module.exports = otpModel;
