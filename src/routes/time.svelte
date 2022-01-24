<script>
	import { minutesToTimeStringMoment, minutesToTimeStringDateFns } from '$lib/util';

	let zones = ['Etc/UTC', 'Europe/Stockholm', 'America/Denver'];

	let date = '2020-01-01 00:00';
	let minutes = 1590;
</script>

<pre>{date}</pre>
<table>
	<thead>
		<tr>
			<td>input</td>
			<td>moment</td>
			<td>date-fns</td>
		</tr>
	</thead>
	{#each zones as zone}
		<tr>
			<td>{`${date}, ${minutes}, ${zone}`}</td>
			<td>
				<span>{minutesToTimeStringMoment(date, minutes, zone)}</span>
			</td>
			<td>
				<span>{minutesToTimeStringDateFns(date, minutes, zone)}</span>
			</td>
		</tr>
	{/each}
</table>
