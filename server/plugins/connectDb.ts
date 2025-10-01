import mongoose from "mongoose";
let conn: typeof mongoose | null = null;

export async function connectDB() {
	const config = useRuntimeConfig();

	try {
		if (conn) return conn;

		if (!config.db_uri) {
			console.warn("⚠️  NUXT_DB_URI is not set. Database connection skipped.");
			return null;
		}

		console.log("❕ Connecting to database...");

		conn = await mongoose.connect(config.db_uri);
		console.log("✔ Database connected successfully");

		return conn;
	} catch (err) {
		console.error("❌ Database connection error:");
		console.error(err);

		setTimeout(connectDB, 10000);
	}
}

export default defineNitroPlugin(async () => {
	await connectDB();
});
