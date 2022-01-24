import moment from 'moment-timezone';
import { getDay, addMinutes } from 'date-fns';
import * as dateFnsTz from 'date-fns-tz';

const { format, utcToZonedTime } = dateFnsTz;

export function minutesToTimeStringMoment(day, minutes, timezone) {
	const utcDay = moment.tz(day, 'Etc/UTC');
	const utcDayOfWeek = utcDay.isoWeekday() % 7;
	const offsetDay = moment.tz(day, timezone).add(minutes, 'minutes');
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

export function minutesToTimeStringDateFns(day, minutes, timezone) {
	const utcDay = utcToZonedTime(day, 'Etc/UTC');
	const utcDayOfWeek = getDay(utcDay) % 7;
	const offsetDay = addMinutes(utcToZonedTime(day, timezone), minutes);
	const offsetDayOfWeek = getDay(offsetDay) % 7;
	let suffix = '';
	if (utcDayOfWeek !== offsetDayOfWeek) {
		if ((utcDayOfWeek + 1) % 7 === offsetDayOfWeek) {
			suffix = ' (+1)';
		} else {
			suffix = ' (-1)';
		}
	}
	return format(offsetDay, 'HH:mm') + suffix;
}
