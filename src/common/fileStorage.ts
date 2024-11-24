import fs from 'fs';
import path from 'path';

const STORAGE_FILE = path.join(__dirname, '../data/files.json');

export interface FileData {
    filename: string;
    contentType: string;
    base64Data: string;
}

export interface StoredFiles {
    [key: string]: FileData;
}

const ensureDataDir = () => {
    const dir = path.dirname(STORAGE_FILE);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
};

export class FileStorage {
    private files: StoredFiles = {};

    constructor() {
        ensureDataDir();
        this.loadFiles();
    }

    private loadFiles() {
        try {
            if (fs.existsSync(STORAGE_FILE)) {
                const data = fs.readFileSync(STORAGE_FILE, 'utf8');
                this.files = JSON.parse(data);
            }
        } catch (error) {
            console.error('Error loading files:', error);
            this.files = {};
        }
    }

    private saveFiles() {
        try {
            fs.writeFileSync(STORAGE_FILE, JSON.stringify(this.files, null, 2));
        } catch (error) {
            console.error('Error saving files:', error);
            throw new Error('Failed to save file data');
        }
    }

    storeFile(fileData: FileData) {
        this.files[fileData.filename] = fileData;
        this.saveFiles();
    }

    getFile(filename: string): FileData | null {
        return this.files[filename] || null;
    }

    getAllFiles(): string[] {
        return Object.keys(this.files);
    }
}