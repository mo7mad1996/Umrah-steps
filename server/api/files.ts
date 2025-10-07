import { ServerFile } from "nuxt-file-storage";

export default defineEventHandler(async (event) => {
	try {
		const query: { path?: string; file: string } = getQuery(event);
		const { mount } = useRuntimeConfig(event);

		switch (event.method) {
			case "GET":
				if (query.path) return getFileLocally(query.path);
				return await getFilesLocally();

			case "POST":
				const { files } = await readBody<{ files: ServerFile[] }>(event);
				const result = [];
				for (const file of files) {
					const x = await storeFileLocally(file, 18, query.path);

					result.push(
						[mount, (query.path || "").replace(/^\/+|\/+$/g, ""), x]
							.join("/")
							.replace("./public", ""),
					);
				}

				// fullPath
				return result;

			case "DELETE":
				if (query.file) return await deleteFile(query.file);
				throw createError({
					message: "file query is required.",
					status: 400,
				});

			default:
				throw createError({
					message: "method is not allowed.",
					status: 405,
				});
		}
	} catch (err: any) {
		return err;
	}
});
