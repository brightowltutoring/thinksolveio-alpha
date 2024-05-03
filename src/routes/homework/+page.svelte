<script lang="ts">
	import { IconUpload } from '@/components/icons';
	import { modals } from '@/components/root/';
	// import { modals } from '@/components/root/Navbar.svelte';
	import { onMount } from 'svelte';

	// TODO: unsure of this utility again
	let mounted = false;
	let status = 302;

	onMount(() => {
		mounted = true;
		status = 200;
	});

	function homeworkModalOpenAndClickDropzone() {
		modals.open('homework');

		//TODO: potential race condition if dropzone modal not opened 'in time' for click event
		// TODO:(feb 8 20224) still need or not?
		// document.querySelector('.dropzone')!.dispatchEvent(new CustomEvent('click'));
	}
</script>

<button
	onclick={homeworkModalOpenAndClickDropzone}
	aria-label="Upload Button Area"
	class="submitArea mx-auto flex h-[60vh] w-[65vw] flex-wrap items-center justify-center overflow-scroll backdrop-blur-3xl sm:w-[60vw]"
>
	<label for="file" class="w-[60vw]">
		<div class="flex w-[100%] flex-col items-center justify-center">
			<div class="animate-pulse">
				<IconUpload />
			</div>

			<!-- use:enhance -->

			<noscript>
				<form
					enctype="multipart/form-data"
					method="POST"
					class="{mounted ? 'hidden' : 'flex'} flex-col items-center justify-center gap-5"
					action={`/api/submit-homework?status=${status}`}
				>
					<!-- target="dummyframe" -->
					<!-- <iframe name="dummyframe" id="dummyframe" style="display: none;" title="dummy iframe" /> -->
					<label for="file" class="flex items-center justify-center text-lg sm:w-[60vw]">
						<input
							onclick={(e) => mounted && e.preventDefault()}
							class="hidden px-5"
							type="file"
							name="file"
							id="file"
							multiple
						/>
					</label>

					<label
						tabindex="-1"
						for="submit"
						class="border-1 group group rounded-lg bg-red-800 p-3 text-white transition-colors duration-500 hover:bg-blue-400 focus:animate-wave focus:bg-emerald-500"
					>
						<p class="block group-focus:!hidden">submit</p>
						<p class="hidden group-focus:!block">success</p>

						<input class="hidden" type="submit" value="Submit" id="submit" />
					</label>
				</form>
			</noscript>
		</div>
	</label>
</button>

<style>
	:root {
		--light-box-shadow-color: #ddd;
		--dark-box-shadow-color: #1d1c43;
	}
	.submitArea {
		box-shadow: inset 0 -10px 10px var(--light-box-shadow-color);
		border-radius: 50px;
		border-color: transparent;
		background-color: transparent;
		cursor: pointer;
	}

	:global(html.dark) .submitArea {
		box-shadow: inset 0 -10px 10px var(--dark-box-shadow-color);
	}
</style>
