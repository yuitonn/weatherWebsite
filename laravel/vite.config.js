import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';

export default defineConfig({
    server: {
        host: '0.0.0.0',  // すべてのインターフェースからの接続を受け入れる
        port: 5172,       // ポートを 5172 に設定
        strictPort: true, // ポートが既に使用されている場合に別のポートにフォールバックしない
    },
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.jsx'],
            refresh: true,
        }),
    ],
});