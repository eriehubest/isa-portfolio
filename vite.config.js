import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import restart from 'vite-plugin-restart'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
        restart(
            {
                restart: ['../public/**']
            }
        )
    ],
})
