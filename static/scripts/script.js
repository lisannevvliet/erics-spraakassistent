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

let selection = []
let selected

function select(index) {
    // Check if the specified result exists.
    if (selection[index]) {
        // Focus on the textarea.
        $("textarea").focus()

        // Select the specified result.
        // https://stackoverflow.com/questions/3085446/selecting-part-of-string-inside-an-input-box-with-jquery
        if (typeof $("textarea").selectionStart != "undefined") {
            $("textarea").selectionStart = selection[index][0]
            $("textarea").selectionEnd = selection[index][1]
        } else if (document.selection && document.selection.createRange) {
            // IE branch.
            $("textarea").select()
            var range = document.selection.createRange()
            range.collapse(true)
            range.moveEnd("character", selection[index][1])
            range.moveStart("character", selection[index][0])
            range.select()
        }
    }
}

// var downloadableLink = document.createElement("a")
// downloadableLink.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent($("textarea").value))
// downloadableLink.download = "myFile" + ".txt"
// downloadableLink.innerText = "Export to text file"
// $("#download").appendChild(downloadableLink)
// downloadableLink.click()
// document.body.removeChild(downloadableLink)

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
                // Check if the word "selecteer" is said.
                if (result.includes("selecteer ")) {
                    // Cut the string after the select command.
                    const string = result.substring(result.indexOf("selecteer") + "selecteer".length + 1)

                    // The "i" modifier specifies a case-insensitive match.
                    const pattern = new RegExp(string, "gi")
                    let match

                    // Clear the previous selection.
                    selection = []

                    // Find all instances of the string in the textarea.
                    while ((match = pattern.exec($("textarea").value)) != null) {
                        // Add the first and last index of the result to an array.
                        selection.push([match.index, pattern.lastIndex])
                    }

                    // Fill and show the pop-up.
                    popup("search.png", `"${string}" ${selection.length} keer gevonden.`)

                    // Set the index to 0.
                    selected = 0
                    
                    // Select the first result.
                    select(selected)
                }

                // Check if the word "volgende" is said.
                if (result.includes("volgende")) {
                    // Increase the index of the selected result if possible.
                    if (selected + 1 <= selection.length - 1) {
                        selected++
                    }

                    // Select the result.
                    select(selected)

                    // Fill and show the pop-up.
                    popup("cursor.png", `${selected + 1}&#7497; resultaat geselecteerd.`)
                }

                // Check if the word "vorige" is said.
                if (result.includes("vorige")) {
                    // Decrease the index of the selected result if possible.
                    if (selected > 0) {
                        selected--
                    }

                    // Select the result.
                    select(selected)

                    // Fill and show the pop-up.
                    popup("cursor.png", `${selected + 1}&#7497; resultaat geselecteerd.`)
                }

                // Check if the word "kopieer" is said.
                if (result.includes("kopieer")) {
                    let text

                    if (result.includes("geselecteerde tekst")) {
                        // Get the selected text on the website.
                        // https://stackoverflow.com/questions/5379120/get-the-highlighted-selected-text
                        if (window.getSelection) {
                            text = window.getSelection().toString()
                        // Support for Internet Explorer 9 and below.
                        } else if (document.selection && document.selection.type != "Control") {
                            text = document.selection.createRange().text
                        }
                    } else {
                        // Copy everything after the word "kopieer".
                        text = result.substring(result.indexOf("kopieer") + "kopieer".length + 1)
                    }

                    // Copy the selected text.
                    navigator.clipboard.writeText(text)

                    // Fill and show the pop-up.
                    popup("copy.png", `"${text}" gekopieerd.`)
                }

                // Check if the word "plak" is said.
                if (result.includes("plak")) {
                    // https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Interact_with_the_clipboard#reading_from_the_clipboard
                    navigator.clipboard.readText().then((text) => {
                        // Fill the textarea with the clipboard text.
                        $("textarea").value = text
                
                        // Fill and show the pop-up.
                        popup("clipboard.png", `"${text}" geplakt.`)
                    })
                }

                // Check if the word "schrijf" is said.
                if (result.includes("schrijf")) {
                    // Cut the string after the write command.
                    string = result.substring(result.indexOf("schrijf") + "schrijf".length + 1)

                    // Fill the textarea.
                    $("textarea").value += string

                    // Fill and show the pop-up.
                    popup("pen.png", `${string} geschreven.`)
                }

                // Check if the text "maak het tekstveld leeg" is said.
                if (result.includes("maak het tekstveld leeg") || result.includes("maak het tekst veld leeg")) {
                    // Clear the textarea.
                    $("textarea").value = ""

                    // Fill and show the pop-up.
                    popup("bin.png", "Tekstveld leeggemaakt.")
                }

                // Check if any of the voice commands are said.
                if (!(result.includes("selecteer ") || result.includes("volgende") || result.includes("vorige") || result.includes("kopieer") || result.includes("plak") || result.includes("schrijf") || result.includes("maak het tekstveld leeg") || result.includes("maak het tekst veld leeg"))) {
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