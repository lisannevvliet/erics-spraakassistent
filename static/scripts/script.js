let results = []
let index = 0
let copy_on_select = false

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
    setTimeout(() => {
        $("#pop-up").classList.remove("show")
    }, 3000)
}

function select() {
    // Check if the specified result exists.
    if (results[index]) {
        // Focus on the textarea.
        $("textarea").focus()

        // Select the specified result.
        // https://stackoverflow.com/questions/3085446/selecting-part-of-string-inside-an-input-box-with-jquery
        if (typeof $("textarea").selectionStart != "undefined") {
            $("textarea").selectionStart = results[index][0]
            $("textarea").selectionEnd = results[index][1]
        } else if (document.selection && document.selection.createRange) {
            // IE branch.
            $("textarea").select()
            let range = document.selection.createRange()
            range.collapse(true)
            range.moveEnd("character", results[index][1])
            range.moveStart("character", results[index][0])
            range.select()
        }

        if (copy_on_select) {
            let text

            // Get the selected text on the website.
            // https://stackoverflow.com/questions/5379120/get-the-highlighted-selected-text
            if (window.getSelection) {
                text = window.getSelection().toString()
            // Support for Internet Explorer 9 and below.
            } else if (document.selection && document.selection.type != "Control") {
                text = document.selection.createRange().text
            }

            // Copy the selected text.
            navigator.clipboard.writeText(text)
        }
    }
}

function find(result, command) {
    let string
    let string_to
    let pattern_to

    if (command.length == 1) {
        // Cut the string after the select command.
        string = result.substring(result.indexOf(command[0]) + command[0].length + 1)
    } else {
        // Cut the strings after the select commands.
        string = result.substring(result.indexOf(command[0]) + command[0].length + 1, result.indexOf(command[1]) - 1)
        string_to = result.substring(result.indexOf(command[1]) + command[1].length + 1)

        // The "i" modifier specifies a case-insensitive match.
        pattern_to = new RegExp(string_to, "gi")
    }

    // The "i" modifier specifies a case-insensitive match.
    const pattern = new RegExp(string, "gi")
    let match
    
    // Clear the previous selection.
    results = []

    if (command.length == 1) {
        if (command[0] == "vanaf") {
            // Find all instances of the string in the textarea.
            while ((match = pattern.exec($("textarea").value)) != null) {
                // Add the first index of the result and last index of the textarea to an array.
                results.push([match.index, -1])
            }
        } else {
            // Find all instances of the string in the textarea.
            while ((match = pattern.exec($("textarea").value)) != null) {
                // Add the first and last index of the result to an array.
                results.push([match.index, pattern.lastIndex])
            }
        }
    } else {
        // Temporarily arrays for the selections.
        let selection_from = []
        let selection_to = []

        // Find all instances of the string in the textarea.
        while ((match = pattern.exec($("textarea").value)) != null) {
            // Add the first and last index of the result to an array.
            selection_from.push([match.index, pattern.lastIndex])
        }

        // Find all instances of the string in the textarea.
        while ((match = pattern_to.exec($("textarea").value)) != null) {
            // Add the first and last index of the result to an array.
            selection_to.push([match.index, pattern_to.lastIndex])
        }

        // Filter out the impossible selections.
        selection_from.forEach((element_from) => {
            selection_to.forEach((element_to) => {
                if (element_from[1] < element_to[0]) {
                    // Add the first and last index of the result to an array.
                    results.push([element_from[0], element_to[1]])
                }
            })
        })
    }

    // Fill and show the pop-up.
    if (command.length == 1) {
        popup("search.png", `"${string}" ${results.length} keer gevonden.`)
    } else {
        popup("search.png", `"${string}" tot "${string_to}" ${results.length} keer gevonden.`)
    }
    
    // Set the index to 0.
    index = 0
    
    // Select the first result.
    select()
}

function save() {
    // Save the value of the textarea in the localStorage.
    localStorage.setItem("textarea", $("textarea").value)
}

// https://codepen.io/pedro404/pen/KKaaovd?editors=1010
function download() {
    const link = document.createElement("a")
	const blob = new Blob([$("textarea").value], {
		type: "text/plain"
	})

    link.download = "data-" + Date.now() + ".txt"
	link.href = URL.createObjectURL(blob)
	link.click()

	URL.revokeObjectURL(link.href)
}

$("textarea").addEventListener("input", () => {
    save()
})

$("#download").addEventListener("click", () => {
    // Download the contents of textarea as a text file.
    download()
})

$("#reset").addEventListener("click", () => {
    // Fill the textarea with sample text.
    $("textarea").value = "Lorem Ipsum is slechts een proeftekst uit het drukkerij- en zetterijwezen. Lorem Ipsum is de standaard proeftekst in deze bedrijfstak sinds de 16e eeuw, toen een onbekende drukker een zethaak met letters nam en ze door elkaar husselde om een font-catalogus te maken. Het heeft niet alleen vijf eeuwen overleefd maar is ook, vrijwel onveranderd, overgenomen in elektronische letterzetting. Het is in de jaren '60 populair geworden met de introductie van Letraset vellen met Lorem Ipsum passages en meer recentelijk door desktop publishing software zoals Aldus PageMaker die versies van Lorem Ipsum bevatten."

    save()
})

$("#copy-on-select").addEventListener("change", (element) => {
    // Check if the checkbox is checked.
    if (element.target.checked) {
        copy_on_select = true
    } else {
        copy_on_select = false
    }
})

// Retrieve the value of the textarea from the localStorage and fill the textarea.
$("textarea").value = localStorage.getItem("textarea")

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
        // Show the alert which tells the user that the microphone is on.
        $("#alert").classList.add("show")
    }

    function stop() {
        // Make the record button the default color.
        $("#record").classList.remove("red")
        // Fill the record button with a microphone image.
        $("#record img").src = "images/microphone.png"
        // Remove the bigger padding from the stop image.
        $("#record img").classList.remove("stop")
        // Remove the alert which tells the user that the microphone is on.
        $("#alert").classList.remove("show")
    }

    speechRecognition.onerror = () => {
        stop()

        // Log an error message.
        console.log("Spraakherkenningsfout.")
    }

    speechRecognition.onend = () => {
        stop()
    }

    speechRecognition.onresult = (event) => {
        let final = ""
        let interim = ""
  
        // Loop through the results.
        for (let i = event.resultIndex; i < event.results.length; ++i) {
            const result = event.results[i][0].transcript

            // Add the result to the corresponding string (final or interim).
            if (event.results[i].isFinal) {
                // Check if the word "selecteer" is said.
                if (result.includes("selecteer ")) {
                    // Check if the word "vanaf" is said.
                    if (result.includes("vanaf ")) {
                        find(result, ["vanaf"])
                    // Check if the word "tot" is said.
                    } else if (result.includes("tot ")) {
                        find(result, ["selecteer", "tot"])
                    } else {
                        find(result, ["selecteer"])
                    }
                }

                // Check if the word "volgende" is said.
                if (result.includes("volgende")) {
                    // Increase the index of the selected result if possible.
                    if (index + 1 <= results.length - 1) {
                        index++
                    }

                    // Select the result.
                    select()

                    // Fill and show the pop-up.
                    popup("cursor.png", `${index + 1}&#7497; resultaat geselecteerd (van de ${results.length}).`)
                }

                // Check if the word "vorige" is said.
                if (result.includes("vorige")) {
                    // Decrease the index of the selected result if possible.
                    if (index > 0) {
                        index--
                    }

                    // Select the result.
                    select()

                    // Fill and show the pop-up.
                    popup("cursor.png", `${index + 1}&#7497; resultaat geselecteerd (van de ${results.length}).`)
                }

                // Check if the word "kopieer" is said.
                if (result.includes("kopieer ")) {
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

                    save()
                }

                // Check if the word "schrijf" is said.
                if (result.includes("schrijf ")) {
                    // Cut the string after the write command.
                    string = result.substring(result.indexOf("schrijf") + "schrijf".length + 1)

                    // Fill the textarea.
                    $("textarea").value += string

                    save()

                    // Fill and show the pop-up.
                    popup("pen.png", `${string} geschreven.`)
                }

                // Check if the sentence "download tekstveld" is said.
                if (result.includes("download tekstveld") || result.includes("download tekst veld")) {
                    // Download the contents of textarea as a text file.
                    download()

                    // Fill and show the pop-up.
                    popup("download.png", "Tekstveld gedownload.")
                }

                // Check if the sentence "leeg tekstveld" is said.
                if (result.includes("leeg tekstveld") || result.includes("leeg tekst veld")) {
                    // Clear the textarea.
                    $("textarea").value = ""

                    save()

                    // Fill and show the pop-up.
                    popup("bin.png", "Tekstveld leeggemaakt.")
                }

                // Check if any of the voice commands are said.
                if (!(result.includes("selecteer ") || result.includes("volgende") || result.includes("vorige") || result.includes("kopieer ") || result.includes("plak") || result.includes("schrijf ") || result.includes("download tekstveld") || result.includes("download tekst veld") || result.includes("leeg tekstveld") || result.includes("leeg tekst veld"))) {
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

    $("#language").addEventListener("change", () => {
        // Change the language.
        speechRecognition.lang = $("#language").value

        // Restart the speech recognition.
        speechRecognition.stop()
        setTimeout(() => {
            speechRecognition.start()
        }, 400)
    })
} else {
    console.log("Spraakherkenning niet beschikbaar.")
}