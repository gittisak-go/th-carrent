import type {Config} from "tailwindcss";
import daisyui from "daisyui";
import daisyuiThemes from "daisyui/src/theming/themes";

// Remove animation disablement properties from the emerald theme.
const emeraldThemeWithoutAnimations = {
    ...daisyuiThemes["emerald"],
    "--animation-btn": undefined,
    "--animation-input": undefined,
    "--btn-focus-scale": undefined,
    "--color-neutral": "0a0a0a",
    "--color-neutral-content": "e5e5e5",
    "--color-base-300": "171717"
};

const config: Config = {
    theme: {
        extend: {
            keyframes: {
                appear: {
                    "0%": {
                        opacity: "0",
                    },
                    "100%": {
                        opacity: "1",
                    },
                },
            },
            animation: {
                "appear": "appear 0.25s ease-in-out",
            }
        }
    },
    darkMode: ['class', '[data-theme="dark"]'],
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    plugins: [daisyui,],
    daisyui: {
        darkTheme: "dark",
        themes: [
            {
                light: emeraldThemeWithoutAnimations
            },
            {
                dark: {
                    "primary": "#8bee9a",
                    "primary-content": "#071409",
                    "secondary": "#95b2ed",
                    "secondary-content": "#080c14",
                    "accent": "#e2676b",
                    "accent-content": "#120404",
                    "neutral": "#0a0a0a",
                    "neutral-content": "#e5e5e5",
                    "base-100": "#000000",
                    "base-200": "#0a0a0a",
                    "base-300": "#171717",
                    "base-content": "#fafafa",
                    "info": "#2563EB",
                    "info-content": "#d2e2ff",
                    "success": "#16A34A",
                    "success-content": "#000a02",
                    "warning": "#D97706",
                    "warning-content": "#110500",
                    "error": "#c5454c",
                    "error-content": "#ffd9d4"
                }
            }
        ],
    },
};
export default config;