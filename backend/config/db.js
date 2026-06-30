import { connect } from "mongoose";

const connectDB = async () => {
    try {
        const conn = await connect(process.env.MONGO_URI);

        console.log(`Database connesso: ${conn.connection.host}`);
    } catch (error) {
        console.error("Errore connessione al database:", error.message);
        process.exit(1);
    }
};

export default connectDB;
