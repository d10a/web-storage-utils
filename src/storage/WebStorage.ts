import { WebLocalStorage } from "./local-storage/WebLocalStorage"
import { WebSessionStorage } from "./session-storage/WebSessionStorage"
import { StoreDataInterface, WebStorageInterface } from "./WebStorageInterface"

enum StorageTypes {
    LOCAL = 'localStorage',
    SESSION = 'sessionStorage',
}

interface WebStorageOptions {
    storage: StorageTypes
    domain: string
}

const storageDataTemplate = {
    domain: '',
    expires: '',
    data: null,
}

export class WebStorage implements WebStorageInterface {
    private storage: Storage
    private domain: string
    [name: string]: any
    public length: number = 0

    constructor(options: WebStorageOptions) {
        this.domain = options.domain
        switch (options.storage) {
            case StorageTypes.SESSION:
                this.storage = new WebSessionStorage()
                break;
            case StorageTypes.LOCAL:
                this.storage = new WebLocalStorage()
                break;
        }
    }

    clear(): void {
        this.storage.clear()
    }

    getItem(key: string): string | null {
        const item = this.storage.getItem(key)
        if (item !== null) {
            const data = this.deserialize(item)
            return !this.hasExpired(data.expires) ? data : null
        } else {
            return null
        }
    }
    key(index: number): string | null {
        return this.storage.key(index)
    }
    removeItem(key: string): void {
        this.storage.removeItem(key)
    }
    setItem(data: StoreDataInterface): void {
        const dataTemplate = storageDataTemplate
        dataTemplate.domain = this.domain
        if (data.expiresAfter && data.expiresAfter > 0) {
            dataTemplate.expires = <string>this.getExpirationDate(data.expiresAfter, true)
        }
        this.storage.setItem(data.key, this.serialize(dataTemplate))
    }

    /**
     * Expiration date
     * @param expiredAfter (in minutes)
     * @returns 
     */
    private getExpirationDate(expiredAfter: number, toString: boolean = false): Date | string {
        const date = new Date()
        date.setMinutes(date.getMinutes() + expiredAfter)
        return (toString)
            ? date.toISOString()
            : date
    }

    /**
     * Check data expiration date
     * @param expirationDate string from Date.toISOString()
     * @returns boolean
     */
    private hasExpired(expirationDate: string): boolean {
        return (new Date(expirationDate)) < (new Date())
    }

    has(key: string): boolean {
        return (this.storage.getItem(key) !== undefined)
    }

    size(): number {
        return this.storage.length;
    }

    isEmpty(): boolean {
        return (this.storage.length === 0);
    }

    serialize(data: any, fromObject = false): string {
        if (fromObject) {
            //@todo serialize and deserialize plain object : https://www.npmjs.com/package/class-transformer#browser
        }

        return JSON.stringify(data)
    }

    deserialize(data: string, fromObject = false): any {
        if (fromObject) {
            //@todo serialize and deserialize plain object : https://www.npmjs.com/package/class-transformer#browser
        }
        return JSON.parse(data)
    }

    encrypt(data: any): any {
        // https://blog.logrocket.com/understanding-typescript-object-serialization/
        // @todo use https://www.npmjs.com/package/crypto-js to encrypt data
        throw new Error("Method not implemented.")
    }

    decrypt(data: any) {
        throw new Error("Method not implemented.")
    }
}