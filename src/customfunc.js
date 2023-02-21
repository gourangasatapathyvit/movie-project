// publsh to public URL 
const request = require('request');
const fs = require('fs');
const canvass = require('canvas');

async function resizeImagePublic(url, size = { width: 256, height: 256 }) {
    const image = new canvass.Image();
    return new Promise((resolve, reject) => {
        image.onerror = reject;
        image.onload = () => {
            let canvas = new canvass.Canvas(size.width, size.height);
            const ctx = canvas.getContext('2d');
            ctx.drawImage(image, 0, 0, size.width, size.height);
            resolve(canvas.toBuffer());
        };
        image.src = url;
    });
}

async function uploadToImgurPublic(image) {
    return new Promise((resolve, reject) => {
        const options = {
            method: 'POST',
            url: 'https://api.imgur.com/3/image',
            headers: {
                Authorization: 'Client-ID 1f83b390d73574e',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            formData: {
                image: {
                    value: image,
                    options: {
                        filename: 'resized_image.jpg',
                        contentType: 'image/jpeg',
                    },
                },
                title: 'Resized Image',
                type: 'file',
            },
        };
        request(options, (error, response, body) => {
            if (error) reject(error);
            else {
                const data = JSON.parse(body).data;
                resolve(data.link);
            }
        });
    });
}

// const urlPublic = 'https://upload.wikimedia.org/wikipedia/en/3/30/Ant-Man_and_the_Wasp_Quantumania_poster.jpg';
// resizeImagePublic(urlPublic, { width: 712, height: 400 })
//     .then(image => uploadToImgurPublic(image))
//     .then(link => console.log(link))
//     .catch(error => console.error(error));


// ====================

// publsh to user profile URL 
// const request = require('request');
// const canvass = require('canvas');

async function resizeImage(url, size = { width: 256, height: 256 }) {
    const image = new canvass.Image();
    return new Promise((resolve, reject) => {
        image.onerror = reject;
        image.onload = () => {
            const canvas = new canvass.Canvas(size.width, size.height);
            const ctx = canvas.getContext('2d');
            ctx.drawImage(image, 0, 0, size.width, size.height);
            resolve(canvas.toBuffer());
        };
        image.src = url;
    });
}

async function uploadToImgur(image, accessToken) {
    return new Promise((resolve, reject) => {
        const options = {
            method: 'POST',
            url: 'https://api.imgur.com/3/image',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            formData: {
                image: {
                    value: image,
                    options: {
                        filename: 'resized_image.jpg',
                        contentType: 'image/jpeg',
                    },
                },
                title: 'Resized Image',
                type: 'file',
            },
        };
        request(options, (error, response, body) => {
            if (error) reject(error);
            else {
                const data = JSON.parse(body).data;
                resolve(data.link);
            }
        });
    });
}


function imageUpload(url,accessToken, size) {
    resizeImage(url, { width: 712, height: 400 })
        .then(image => uploadToImgur(image, accessToken))
        .then(link => console.log(link))
        .catch(error => console.error(error));
}

module.exports = imageUpload