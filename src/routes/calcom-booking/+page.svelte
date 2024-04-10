<script lang="ts">
	import { page } from '$app/stores';

	const search = Object.fromEntries($page.url.searchParams);

	console.log($page.url);
	console.log(search);
	console.log(search.extra);

	// const start = new Date('2024-02-09T16:30:00.000Z').getTime();
	const start = new Date(search.startTime).getTime(); //ms
	const end = new Date(search.endTime).getTime(); //ms

	const dur_in_min = (end - start) * (1 / 1000) * (1 / 60);
	const dur_in_hr = (end - start) * (1 / 1000) * (1 / 60) * (1 / 60);
	const dur_in_hr_fixed = dur_in_hr.toFixed(2);

	const dur_in_hr_fixed_to_min = Math.floor(+dur_in_hr_fixed * 60);

	console.log('dur_in_hr_fixed', dur_in_hr_fixed);
</script>

<p>dur_in_hr: {dur_in_hr}</p>
<p>dur_in_hr_fixed: {dur_in_hr_fixed}</p>
<p>dur_in_min: {dur_in_min}</p>
<p>dur_in_hr_fixed_to _min: {dur_in_hr_fixed_to_min}</p>
