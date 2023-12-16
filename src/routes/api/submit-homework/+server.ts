import { UPLOAD_ENDPOINT } from '$env/static/private';
import { sendDummyTextFileToGoogleDrive } from '$src/lib/utils.js';

export async function POST({ request, url }) {
	const referringUrl = request.headers.get('Referer') as string;

	const dynamicStatus = parseInt(url.searchParams.get('status') as string);

	// console.log('sveltekit POST function hit at "/api/submit-homework/+server.ts" ');
	try {
		// this post request dummy function works on all deployments, including Cloudflare pages
		sendDummyTextFileToGoogleDrive('derpa');

		// code below still not processed by CF pages, but works on Netlify and Vercel. Apparently CF pages allow native form submission with files ... which is why I have to use client-side 'dropzone' file submitter
		const formData = await request.formData();

		if (formData instanceof FormData) {
			const files: File[] = [];
			for (const value of formData.values()) {
				if (value instanceof File) files.push(value);
			}

			let count = 0;
			let filesInfo = '';

			for (let file of files) {
				filesInfo += `${count + 1}. ${file.name} (${file.size} B); `;
				count++;

				let data = new FormData();
				data.append('file', file, file.name);
				await fetch(UPLOAD_ENDPOINT, {
					method: 'POST',
					body: data
				});
			}

			let message = `${count} file(s) uploaded successfully: ${filesInfo}.`;

			console.log(message);

			const response = new Response(JSON.stringify({ success: true, message: message }), {
				status: dynamicStatus,
				headers: {
					'Content-Type': 'application/json',
					location: referringUrl
				}
			});

			return response;
		} else {
			return new Response(JSON.stringify({ error: true, message: 'No form data found.' }), {
				status: 400,
				headers: {
					'Content-Type': 'application/json'
				}
			});
		}
	} catch (error) {
		return new Response(
			JSON.stringify({ error: true, message: 'An error occurred while uploading the file.' }),
			{
				status: 500,
				headers: {
					'Content-Type': 'application/json'
				}
			}
		);
	}
}
