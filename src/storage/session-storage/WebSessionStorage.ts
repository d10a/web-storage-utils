export class WebSessionStorage implements Storage {
    [name: string]: any;
    length: number = 0;

    clear(): void {
        sessionStorage.clear()
        this.length = 0
    }
    getItem(key: string): string | null {
        return sessionStorage.getItem(key)
    }
    key(index: number): string | null {
        return sessionStorage.key(index)
    }
    removeItem(key: string): void {
        sessionStorage.removeItem(key)
        if ((this.length > 0)) {
            this.length--
        }
    }
    setItem(key: string, value: string): void {
        sessionStorage.setItem(key, value)
        this.length++
    }
}