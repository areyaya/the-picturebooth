const video = document.getElementById("screen");
const clickBttn = document.getElementById("clickphoto");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const overlay = document.getElementById("countdownOverlay");

const photos = [];
//constraints specifying video 
//properties (permissions required)//
const constraints = { video: { width: 500, height: 400 } };

//---Access to the camera---//
navigator.mediaDevices.getUserMedia(constraints).then(stream => {
    video.srcObject = stream;
    video.play();
});

//------------------------------------------------//
//--------lowk the brain of the photobooth-------//

const sleep = ms => new Promise(r => setTimeout(r, ms));//sleep function for other functions

clickBttn.addEventListener("click", async () => {
    clickBttn.disabled = true;
    photos.length = 0;

    //Loops to take 3 photos with countdown
    for (let i = 0; i < 4; i++) {
        await runCountdown(); //runs countdown function (counts down from 3)
        capturePhoto();
        await sleep(800);
    }

    sessionStorage.setItem("photoStrip", JSON.stringify(photos));
    window.location.href = "strip.html";
});

//---Countdown functionality Section---//
async function runCountdown() {
    overlay.style.opacity = 1;

    for (let i = 3; i > 0; i--) {
        overlay.innerText = i;
        await sleep(1000);
    }

    overlay.innerText = "READY!";
    await sleep(500);

    overlay.style.opacity = 0;
}

function capturePhoto() {
    ctx.save();
    ctx.scale(-1, 1);
    ctx.drawImage(video, -canvas.width, 0, canvas.width, canvas.height);
    ctx.restore();

    photos.push(canvas.toDataURL("image/png"));
}
