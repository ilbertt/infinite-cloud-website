export interface FileModel {
    key: string;
    relativeKey?: string;
    messageId?: number;
    modified: number; // timestamp in milliseconds
    size: number;
}