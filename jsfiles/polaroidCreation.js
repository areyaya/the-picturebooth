//Variables for accessing HTML elements from strip and photobooth DOM//
const stripCanvas = document.getElementById("strip");

const stripCtx = stripCanvas.getContext("2d");
//returns array of images
const images = JSON.parse(sessionStorage.getItem("photoStrip")); 

//filter to apply to photos
const filter = "sepia(60%) saturate(100%) contrast(100%)"; 

//set photo strip canvas dimensions
const photoWidth = 180;
const photoHeight = 144;
const padding = 10;
const stripWidth = photoWidth + padding*2;
const stripHeight = (photoHeight * images.length) + (padding * (images.length + 1));

stripCanvas.width = stripWidth;
stripCanvas.height = stripHeight;

stripCtx.filter = filter; //filter is defined at the top
stripCtx.fillStyle = "#201510ff"; //brown background for strip
stripCtx.fillRect(0, 0, stripWidth, stripHeight);

let y = padding;

//Draw each photo onto the strip canvas
images.forEach((imgData, index) => {
    const img = new Image();
    img.onload = () => {
        stripCtx.drawImage(img, 10, y, photoWidth, photoHeight);
        y += photoHeight + padding;
    }

    img.src = imgData;
});

//download button functionality
clickBttn = document.getElementById("download-button");
clickBttn.addEventListener("click", () => {
    const link = document.createElement("a");
    link.download = "thepicturebooth_strip.png";
    link.href = stripCanvas.toDataURL("image/png");
    link.click();
});