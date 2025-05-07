const supabase = require('../config/supabase'); // Importar o cliente configurado
const fs = require('fs');
const path = require('path');
const mime = require('mime');
const bucketName = process.env.BUCKET_NAME; // Nome do bucket no .env
require('dotenv').config();

async function upload(filePath) {//upload('caminho/para/o/teu/ficheiro.ext');
    try {
        const fileName = path.basename(filePath);

        const { data, error } = await supabase
            .storage
            .from(bucketName)
            .upload(fileName, fs.readFileSync(filePath), {
                contentType: mime.getType(filePath) || 'application/octet-stream',  //file type
            });

        if (error) {
            console.error('Erro no upload:', error);
        } else {
            console.log('Upload feito com sucesso:', data);
            console.log('URL pública:', `${process.env.SUPABASE_SERVER}/storage/v1/object/public/${bucketName}/${fileName}`);
        }
    } catch (err) {
        console.error('Erro ao ler o ficheiro:', err);
    }
}

async function download(fileName, downloadPath) {
    try {
        const { data, error } = await supabase
            .storage
            .from(bucketName)
            .download(fileName);

        if (error) {
            console.error('Erro ao obter o ficheiro:', error);
        } else {
            fs.writeFileSync(downloadPath, Buffer.from(await data.arrayBuffer()));
            console.log(`Ficheiro "${fileName}" guardado em: ${downloadPath}`);
        }
    } catch (err) {
        console.error('Erro ao guardar o ficheiro:', err);
    }
}

module.exports = { upload, download }