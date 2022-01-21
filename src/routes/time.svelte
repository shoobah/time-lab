<script>
	import moment from 'moment-timezone';
	import { getDay, addMinutes } from 'date-fns';
	import { zonedTimeToUtc, format, toDate, utcToZonedTime, formatInTimeZone } from 'date-fns-tz';

	let zones = ['Etc/UTC', 'Europe/Stockholm', 'America/Denver'];

	function minutesToTimeStringMoment(day, minutes, timezone) {
		console.log('moment:', timezone);
		const utcDay = moment.tz(day, 'Etc/UTC');
		console.log('moment:', utcDay.format('LLL z'));
		const utcDayOfWeek = utcDay.isoWeekday() % 7;
		const offsetDay = moment.tz(day, timezone).add(minutes, 'minutes');
		console.log('moment:', offsetDay.format('LLL z'));
		const offsetDayOfWeek = offsetDay.isoWeekday() % 7;
		let suffix = '';
		if (utcDayOfWeek !== offsetDayOfWeek) {
			if ((utcDayOfWeek + 1) % 7 === offsetDayOfWeek) {
				suffix = ' (+1)';
			} else {
				suffix = ' (-1)';
			}
		}
		return offsetDay.format('HH:mm') + suffix;
	}

	function minutesToTimeStringDateFns(day, minutes, timezone) {
		console.log('fns:', timezone);
		const utcDay = utcToZonedTime(day, { timeZone: 'Etc/UTC' });
		console.log('fns:', utcDay);
		const utcDayOfWeek = getDay(utcDay) % 7;
		const offsetDay = addMinutes(utcToZonedTime(day, timezone), minutes);
		console.log('fns:', offsetDay);
		const offsetDayOfWeek = getDay(offsetDay) % 7;
		let suffix = '';
		if (utcDayOfWeek !== offsetDayOfWeek) {
			if ((utcDayOfWeek + 1) % 7 === offsetDayOfWeek) {
				suffix = ' (+1)';
			} else {
				suffix = ' (-1)';
			}
		}
		return format(offsetDay, 'Pp') + suffix;
	}

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
