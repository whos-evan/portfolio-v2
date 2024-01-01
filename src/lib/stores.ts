import { writable } from "svelte/store";
import { browser } from "$app/environment";

const defaultValue = "light";
const initialTheme = browser ? window.localStorage.getItem('theme') ?? defaultValue : defaultValue;

export const theme = writable<string>(initialTheme);

theme.subscribe((value) => {
    if (browser) {
        window.localStorage.setItem('theme', value);
    }
});

