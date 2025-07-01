/// <reference types="vite/client" />

// Extend ImportMeta to include env for Vite
interface ImportMetaEnv {
  readonly VITE_GEMINI_API_KEY: string;
  // add more env variables here if needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
