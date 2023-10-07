import mongoose, { ConnectOptions } from "mongoose";

const optMongo  = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

export const connectDB = () => {
    const mongoUrl = process.env.MONGODB_URL as string
    mongoose.connect(mongoUrl, optMongo as ConnectOptions).then(
        () => console.log("DB is connected"),
        (err) => {
            throw new Error(err);
        }
    );
};

export const closeConnectDB = () => {
    mongoose.connection.close()
};
