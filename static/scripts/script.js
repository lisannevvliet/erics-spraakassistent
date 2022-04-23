function $(element) {
    // Return the Element object of the corresponding element.
    return document.querySelector(element)
}

function popup(image, string) {
    // Fill the pop-up with the image and string.
    $("#pop-up div p").innerHTML = `<img src="images/${image}"> ${string}`

    // Show the pop-up.
    $("#pop-up").classList.add("show")

    // Hide the pop-up after 3 seconds.
    setTimeout(function() {
        $("#pop-up").classList.remove("show")
    }, 3000)
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

    // Fill and show the pop-up.
    popup("copy.png", `"${text}" gekopieerd.`)
}

function paste() {
    navigator.clipboard.readText().then(text => {
        // Fill the textarea with the clipboard text.
        $("textarea").value = text

        // Fill and show the pop-up.
        popup("clipboard.png", `"${text}" geplakt.`)
    })
}

function select(result, string) {
    // Cut the string after the select command.
    string = result.substring(result.indexOf(string) + string.length + 1)

    // Focus on the textarea.
    $("textarea").focus()

    // Find the string in the textarea.
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

    speechRecognition.onstart = () => {
        // Make the record button red.
        $("#record").classList.add("red")
        // Fill the record button with a stop image.
        $("#record img").src = "images/stop.png"
        // Add bigger padding around the stop image.
        $("#record img").classList.add("stop")
    }

    speechRecognition.onerror = () => {
        // Make the record button the default color.
        $("#record").classList.remove("red")
        // Fill the record button with a microphone image.
        $("#record img").src = "images/microphone.png"
        // Remove the bigger padding from the stop image.
        $("#record img").classList.remove("stop")

        // Log an error message.
        console.log("Spraakherkenningsfout.")
    }

    speechRecognition.onend = () => {
        // Make the record button the default color.
        $("#record").classList.remove("red")
        // Fill the record button with a microphone image.
        $("#record img").src = "images/microphone.png"
        // Remove the bigger padding from the stop image.
        $("#record img").classList.remove("stop")
    }

    speechRecognition.onresult = (event) => {
        let final = ""
        let interim = ""
  
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

                // Check if the word "selecteer" is said.
                if (result.includes("selecteer")) {
                    select(result, "selecteer")
                } 

                // Check if the word "vind" is said.
                if (result.includes("vind")) {
                    select(result, "vind")
                }

                // Check if the word "zoek" is said.
                if (result.includes("zoek")) {
                    select(result, "zoek")
                }

                // Check if any of the voice commands are said.
                if (!(result.includes("selecteer") || result.includes("kopieer") || result.includes("plak") || result.includes("vind") || result.includes("zoek"))) {
                    // Fill and show the pop-up.
                    popup("warning.png", "Stemcommando onduidelijk.")
                }

                final += result
            } else {
                interim += result
            }
        }

        // Add the final or interim transcript to the HTML.
        $("#final").innerHTML = final
        $("#interim").innerHTML = interim
    }

    // Automatically start the speech recognition.
    speechRecognition.start()

    $("#record").onclick = () => {
        try {
            // Start the speech recognition.
            speechRecognition.start()
        } catch {
            // Stop the speech recognition.
            speechRecognition.stop()
        }
    }
} else {
    console.log("Spraakherkenning niet beschikbaar.")
}