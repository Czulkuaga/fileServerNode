const fs = require('fs');

const File = require("../models/File");

const MediaService = {}

//Create File
MediaService.createFile = async (formData) => {

    const createFile = new File({
        name: formData.name,
        path: formData.path,
        size: formData.size,
        server: formData.server
    })

    return await createFile.save()
}

//Delete on Database
MediaService.deleteFileDatabase = async (fileId) => {

    const findImageByPath = await File.findById(fileId)

    if (!findImageByPath) {
        throw Error("Not Image exist")
    }

    const deletedFile = await File.findByIdAndDelete(findImageByPath._id)

    return deletedFile
}
//Delete Local
MediaService.deleteFileFiles = async (file) => {
    new Promise((resolve, reject) => {
        fs.unlink(file.path, (err) => {
            if (err) {
                reject(new Error(`Error al eliminar el archivo: ${err.message}`));
            } else {
                resolve('Archivo eliminado correctamente');
            }
        });
    });
}

module.exports = MediaService