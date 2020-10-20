export default function loadImage(uri)
{
    return new Promise((resolve, reject) => {

        const image = new Image();
        image.src = uri;
        image.onload = () => resolve(image);
        image.onerror = reject;
    });
}
