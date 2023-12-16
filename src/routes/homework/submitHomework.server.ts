import type { RequestEvent } from '@sveltejs/kit';
import { UPLOAD_ENDPOINT } from '$env/static/private';

export async function submitHomeworkAction(event: RequestEvent) {
	console.log('🚀 submitHomeworkAction hit in submitHomework.server.ts');

	try {
		const formData = await event.request.formData();

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

		let message = `${count} file(s) uploaded successfully: ${filesInfo}. Uploaded to: ${UPLOAD_ENDPOINT}`;

		console.log(message, event.url.pathname);

		return { success: true };
	} catch (error) {
		console.log('error', error);
		return { error: error };
	}
}

// export async function submitHomework(event: RequestEvent) {
// 	console.log('submitHomework action hit');
// 	const formData = await event.request.formData();

// 	const files = formData.getAll('file') as File[];

// 	// NEW METHOD:  all fetches done "in parallel" with Promise.all logic
// 	uploadInParallel().catch((e) => console.log('This upload failed', e));

// 	async function uploadInParallel() {
// 		const uploadsTodo = files.map((file) => {
// 			try {
// 				uploadSingle(file);
// 			} catch (error) {
// 				error;
// 				console.log('error', error);
// 			}
// 		});

// 		return await Promise.all(uploadsTodo);
// 	}

// 	async function uploadSingle(file: File) {
// 		let data = new FormData();
// 		data.append('file', file, file.name);
// 		fetch(UPLOAD_ENDPOINT, {
// 			method: 'POST',
// 			body: data
// 		});
// 	}
// 	return { success: true };
// }
