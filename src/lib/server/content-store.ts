import { promises as fs } from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "src", "data");

async function readJsonFile<T>(fileName: string): Promise<T[]> {
  const filePath = path.join(DATA_DIR, fileName);
  const raw = await fs.readFile(filePath, "utf-8");
  return raw.trim() ? (JSON.parse(raw) as T[]) : [];
}

async function writeJsonFile<T>(fileName: string, data: T[]): Promise<void> {
  const filePath = path.join(DATA_DIR, fileName);
  await fs.writeFile(filePath, `${JSON.stringify(data, null, 2)}\n`, "utf-8");
}

export function createContentStore<T extends object>(fileName: string, keyField: keyof T) {
  return {
    async getAll(): Promise<T[]> {
      return readJsonFile<T>(fileName);
    },

    async getByKey(key: string): Promise<T | undefined> {
      const items = await readJsonFile<T>(fileName);
      return items.find((item) => item[keyField] === key);
    },

    async create(item: T): Promise<T> {
      const items = await readJsonFile<T>(fileName);
      if (items.some((existing) => existing[keyField] === item[keyField])) {
        throw new Error(`Item with ${String(keyField)} "${String(item[keyField])}" already exists`);
      }
      items.unshift(item);
      await writeJsonFile(fileName, items);
      return item;
    },

    async update(key: string, updates: Partial<T>): Promise<T> {
      const items = await readJsonFile<T>(fileName);
      const index = items.findIndex((item) => item[keyField] === key);
      if (index === -1) {
        throw new Error(`Item with ${String(keyField)} "${key}" not found`);
      }
      const updated = { ...items[index], ...updates };
      items[index] = updated;
      await writeJsonFile(fileName, items);
      return updated;
    },

    async remove(key: string): Promise<void> {
      const items = await readJsonFile<T>(fileName);
      const filtered = items.filter((item) => item[keyField] !== key);
      await writeJsonFile(fileName, filtered);
    },
  };
}
