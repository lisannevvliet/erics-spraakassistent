# Eric's Spraakassistent

## Inhoudsopgave
- [Live demo](#live-demo)
- [Licentie](#licentie)
- [Testverslagen](#testverslagen)
  * [Versie 1](#versie-1)
  * [Versie 2](#versie-2)

## Live demo
https://erics-spraakassistent.herokuapp.com/

## Licentie
Dit project is gelicenseerd onder de [GPL-3.0 licentie](https://github.com/lisannevvliet/erics-spraakassistent/blob/main/LICENSE).

## Testverslagen

### Versie 1
**Datum:**  21 april 2022  
**Code:**  https://github.com/lisannevvliet/erics-spraakassistent/tree/versie-1  
**Live demo:** https://erics-spraakassistent-versie-1.herokuapp.com/

- Moet de website automatisch starten met opnemen?
  * Ja. Nog wel een stop- en startknop om de privacy mee te kunnen waarborgen.

- Hoe moet hij iets selecteren? Is hij daar tevreden mee? Is een optie om tekst te selecteren middels spraak interessant?
  * Eric kan prima selecteren, maar de mogelijkheid om te selecteren middels spraak is zeker interessant voor een kennis van hem die beperkter is.

- Is een vertaalmachine (https://yandex.com/dev/translate/) interessant?
  * Ja, dat is altijd leuk.

- Zijn er nog overige opmerkingen?
  * De tussentijdse resultaten zijn te afleidend, in de uiteindelijke versie is het fijner als de gebruiker enkel ziet dat er geluisterd wordt. De tussentijdse resultaten kunnen beter in de console worden gelogd.
  * Zoeken naar meerdere instanties van hetzelfde woord zou handig zijn, net als grote stukken tekst op een pagina selecteren en kopiëren middels spraak. Op de positie van de geselecteerde tekst iets aanpassen is ook handig.
  * Implementatie van Google Docs is de moeite waard om te onderzoeken (voornamelijk Google Sheets, dat gebruikt Eric veel). Opmaak meenemen (of juist niet) is belangrijk bij het plakken.
  * Feedback van Koop: Is het interessant om de voice assistant in een Chrome Extensie om te zetten? Dat is persoonlijk genoeg (prioritise identity).
  * Voorkeur voor de Nederlandse taal, maar tweetalig is nóg beter.
  * Liever één hele solide functie dan meerdere half-werkende functies.

### Versie 2
**Datum:**  28 april 2022  
**Code:**  https://github.com/lisannevvliet/erics-spraakassistent/tree/versie-2  
**Live demo:** https://erics-spraakassistent-versie-2.herokuapp.com/

- Instructies verduidelijken en wachttijd na spraakcommando's melden.
- Meteen kopiëren na selecteren (optioneel, eventueel een checkbox van maken).
- Spraakcommando's "kopieer geselecteerde tekst" en "selecteer" niet laten botsen.
- Index van resultaat op het juiste moment nul zetten, er kwam namelijk een bug voor waarbij meteen het tweede resultaat geselecteerd werd.
- Mogelijk op te selecteren van ... tot ..., met ondersteuning voor "volgende" en "vorige".
- Vermelden dat de website spraak opneemt bovenaan de pagina.
- Spraakcommando's fail-proofen (optioneel).

<!-- Add a link to your live demo in Github Pages 🌐-->

<!-- ☝️ replace this description with a description of your own work -->

<!-- replace the code in the /docs folder with your own, so you can showcase your work with GitHub Pages 🌍 -->

<!-- Add a nice poster image here at the end of the week, showing off your shiny frontend 📸 -->

<!-- Maybe a table of contents here? 📚 -->

<!-- How about a section that describes how to install this project? 🤓 -->

<!-- ...but how does one use this project? What are its features 🤔 -->

<!-- Maybe a checklist of done stuff and stuff still on your wishlist? ✅ -->

<!-- How about a license here? 📜 (or is it a licence?) 🤷 -->
