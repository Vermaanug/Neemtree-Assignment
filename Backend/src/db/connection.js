import mongoose from "mongoose";

const ConnectDB = async () => {
  try {
    const ConnectionInstance = await mongoose.connect(
      "mongodb+srv://Anurag:Admin123@cluster1.vvtxal5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1/UserData"
    );
    console.log(
      `MongoDB Connected || DB Host : ${ConnectionInstance.connection.host}`
    );
  } catch (error) {
    console.log(`Error While Connecting to Database ${error}`);
  }
};

export default ConnectDB;