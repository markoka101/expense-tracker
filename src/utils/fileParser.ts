import type { CashEntry, EntryType } from '../types/finance';

type ParseResult = { success: true; data: CashEntry[] } | { success: false; error: string };

type FileFormat = 'json' | 'csv';

/**
 * Detect file format based on extension and MIME type
 *
 * @param file - file to detect format
 * @returns detected format or null if unsupported
 */
function detectFileFormat(file: File): FileFormat | null {}

/**
 * Entry point for file to be parse.
 *
 * @param file - File to parse
 * @returns Promise reseolving to PageResult
 */
export async function parseFile(file: File): Promise<ParseResult> {}

/**
 * Parse JSON file containing array of entries
 *
 * @param file - JSON file
 * @returns Promise resolving to ParseResult
 */
async function parseJSONFile(file: File): Promise<ParseResult> {}

/**
 * Parse XML file containg array of entries
 *
 * @param file - XML file
 * @returns Promise resolving to ParseResult
 */
async function parseXMLFile(file: File): Promise<ParseResult> {}

/**
 * Validate entry fields
 *
 * @param entry - object to validate
 * @returns Array of validation error message (Or empty if valid)
 */
function validateEntry(entry: any): string[] {}
