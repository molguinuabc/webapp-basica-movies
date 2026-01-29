// Servidor simple para servir el frontend
import { createServer } from 'http';
import { readFile } from 'fs/promises';
import { extname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const PORT = 8181;

const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
};

const server = createServer(async (req, res) => {
    console.log(`${req.method} ${req.url}`);
    
    // Manejar la ruta raíz
    let filePath = req.url === '/' ? 'index.html' : req.url;
    filePath = join(__dirname, filePath);
    
    try {
        const data = await readFile(filePath);
        const ext = extname(filePath);
        const contentType = mimeTypes[ext] || 'application/octet-stream';
        
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data);
    } catch (error) {
        if (error.code === 'ENOENT') {
            // Archivo no encontrado, servir index.html para SPA
            try {
                const data = await readFile(join(__dirname, 'index.html'));
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            } catch (error2) {
                res.writeHead(500);
                res.end(`Error: ${error2.message}`);
            }
        } else {
            res.writeHead(500);
            res.end(`Error: ${error.message}`);
        }
    }
});

server.listen(PORT, () => {
    console.log(`Servidor frontend ejecutándose en http://localhost:${PORT}`);
    console.log(`Backend API: http://localhost:3000`);
    console.log('\nInstrucciones:');
    console.log('1. Asegúrate de que el backend esté ejecutándose en otra terminal');
    console.log(`2. Abre http://localhost:${PORT} en tu navegador`);
    console.log('3. Para detener el servidor: Ctrl+C');
});