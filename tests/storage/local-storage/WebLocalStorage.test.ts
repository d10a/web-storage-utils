/**
 * @jest-environment jsdom
 */

import { WebLocalStorage } from './../../../src/storage/local-storage/WebLocalStorage'

beforeEach(() => {
    localStorage.clear()
});

describe('WebLocalStorage', () => {

    test('store matches Storage Interface', () => {
        const storage = new WebLocalStorage()
        expect(storage.clear).toBeDefined();
        expect(storage.getItem).toBeDefined();
        expect(storage.key).toBeDefined();
        expect(storage.removeItem).toBeDefined();
        expect(storage.setItem).toBeDefined();

    });

    test('can store a value in localstorage', () => {
        const storage = new WebLocalStorage()
        expect(() => {
            storage.setItem('key', 'value')
            expect(window.localStorage.getItem('key')).toEqual('value')
        }).not.toThrow()
    });

    test('can get a value from localstorage', () => {
        const storage = new WebLocalStorage()
        expect(() => {
            storage.setItem('key', 'value')
            expect(storage.getItem('key')).toEqual('value')
        }).not.toThrow()
    });

    test('can clear the localstorage', () => {
        const storage = new WebLocalStorage()
        expect(() => {
            storage.setItem('key', 'value')
            expect(storage.getItem('key')).toEqual('value')
            storage.clear()
            expect(storage.getItem('key')).toBeNull()
        }).not.toThrow()
    });
    test('can get key from localstorage when index exists', () => {
        const storage = new WebLocalStorage()
        expect(() => {
            storage.setItem('key', 'value')
            expect(storage.getItem('key')).toEqual('value')
            expect(storage.key(0)).toEqual('key')
        }).not.toThrow()
    });

    test('can\'t get key from localstorage when index doesn\'t exists', () => {
        const storage = new WebLocalStorage()
        expect(() => {
            expect(storage.key(1)).toBeNull()
        }).not.toThrow()
    });

    test('can remove item from localstorage when key exists', () => {
        expect(() => {
            const storage = new WebLocalStorage()
            storage.setItem('key', 'value')
            expect(storage.getItem('key')).toEqual('value')
            storage.removeItem('key')
            expect(storage.getItem('key')).toBeNull()
        }).not.toThrow()
    });

    test('can get localstorage length', () => {
        expect(() => {
            const storage = new WebLocalStorage()
            storage.setItem('key_1', 'value')
            storage.setItem('key_2', 'value')
            storage.removeItem('key_1')
            expect(storage.length).toEqual(1)
            storage.clear()
            expect(storage.length).toEqual(0)
        }).not.toThrow()
    });
});