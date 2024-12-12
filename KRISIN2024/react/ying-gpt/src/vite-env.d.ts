/// <reference types="vite/client" />

declare module '*.png' {
    const content: string;
    export default content;
}

interface ImportMetaEnv {
    readonly VITE_APP_TITLE: string;
    readonly VITE_API_BASE_URL: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
