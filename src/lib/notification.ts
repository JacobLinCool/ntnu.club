import { writable } from 'svelte/store';

export interface Publish {
	message: string;
	type: 'success' | 'error' | 'info' | 'warning';
	duration?: number;
}

export interface Notify extends Publish {
	id: number;
	duration: number;
	timer: number;
}

export const notifies = writable<Notify[]>([]);

export function publish(pub: Publish): Notify {
	const notify: Notify = {
		...pub,
		duration: pub.duration || 5000,
		timer: 0,
		id: Date.now() * 100 + Math.floor(Math.random() * 100)
	};

	const timer = setTimeout(() => {
		notifies.update((notifies) => notifies.filter((n) => n !== notify));
	}, notify.duration || 5000);
	notify.timer = timer as unknown as number;

	notifies.update((notifies) => [...notifies, notify]);

	return notify;
}

export function dismiss(id: number) {
	notifies.update((notifies) => notifies.filter((n) => n.id !== id));
}
