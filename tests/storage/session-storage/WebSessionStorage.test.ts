/**
 * @jest-environment jsdom
 */

import { WebSessionStorage } from '../../../src/storage/session-storage/WebSessionStorage'

beforeEach(() => {
    localStorage.clear()
});

describe('WebSessionStorage', () => {

    test('store matches Storage Interface', () => {
        const storage = new WebSessionStorage()
        expect(storage.clear).toBeDefined();
        expect(storage.getItem).toBeDefined();
        expect(storage.key).toBeDefined();
        expect(storage.removeItem).toBeDefined();
        expect(storage.setItem).toBeDefined();

    });

    test('can store a value in sessionStorage', () => {
        const storage = new WebSessionStorage()
        expect(() => {
            storage.setItem('key', 'value')
            expect(window.sessionStorage.getItem('key')).toEqual('value')
        }).not.toThrow()
    });

    test('can get a value from sessionStorage', () => {
        const storage = new WebSessionStorage()
        expect(() => {
            storage.setItem('key', 'value')
            expect(storage.getItem('key')).toEqual('value')
        }).not.toThrow()
    });

    test('can clear the sessionStorage', () => {
        const storage = new WebSessionStorage()
        expect(() => {
            storage.setItem('key', 'value')
            expect(storage.getItem('key')).toEqual('value')
            storage.clear()
            expect(storage.getItem('key')).toBeNull()
        }).not.toThrow()
    });
    test('can get key from localstorage when index exists', () => {
        const storage = new WebSessionStorage()
        expect(() => {
            storage.setItem('key', 'value')
            expect(storage.getItem('key')).toEqual('value')
            expect(storage.key(0)).toEqual('key')
        }).not.toThrow()
    });

    test('can\'t get key from sessionStorage when index doesn\'t exists', () => {
        const storage = new WebSessionStorage()
        expect(() => {
            expect(storage.key(1)).toBeNull()
        }).not.toThrow()
    });

    test('can remove item from sessionStorage when key exists', () => {
        expect(() => {
            const storage = new WebSessionStorage()
            storage.setItem('key', 'value')
            expect(storage.getItem('key')).toEqual('value')
            storage.removeItem('key')
            expect(storage.getItem('key')).toBeNull()
        }).not.toThrow()
    });

    test('can get sessionStorage length', () => {
        expect(() => {
            const storage = new WebSessionStorage()
            storage.setItem('key_1', 'value')
            storage.setItem('key_2', 'value')
            storage.removeItem('key_1')
            expect(storage.length).toEqual(1)
            storage.clear()
            expect(storage.length).toEqual(0)
        }).not.toThrow()
    });
});