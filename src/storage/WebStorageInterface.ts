export interface StoreDataInterface {
    domain: string
    key: string
    value: string
    expiresAfter?: number
}

export interface WebStorageInterface {
    /** Returns the number of key/value pairs. */
    readonly length: number;
    /**
     * Removes all key/value pairs, if there are any.
     *
     * Dispatches a storage event on Window objects holding an equivalent Storage object.
     */
    clear(): void;
    /** Returns the current value associated with the given key, or null if the given key does not exist. */
    getItem(key: string): string | null;
    /** Returns the name of the nth key, or null if n is greater than or equal to the number of key/value pairs. */
    key(index: number): string | null;
    /**
     * Removes the key/value pair with the given key, if a key/value pair with the given key exists.
     *
     * Dispatches a storage event on Window objects holding an equivalent Storage object.
     */
    removeItem(key: string): void;
    /**
     * Sets the value of the pair identified by key to value, creating a new key/value pair if none existed for key previously.
     *
     * Throws a "QuotaExceededError" DOMException exception if the new value couldn't be set. (Setting could fail if, e.g., the user has disabled storage for the site, or if the quota has been exceeded.)
     *
     * Dispatches a storage event on Window objects holding an equivalent Storage object.
     */
    setItem(data: StoreDataInterface): void;
    [name: string]: any;

    has(key: string): boolean;
    size(): number;
    isEmpty(): boolean;
    serialize(data: any, fromObject: boolean): string;
    deserialize(data: string, fromObject: boolean): any;
    encrypt(data: any): any;
    decrypt(data: any): any;
}