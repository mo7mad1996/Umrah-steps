import mongoose from "mongoose"
const config = useRuntimeConfig()
let conn: typeof mongoose | null = null

export async function connectDB() {
  try {
    if (conn) return conn
    console.log("❕ connecting...")

    conn = await mongoose.connect(config.db_uri)
    console.log("✔ database connected successful")

    return conn
  } catch (err) {
    console.error("❌ Error can not connect")
    console.error(err)

    setTimeout(connectDB, 10000)
  }
}

export default defineNitroPlugin(connectDB)

