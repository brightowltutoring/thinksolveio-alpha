// // METHOD 1:

// import { POSTGRES_SUPABASE_URL } from '$env/static/private';
// import postgres from 'postgres';

// export const sql = postgres(POSTGRES_SUPABASE_URL, {
// 	ssl: 'require',
// 	connect_timeout: 10000
// });

// // METHOD 2:
// import { POSTGRES_SUPABASE_URL } from '$env/static/private';
// import pkg from 'pg';
// const { Pool } = pkg;

// const pooledConnection = new Pool({
// 	connectionString: POSTGRES_SUPABASE_URL
// });

// export const db = {
// 	query: async (text: string, params: any[] = []) => {
// 		const res = await pooledConnection.query(text, params);
// 		return res;
// 		// return res.rows;
// 	}
// };

// // METHOD 3:

// import pkg from 'pg';
// const { Client } = pkg;
// let client; // Declare a variable to hold the client instance

// // Function to get or create the client instance
// function getClient() {
// 	if (!client) {
// 		client = new Client({
// 			connectionString: POSTGRES_SUPABASE_URL
// 		});
// 		client.connect(); // Establish the connection
// 	}
// 	return client;
// }

// export async function executeQuery(query: string) {
// 	const dbClient = getClient(); // Get the client instance

// 	try {
// 		const result = await dbClient.query(query);
// 		return result.rows;
// 	} catch (error) {
// 		console.error('Error:', error);
// 		throw error;
// 	}
// }
