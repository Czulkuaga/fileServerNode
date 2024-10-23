const nameEncrypt = {};

nameEncrypt.randomString= () => {
    const possible = 'abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let randomString = 0;
    for (let i = 0; i < 20 ; i++) {
        randomString += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return randomString;
}

nameEncrypt.randomHashHex= () => {
    const possible = '0123456789abcdef';
    let randomString = 0;
    for (let i = 0; i < 29 ; i++) {
        randomString += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return randomString;
}

module.exports = nameEncrypt;