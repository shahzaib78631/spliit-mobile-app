import { MMKV } from "react-native-mmkv";
import { z } from "zod";

/** MMKV storage instance for persistent key-value storage */
export const storage = new MMKV();

/**
 * Helper function to get the data from storage and parse it.
 * It works for both MMKV (React Native) and localStorage (Web).
 *
 * @param key - Storage key
 * @param schema - Optional Zod schema for validation
 * @param storageType - Type of storage ('localStorage' or 'mmkv')
 * @returns The parsed data if valid or raw data if schema is not provided
 */
export function getStorageData<T>(
  key: string,
  schema?: z.ZodType<T>,
  storageType: "localStorage" | "mmkv" = "localStorage"
): T {
  try {
    let rawData: string | null | undefined;
    if (storageType === "mmkv") {
      rawData = storage.getString(key);
    } else {
      rawData = localStorage.getItem(key);
    }

    // Parse the data
    const parsedData = rawData ? JSON.parse(rawData) : [];

    // If schema is provided, validate it
    if (schema) {
      const parseResult = schema.safeParse(parsedData);
      return parseResult.success ? parseResult.data : ([] as unknown as T);
    }

    // Return parsed data as is if no schema is provided
    return (parsedData || []) as T;
  } catch (error) {
    console.error("Error reading from storage", error);
    return [] as unknown as T;
  }
}

/**
 * Helper function to set the data to storage.
 * It works for both MMKV (React Native) and localStorage (Web).
 *
 * @param key - Storage key
 * @param data - The data to be stored
 * @param storageType - Type of storage ('localStorage' or 'mmkv')
 */
export function setStorageData(
  key: string,
  data: unknown,
  storageType: "localStorage" | "mmkv"
): void {
  try {
    const jsonData = JSON.stringify(data);
    if (storageType === "mmkv") {
      storage.set(key, jsonData);
    } else {
      localStorage.setItem(key, jsonData);
    }
  } catch (error) {
    console.error("Error writing to storage", error);
  }
}

/**
 * Helper function to determine if the code is running in a web environment.
 *
 * @returns True if running on the web, false if running in React Native.
 */
export function isWeb(): boolean {
  return (
    typeof window !== "undefined" && typeof window.localStorage !== "undefined"
  );
}
