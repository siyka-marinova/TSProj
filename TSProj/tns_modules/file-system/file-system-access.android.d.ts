export declare class FileSystemAccess {
    private _pathSeparator;
    public getLastModified(path: string): Date;
    public getParent(path: string, onError?: (error: any) => any): {
        path: string;
        name: string;
    };
    public getFile(path: string, onError?: (error: any) => any): {
        path: string;
        name: string;
        extension: string;
    };
    public getFolder(path: string, onError?: (error: any) => any): {
        path: string;
        name: string;
    };
    public eachEntity(path: string, onEntity: (file: {
        path: string;
        name: string;
        extension: string;
    }) => boolean, onError?: (error: any) => any): void;
    public getEntities(path: string, onSuccess: (files: {
        path: string;
        name: string;
        extension: string;
    }[]) => any, onError?: (error: any) => any): void;
    public fileExists(path: string): boolean;
    public folderExists(path: string): boolean;
    public deleteFile(path: string, onSuccess?: () => any, onError?: (error: any) => any): void;
    public deleteFolder(path: string, isKnown?: boolean, onSuccess?: () => any, onError?: (error: any) => any): void;
    public emptyFolder(path: string, onSuccess?: () => any, onError?: (error: any) => any): void;
    public rename(path: string, newPath: string, onSuccess?: () => any, onError?: (error: any) => any): void;
    public getDocumentsFolderPath(): string;
    public getTempFolderPath(): string;
    public getCurrentAppFolderPath(): string;
    public readText(path: string, onSuccess: (content: string) => any, onError?: (error: any) => any, encoding?: any): void;
    public writeText(path: string, content: string, onSuccess?: () => any, onError?: (error: any) => any, encoding?: any): void;
    private deleteFolderContent(file);
    private ensureFile(javaFile, isFolder, onError?);
    private getFileExtension(path);
    private enumEntities(path, callback, onError?);
    public getPathSeparator(): string;
    public normalizePath(path: string): string;
    public joinPath(left: string, right: string): string;
    public joinPaths(paths: string[]): string;
}
