export class WebLocalStorage implements Storage {
    [name: string]: any;
    public length: number = 0

    clear(): void {
        localStorage.clear()
        this.length = 0
    }
    getItem(key: string): string | null {
        return localStorage.getItem(key)
    }
    key(index: number): string | null {
        return localStorage.key(index);
    }
    removeItem(key: string): void {
        localStorage.removeItem(key)
        if ((this.length > 0)) {
            this.length--
        }
    }
    setItem(key: string, value: string): void {
        window.localStorage.setItem(key, value)
        this.length++
    }
}