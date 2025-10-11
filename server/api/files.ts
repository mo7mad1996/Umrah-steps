import { put, del, list } from "@vercel/blob";

export default defineEventHandler(async (event) => {
	try {
		const query = getQuery(event) as { path?: string; file?: string };

		switch (event.method) {
			case "GET": {
				const blobs = await list();
				return blobs.blobs.map((b) => b.url);
			}

			case "POST": {
				const { files } =
					event.method === "POST"
						? await readBody<{ files: { name: string; content: string }[] }>(event)
						: { files: [] };

				const result: string[] = [];
				for (const file of files) {
					// decode base64 to buffer
					const buffer = Buffer.from(file.content.split(",")[1], "base64");
					const blob = await put(`${query.path || ""}/${file.name}`, buffer, { access: "public" });
					result.push(blob.url);
				}
				return result;
			}

			case "DELETE": {
				if (!query.file) throw createError({ status: 400, message: "file query is required." });

				await del(query.file);
				return { success: true };
			}

			default:
				throw createError({ status: 405, message: "method not allowed" });
		}
	} catch (err: any) {
		throw createError(err.message);
	}
});
