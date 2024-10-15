import { alphabet2number } from './utils';

export function parseId(id: string): number {
	const num = parseInt(id);
	if (!isNaN(num)) return num;
	return alphabet2number(id);
}

export * from './constant';
export * from './event';
export * from './utils';
