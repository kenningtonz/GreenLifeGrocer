import { cookies } from "next/headers";

export async function GET(request) {
	const cookieStore = cookies();
	const session = cookieStore.get("session");

	return new Response("Hello, Next.js!", {
		status: 200,
		headers: { "Set-Cookie": `session=${session}` },
	});
}
