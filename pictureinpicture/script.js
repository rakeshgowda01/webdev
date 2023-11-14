const videoElement = document.getElementById("video")
const button = document.getElementById("button")

// Promt to select media stream, pass to video element, then play.

async function selectMediaStream() {
    try {
        const stream = await navigator.mediaDevices.getDisplayMedia({video: true})
        videoElement.srcObject = stream
        videoElement.onloadedmetadata = () => {
            videoElement.play()
        }
    } catch (error) {
        console.log("Whoops, ", error)
    }
}

button.addEventListener("click", async () => {
    // Disable Button
    button.disabled = true
    // Start Picture in Picture Mode
    await videoElement.requestPictureInPicture()
    // Reset Button
    button.disabled = false
})

// OnLoad
selectMediaStream()