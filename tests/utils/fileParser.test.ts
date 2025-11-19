import { describe, it, expect } from 'vitest';
import { parseFile } from '@/utils/fileParser';
import type { CashEntry } from '@/types/finance';

describe('parseFile', () => {
	it('correctly parses a valid json file', async () => {
		const entries: CashEntry[] = [
			{
				id: '1',
				amount: 300,
				date: '2025-01-01T00:00:00.000Z',
				type: 'income',
				source: 'salary'
			}
		];

		const file = new File([JSON.stringify(entries)], 'data.json', {
			type: 'applications/json'
		});

		const result = await parseFile(file);

		expect(result.success).toBe(true);

		if (result.success) {
			expect(result.data).toHaveLength(1);
			expect(result.data[0].amount).toBe(300);
			expect(result.data[0].type).toBe('income');
		}
	});

	it('correctly parses a valid CSV file', async () => {
		const csv = 'amount,date,type,source,note\n100,2025-01-01,income,Salary,Monthly';
		const file = new File([csv], 'data.csv', { type: 'text/csv' });
		const result = await parseFile(file);

		expect(result.success).toBe(true);
		if (result.success) {
			expect(result.data).toHaveLength(1);
			expect(result.data[0].amount).toBe(100);
			expect(result.data[0].note).toBe('Monthly');
		}
	});

	it('returns error for unsupported file format', async () => {
		const file = new File(['irrelevant'], 'data.txt', { type: 'text/plain' });
		const result = await parseFile(file);

		expect(result.success).toBe(false);
		if (!result.success) {
			expect(result.error).toContain('Unsupported file format');
		}
	});

	it('returns error for malformed JSON', async () => {
		const file = new File(['{invalid json}'], 'data.json', { type: 'application/json' });
		const result = await parseFile(file);

		expect(result.success).toBe(false);
		if (!result.success) {
			expect(result.error).toContain('Parse error');
		}
	});

	it('returns error for CSV missing required columns', async () => {
		const csv = 'amount,source\n100,Salary';
		const file = new File([csv], 'data.csv', { type: 'text/csv' });
		const result = await parseFile(file);

		expect(result.success).toBe(false);
		if (!result.success) {
			expect(result.error).toContain('Missing columns');
		}
	});

	it('returns error for validation issues in JSON', async () => {
		const entries = [{ id: '', amount: -5, date: 'bad-date', type: 'foo', source: '' }];
		const file = new File([JSON.stringify(entries)], 'data.json', { type: 'application/json' });
		const result = await parseFile(file);

		expect(result.success).toBe(false);
		if (!result.success) {
			expect(result.error).toContain('Entry 0');
		}
	});
});
