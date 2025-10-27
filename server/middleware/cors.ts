export default defineEventHandler((event) => {
	setResponseHeaders(event, {
		"Access-Control-Allow-Origin": "https://almotamer.com",
		"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
		"Access-Control-Allow-Headers": "Content-Type, Authorization",
	});

	if (getMethod(event) === "OPTIONS") {
		event.node.res.statusCode = 204;
		event.node.res.end();
	}
});
