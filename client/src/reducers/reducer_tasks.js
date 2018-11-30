import { tasks } from '../resource/tasks_pygen_grouped';

const orders = [
	[0, 1, 2],
	[0, 2, 1],
	[2, 1, 0],
	[2, 0, 1],
	[1, 2, 0],
	[1, 0, 2],
];

const order = orders[Math.floor(Math.random() * orders.length)];
const task = [tasks[order[0]], tasks[order[1]], tasks[order[2]]];

export default function() {
	return [...task[0], ...task[1], ...task[2]];
}
