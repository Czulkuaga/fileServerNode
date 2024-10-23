const fs = require('fs')
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const MediaService = require('../services/MediaService');

const MediaController = {}

const newpath = path.join(__dirname, '../public/files/');

MediaController.createMedia = async (req, res) => {

    // let upload_preset = req.body.upload_preset;
    // let typeImage = req.body.typeImage;

    if (req.files !== null) {
        const files = Array.isArray(req.files.files) ? req.files.files : [req.files.files];
        let promises = [];
        let image = null

        for (let file of files) {
            const originalName = file.name;
            const fileExtension = path.extname(originalName);
            const newFilename = uuidv4() + fileExtension;
            const fullPath = path.join(newpath, newFilename);

            const imageData = {
                name: newFilename,
                path: fullPath,
                size: file.size,
                server: process.env.SERVER
            }

            try {

                const saveImageDB = await MediaService.createFile(imageData)
                image = saveImageDB

                const savedImage = file.mv(fullPath);

                promises.push(savedImage);


            } catch (err) {
                res.status(500).json({ message: "File upload failed", code: 502 });
                return;
            }
        }

        try {
            await Promise.all(promises)
            // console.log(promises)
            res.status(200).json({ image, message: "Image Create successfully" });
        } catch (err) {
            res.status(500).json({ code: '500', message: 'Has an error to upload file' });
        }
    } else {
        res.status(500).json({ code: '500', message: 'No image to upload' });
    }

}

MediaController.deleteMedia = async (req, res) => {

    const fileId = req.params.fileId

    try {
        const deleteMedia = await MediaService.deleteFileDatabase(fileId)

        await MediaService.deleteFileFiles(deleteMedia)
            .then((mensaje) => {
                console.log(mensaje);
                // Aquí puedes continuar con la lógica de eliminación de la base de datos
            })
            .catch((error) => {
                throw Error("Has an error to delete File: "+error.message)
                // Aquí manejas el error, puedes hacer rollback en la base de datos o lo que necesites
            });

        res.status(200).json({ message: "Image Deleted Successfully" })
    } catch (error) {
        res.status(500).json({ message: "No image exist", code: 502 });
        return;
    }

}

module.exports = MediaController