export function alphabet2number(a: string): number {
	let result = 0;
	for (let i = 0; i < a.length; i++) {
		const charCode = a.charCodeAt(i) - 97; // 'a' has a char code of 97
		result = result * 26 + (charCode + 1);
	}
	return result - 1;
}

export function number2alphabet(n: number): string {
	let result = '';
	n++; // Convert zero-based to one-based for easier calculations
	while (n > 0) {
		n--; // Adjust for zero-based indexing
		const remainder = n % 26;
		result = String.fromCharCode(97 + remainder) + result;
		n = Math.floor(n / 26);
	}
	return result;
}
