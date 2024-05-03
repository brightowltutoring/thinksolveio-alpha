import { dev } from '$app/environment';
import Dropzone, { type DropzoneFile, type DropzoneOptions } from 'dropzone';
import { PUBLIC_UPLOAD_ENDPOINT } from '$env/static/public';
import { modals } from '@/components/root/';
// import { modals } from '@/components/root/Navbar.svelte';

// WIP?
import { get, writable } from 'svelte/store';


const popUpOnceBoolean$ = writable(false);
const submitOnce$ = writable(false);

// oct22,2023: during development 'PUBLIC_UPLOAD_ENDPOINT' started giving CORS issues..
const dropzoneUrl = dev ? '/' : PUBLIC_UPLOAD_ENDPOINT;

let dropzone: Dropzone;
const dropzoneOptions: DropzoneOptions = {
	url: dropzoneUrl,
	acceptedFiles: '.heic,.jpeg,.jpg,.png,.txt,.pdf,.docx,.doc'
};

export function hydrateDropzoneDomEls(target: Element | HTMLElement) {
	dropzone = new Dropzone(target as HTMLElement, dropzoneOptions);

	handleErroredUploads(dropzone);
}

// Collect 'errored' files, which are of the acceptable type ... and reprocess files when internet comes back.
// Tested use cases: internet cuts out mid-upload, and internet off when upload started.

let queuecompleteTimeout: NodeJS.Timeout;

async function handleErroredUploads(DROPZONE_INSTANCE: Dropzone) {
	try {
		let filesToRetry: Array<any> = [];
		DROPZONE_INSTANCE.on('error', (file: DropzoneFile) => file.accepted && filesToRetry.push(file));

		DROPZONE_INSTANCE.on('queuecomplete', () => {
			if (queuecompleteTimeout) clearTimeout(queuecompleteTimeout);
			queuecompleteTimeout = setTimeout(() => {
				modals.closeAll();
				// modals.close('homework');
				// homeworkModalOpen.set(false);
			}, 1000);
		});

		window?.addEventListener('online', () => {
			if (!(filesToRetry.length > 0)) return;

			for (const file of filesToRetry) {
				DROPZONE_INSTANCE.processFile(file);

				// removes error mark css after the files have been processed
				file.previewElement.querySelector('.dz-error-mark').style.visibility = 'hidden';
				// removes error message css after the files have been processed
				file.previewElement.querySelector('.dz-error-message').style.visibility = 'hidden';
			}

			// reset collected files array when done
			filesToRetry.length === 0;
		});
	} catch (error) {
		console.log('error', error);
	}
}

let dropzonePopUpOnceTimeout: NodeJS.Timeout;

export function dropzonePopUpOnce() {
	if (get(popUpOnceBoolean$) === true) return;

	popUpOnceBoolean$.set(true);

	dropzonePopUpOnceTimeout = setTimeout(dispatchClickOnDropzone, 75);

	function dispatchClickOnDropzone() {
		if (dropzonePopUpOnceTimeout) clearTimeout(dropzonePopUpOnceTimeout);
		document.querySelector('.dropzone')?.dispatchEvent(new CustomEvent('click'));
	}
}

// based on previous function 'PostDummyOnce()'
export async function getIframeSrcAndPostDummyOnce() {
	// if (get(homeworkModalOpen) === true && get(submitOnce$) === false) {
	if (modals.homework && get(submitOnce$) === false) {
		submitOnce$.set(true);
		postDummyTextFileToGoogleDrive('foo');

		let iframeSrc = '';

		return new Promise<string>((resolve) => {
			setTimeout(async () => {
				const { PUBLIC_GOOGLE_APP_SCRIPT } = await import('$env/static/public');
				iframeSrc = PUBLIC_GOOGLE_APP_SCRIPT;
				resolve(iframeSrc);
			}, 5000);
		});
	}
}

async function postDummyTextFileToGoogleDrive(name: string) {
	// const { PUBLIC_UPLOAD_ENDPOINT } = await import('$env/static/public');
	const data = new FormData();
	const file = new File([`${name}`], `${name}.txt`, {
		type: 'text/plain'
	});
	data.append('file', file);

	await fetch(PUBLIC_UPLOAD_ENDPOINT, {
		method: 'POST',
		body: data
	});
}
