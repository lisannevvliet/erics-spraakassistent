function $(element) {
    // Return the Element object of the corresponding element.
    return document.querySelector(element)
}

// https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Interact_with_the_clipboard#reading_from_the_clipboard
function copy(text) {
    if (text == "") {
        // Get the selected text on the website.
        // https://stackoverflow.com/questions/5379120/get-the-highlighted-selected-text
        if (window.getSelection) {
            text = window.getSelection().toString()
        // Support for Internet Explorer 9 and below.
        } else if (document.selection && document.selection.type != "Control") {
            text = document.selection.createRange().text
        }
    }

    // Copy the selected text.
    navigator.clipboard.writeText(text)

    // Fill the status pop-up with the text that has been copied.
    $("#status div p").innerHTML = `<img src="images/copy.png"> "${text}" gekopieerd.`

    // Show the status pop-up.
    $("#status").classList.add("show")

    // Hide the status pop-up after 3 seconds.
    setTimeout(function() {
        $("#status").classList.remove("show")
    }, 3000)
}

function paste() {
    navigator.clipboard.readText().then(text => {
        // Add the clipboard text to the HTML.
        $("#clipboard").innerText = text

        // Fill the status pop-up with the clipboard text.
        $("#status div p").innerHTML = `<img src="images/clipboard.png"> "${text}" geplakt.`

        // Show the status pop-up.
        $("#status").classList.add("show")

        // Hide the status pop-up after 3 seconds.
        setTimeout(function() {
            $("#status").classList.remove("show")
        }, 3000)
    })
}

function search(string) {
    window.find(string)
}

// Check if speech recognition is supported. If not, log an error message.
// https://blog.zolomohan.com/speech-recognition-in-javascript
if ("webkitSpeechRecognition" in window) {
    // Initialize webkitSpeechRecognition.
    let speechRecognition = new webkitSpeechRecognition()
    
    // Do not automatically stop the recording.
    speechRecognition.continuous = true
    // Enable interim results.
    speechRecognition.interimResults = true
    // Set the language to Dutch.
    speechRecognition.lang = "nl-NL"

    // Boolean for the state of the speech recognition.
    let active = false

    speechRecognition.onstart = () => {
        // Set the state to active.
        active = true

        // Make the record button red.
        $("#record").classList.add("red")
        // Animate the record button.
        $("#record img").classList.add("pulse")
    }

    speechRecognition.onerror = () => {
        // Set the state to inactive.
        active = false

        // Make the record button the default color.
        $("#record").classList.remove("red")
        // Remove the record button animation.
        $("#record img").classList.remove("pulse")

        // Log an error message.
        console.log("Spraakherkenningsfout.")
    }

    speechRecognition.onend = () => {
        // Set the state to inactive.
        active = false

        // Make the record button the default color.
        $("#record").classList.remove("red")
        // Remove the record button animation.
        $("#record img").classList.remove("pulse")
    }

    let final_transcript = ""

    speechRecognition.onresult = (event) => {
        let interim_transcript = ""
  
        // Loop through the results.
        for (let index = event.resultIndex; index < event.results.length; ++index) {
            const result = event.results[index][0].transcript

            // Add the result to the corresponding string (final or interim).
            if (event.results[index].isFinal) {
                // Check if the word "kopieer" is said.
                if (result.includes("kopieer")) {
                    if (result.includes("geselecteerde tekst")) {
                        copy("")
                    } else {
                        // Copy everything after the word "kopieer".
                        copy(result.substring(result.indexOf("kopieer") + "kopieer".length + 1))
                    }
                }

                // Check if the word "plak" is said.
                if (result.includes("plak")) {
                    paste()
                }

                // Check if the word "vind" is said.
                if (result.includes("vind")) {
                    // Search everything after the word "vind".
                    search(result.substring(result.indexOf("vind") + "vind".length + 1))
                }

                if (final_transcript == "") {
                    final_transcript += result
                } else {
                    // Add a space before the result if there are previous results.
                    final_transcript += ` ${result}`
                }
            } else {
                interim_transcript += result
            }
        }

        // Add the final and interim transcript to the HTML.
        $("#final").innerHTML = final_transcript
        $("#interim").innerHTML = interim_transcript
    }

    $("#record").onclick = () => {
        if (active == false) {
            // Start the speech recognition.
            speechRecognition.start()

            // Set the state to active.
            active = true
        } else {
            // Stop the speech recognition.
            speechRecognition.stop()

            // Set the state to inactive.
            active = false
        }
    }
} else {
    console.log("Spraakherkenning niet beschikbaar.")
}