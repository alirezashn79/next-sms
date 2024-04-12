const { connections, connect } = require("mongoose");

export default async function connectToDatabase() {
  try {
    if (connections[0].readyState) {
      return false;
    } else {
      await connect(process.env.DATABASE_URI);
      console.log("Conntect To DB Successfully :))");
    }
  } catch (err) {
    console.log("DB Connecction Error =>", err);
  }
}
