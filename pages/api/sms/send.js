import connectToDatabase from "@/configs/db";
import otpModel from "@/models/otp";

const request = require("request");

export default async function handler(req, res) {
  if (req.method !== "POST") return;

  const { phone } = req.body;
  const code = Math.floor(Math.random() * 90000) + 10000;
  const expTime = new Date().getTime() + 60000;

  request.post(
    {
      url: "http://ippanel.com/api/select",
      body: {
        op: "pattern",
        user: process.env.WEB_SERVICE_USERNAME,
        pass: process.env.WEB_SERVICE_PASS,
        fromNum: "3000505",
        toNum: phone,
        patternCode: process.env.PATTERN_CODE,
        inputData: [{ "verification-code": code }],
      },
      json: true,
    },
    async function (error, response, body) {
      if (!error && response.statusCode === 200) {
        //YOU‌ CAN‌ CHECK‌ THE‌ RESPONSE‌ AND SEE‌ ERROR‌ OR‌ SUCCESS‌ MESSAGE
        await connectToDatabase();

        await otpModel.create({
          phone,
          code,
          expTime,
          useTimes: 1,
        });

        return res.status(201).json({ message: "code sent successfully" });
      } else {
        return res
          .status(500)
          .json({ message: "error sending code...!", error });
      }
    }
  );
}
