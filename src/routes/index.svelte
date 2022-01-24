<script>
	import Slider from '@smui/slider';
	import Select, { Option } from '@smui/select';
	import SveltyPicker from 'svelty-picker';
	import { minutesToTimeStringDateFns, minutesToTimeStringMoment } from '$lib/util';
	import DataTable, { Head, Body, Row, Cell } from '@smui/data-table';
	import moment from 'moment-timezone';
	import * as dateFnsTz from 'date-fns-tz';

	const { format, utcToZonedTime } = dateFnsTz;

	let myDate = format(new Date(), 'yyyy-MM-dd HH:mm');
	let iana = ['Europe/London', 'Europe/Stockholm', 'America/Denver'];
	let zone = iana[0];
	let minutes = 0;

	$: date = new Date(Date.parse(myDate));
	$: fmtds = minutesToTimeStringDateFns(date, minutes, zone);
	$: mmtds = minutesToTimeStringMoment(date, minutes, zone);
</script>

<svelte:head>
	<title>Time testing lab</title>
</svelte:head>
<div>
	<h1>date-fns vs moment</h1>
</div>
<div>
	<Select bind:value={zone} name="ianas" label="IANA">
		{#each iana as i}
			<Option value={i}>{i}</Option>
		{/each}
	</Select>
</div>
<div>
	<SveltyPicker
		format="yyyy-mm-dd hh:ii"
		bind:value={myDate}
		inputClasses={'dtInput'}
		theme={'my-colors'}
		clearBtn={false}
	/>
</div>
<div>
	Date: {date}<br />IANA: {zone}
</div>
<div>
	<Slider
		bind:value={minutes}
		min={0}
		max={2000}
		step={15}
		input$aria-label="Minutes slider"
		style="width:50vw"
	/>
</div>
<div>
	Minutes: {minutes}
</div>
<div>
	<DataTable>
		<Head>
			<Row>
				<Cell />
				<Cell>date-fns</Cell>
				<Cell>moment.js</Cell>
			</Row>
		</Head>
		<Body>
			<Row>
				<Cell>UTC</Cell>
				<Cell>
					{format(utcToZonedTime(date, 'Etc/UTC'), 'PPPPp')}
				</Cell>
				<Cell>
					{moment(date).tz('Etc/UTC').format('LLLL')}
				</Cell>
			</Row>
			<Row>
				<Cell>Browser</Cell>
				<Cell>
					{format(date, 'PPPPp')}
				</Cell>
				<Cell>
					{moment(date).format('LLLL')}
				</Cell>
			</Row>
			<Row>
				<Cell>{zone}</Cell>
				<Cell>
					{format(utcToZonedTime(date, zone), 'PPPPp')}
				</Cell>
				<Cell>
					{moment(date).tz(zone).format('LLLL')}
				</Cell>
			</Row>
			<Row>
				<Cell>minutes to time</Cell>
				<Cell>
					{fmtds}
				</Cell>
				<Cell>
					{mmtds}
				</Cell>
			</Row>
		</Body>
	</DataTable>
</div>

<style>
	:global(.dtInput) {
		background-color: black;
		font-size: 1.2em;
		border: none;
		border-bottom: solid 1px #333;
		color: white;
	}

	:global(.my-colors) {
		--sdt-primary: #998825;
		--sdt-color: #eee;
		--sdt-color-selected: #eee;
		--sdt-bg-main: #333;
		--sdt-bg-today: var(--sdt-primary);
		--sdt-bg-clear: #dc3545;
		--sdt-today-bg: rgb(160, 145, 57);
		--sdt-today-color: var(--sdt-color-selected);
		--sdt-clear-color: #dc3545;
		--sdt-btn-bg-hover: rgb(126, 35, 78);
		--sdt-btn-header-bg-hover: rgb(107, 18, 60);
		--sdt-clock-bg: #eeeded;
		--sdt-clock-bg-minute: #eeeded;
		--sdt-clock-bg-shadow: 0 0 128px 2px #74661834 inset;
		--sdt-shadow: #ccc;
	}
</style>
