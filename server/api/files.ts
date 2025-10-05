import { ServerFile } from "nuxt-file-storage";

export default defineEventHandler(async (event) => {
	try {
		const query: { path: string; file: string } = getQuery(event);

		switch (event.method) {
			case "GET":
				if (query.path) return await getFilesLocally(query.path);
				return await getFilesLocally();

			case "POST":
				const { files } = await readBody<{ files: ServerFile[] }>(event);
				const result = [];
				for (const file of files) {
					const x = await storeFileLocally(file, 8);

					console.log(x);
					result.push(x);
				}
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
