export type User_credentials = {
  email: string
  password: string
}

export type User_DB_Schema = User_credentials & {
  name: string
  phone?: string
  role: "user" | "admin"
}

export type default_schema = {
  id: string
  createdAt: Date
  updatedAt: Date
}
