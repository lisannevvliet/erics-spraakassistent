// Return the Element object of the corresponding element.
function $(element) {
    return document.querySelector(element)
}

// https://blog.zolomohan.com/speech-recognition-in-javascript
// Check if speech recognition is supported. If not, log an error message.
if ("webkitSpeechRecognition" in window) {
    // Initialize webkitSpeechRecognition.
    let speechRecognition = new webkitSpeechRecognition()
    // String for the final transcript.
    let final_transcript = ""

    // Manually stop the recording, instead of automatically.
    speechRecognition.continuous = true
    // Enable interim results.
    speechRecognition.interimResults = true
    // Set the language to Dutch.
    speechRecognition.lang = "nl-NL"

    speechRecognition.onstart = () => {
        // Show the status.
        $("#status").style.display = "block"
    }

    speechRecognition.onerror = () => {
        // Hide the status.
        $("#status").style.display = "none"
        // Log an error message.
        console.log("Spraakherkenningsfout.")
    }

    speechRecognition.onend = () => {
        // Hide the status.
        $("#status").style.display = "none"

        console.log("Spraakherkenning beëindigd.")
    }

    speechRecognition.onresult = (event) => {
        // String for the interim transcript.
        let interim_transcript = ""
  
        // Loop through the results.
        for (let index = event.resultIndex; index < event.results.length; ++index) {
            // Add the result to the corresponding string (final or interim).
            if (event.results[index].isFinal) {
                final_transcript += event.results[index][0].transcript
            } else {
                interim_transcript += event.results[index][0].transcript
            }
        }

        // Add the final and interim transcript to the HTML.
        $("#final").innerHTML = final_transcript
        $("#interim").innerHTML = interim_transcript
    }

    // Start the speech recognition.
    // speechRecognition.start()

    $("#start").onclick = () => {
        // Start the speech recognition.
        speechRecognition.start()
    }
    
    $("#stop").onclick = () => {
        // Stop the speech recognition.
        speechRecognition.stop()
    }

    

    // navigator.permissions.query({name: "clipboard-write"}).then(result => {
    //     if (result.state == "granted" || result.state == "prompt") {
    //       /* write to the clipboard now */
    //     }
    //   });

    // navigator.clipboard.readText().then(clipText =>
        // $("#test").innerText = clipText);
} else {
    console.log("Spraakherkenning niet beschikbaar.")
}