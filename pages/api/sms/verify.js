import connectToDatabase from "@/configs/db";
import otpModel from "@/models/otp";

export default async function handler(req, res) {
  if (req.method !== "POST") return;
  console.log(req.body);
  try {
    const { phone, code } = req.body;

    if (!phone.trim() || !code.trim()) {
      return res.status(422).json({ message: "data is invalid...!" });
    }

    await connectToDatabase();

    const otpCode = await otpModel.findOne().where({ phone, code });

    if (!otpCode) {
      return res.status(409).json({ message: "otp code is invalid...!" });
    }

    const date = Date.now();

    if (otpCode.expTime < date) {
      return res.status(410).json({ message: "otp code is expired...!" });
    }

    await otpModel.findByIdAndDelete(otpCode._id);
    return res.status(200).json({ message: "otp is corrent :))" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "unknown internal server error...!", data: error });
  }
}
