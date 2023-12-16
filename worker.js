// import { POSTGRES_SUPABASE_URL } from '$env/static/private';
import postgres from 'postgres';

// Initialize the PostgreSQL client
const sql = postgres(
	// const sql = postgres(import.meta.VITE_POSTGRES_SUPABASE_URL, {
	'postgresql://postgres:J8zYUHcttGzv9Aij@db.jymuxqjjlqvsutkoqkee.supabase.co:5432/postgres',
	{
		ssl: 'require',
		connect_timeout: 10000
	}
);

// Define a Cloudflare Worker route to handle database queries
addEventListener('fetch', (event) => {
	event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
	try {
		// Handle non POST request as invalid
		if (request.method !== 'POST') {
			return new Response('Invalid request', {
				status: 400
			});
		}

		// ... otherwise handle POST request
		const requestBody = await request.text();
		const { query, params } = JSON.parse(requestBody);

		// Execute the SQL query with parameters
		const result = await sql(query, ...params);

		// Return the query result as JSON response
		return new Response(JSON.stringify(result), {
			headers: {
				'Content-Type': 'application/json'
			}
		});
	} catch (error) {
		// Handle errors gracefully
		return new Response('Error executing the query', {
			status: 500
		});
	}
}

// async function handleRequestOrig(request) {
// 	try {
// 		// Check if the request method is POST
// 		if (request.method === 'POST') {
// 			const requestBody = await request.text();
// 			const { query, params } = JSON.parse(requestBody);

// 			// Execute the SQL query with parameters
// 			const result = await sql(query, ...params);

// 			// Return the query result as JSON response
// 			return new Response(JSON.stringify(result), {
// 				headers: {
// 					'Content-Type': 'application/json'
// 				}
// 			});
// 		} else {
// 			// Handle other HTTP methods or invalid requests
// 			return new Response('Invalid request', {
// 				status: 400
// 			});
// 		}
// 	} catch (error) {
// 		// Handle errors gracefully
// 		return new Response('Error executing the query', {
// 			status: 500
// 		});
// 	}
// }
