# Eric's Spraakassistent

## Inhoudsopgave
- [Beschrijving](#beschrijving)
  - [Probleemstelling / User scenario](https://github.com/lisannevvliet/erics-spraakassistent#probleemstelling--user-scenario)
  - [Exclusive Design Principles](#exclusive-design-principles)
- [Poster](#poster)
- [Live demo](#live-demo)
- [Installatie](#installatie)
- [Gebruikershandleiding en functies](#gebruikershandleiding-en-functies)
- [Checklist](#checklist)
- [Licentie](#licentie)
- [Testverslagen](#testverslagen)
  - [Versie 1](#versie-1)
  - [Versie 2](#versie-2)
  - [Versie 3](#versie-3)
  - [Conclusie](#conclusie)

## Beschrijving
Eric's Spraakassistent is een website waarmee een tekst met enkel spraakopdrachten gemanipuleerd kan worden. Onder andere selecteren, kopiëren, plakken, schrijven, downloaden en weghalen van de tekst behoren tot de mogelijkheden.

### Probleemstelling / User scenario
Een kennis van Eric beschikt niet over de fijne motoriek die nodig is om gemakkelijk te kunnen kopiëren en plakken. Om dit probleem op te lossen, kreeg ik de opdracht om haar te laten kopiëren en plakken middels spraak. Zo wordt het mogelijk voor haar om deze handelingen relatief snel uit te voeren.

### Exclusive Design Principles
**Study situation**  
- 
...

**Prioritise identity**  
- Eric's naam in de titel.
- Kleurenpalet bestaat uit Eric's favoriete kleuren: groen en geel.

**Ignore conventions**  
- Automatisch starten met opnemen zodra de website wordt geopend.
...

**Add nonsense**  
- Rolstoel die met een vaart onderaan het scherm rijdt zodra de naam "Eric" wordt genoemd.

<!-- Student laat zien hoe de Exclusive Design Principles zijn toegepast in het ontwerp. De principes study situation, prioritise identity, ignore conventions en add nonsense zijn goed uitgelegd. Aan de hand van de principes wordt duidelijk gemaakt hoe deze hebben bijgedragen aan het verbeteren van het ontwerp. -->

## Poster
...

<!-- Add a nice poster image here at the end of the week, showing off your shiny frontend 📸 -->

## Gebruikershandleiding en functies
...

<!-- ...but how does one use this project? What are its features 🤔 -->

## Live demo
https://erics-spraakassistent.herokuapp.com/

## Installatie
Om te bekijken, bezoek de [Heroku app](https://erics-spraakassistent.herokuapp.com/). Om lokale wijzigingen aan te brengen, clone de repository en bewerk de bestanden in een IDE.

## Checklist
De voltooide taken zijn te vinden in de [commit messages](https://github.com/lisannevvliet/erics-spraakassistent/commits/main). De volgende taken konden niet binnen de gestelde tijd worden voltooid, maar zouden leuk zijn om te hebben.

- [ ] [Vertaalmachine](https://yandex.com/dev/translate/) implementeren.
- [ ] Geselecteerde tekst aanpasbaar maken.
- [ ] Google Docs implementeren.
- [ ] Website omzetten naar een Chrome Extensie.
- [ ] "Volgende" en "vorige" bij "selecteer ... tot ..." efficiënter maken.
- [ ] Website volledig bestuurbaar met spraak maken.
- [ ] Spraakcommando's versleepbaar maken.
- [ ] 's Avonds automatisch veranderen naar dark mode.
- [ ] "Maak ongedaan" optie toevoegen.
- [ ] "Tot" vervangen door "tot en met".

## Licentie
Dit project is gelicenseerd onder de [GPL-3.0 licentie](https://github.com/lisannevvliet/erics-spraakassistent/blob/main/LICENSE).

## Testverslagen

### Versie 1
**Datum:**  21 april 2022  
**Code: [GitHub](https://github.com/lisannevvliet/erics-spraakassistent/tree/versie-1)**  
**Live demo: [Heroku app](https://erics-spraakassistent-versie-1.herokuapp.com/)**

Tijdens de eerste test lag de focus voornamelijk op kennismaken met Eric en laten zien wat ik tot nu toe had. Nadat ik dit gedemonstreerd had, ging Eric zelf de spraakassistent uitproberen. Hij reageerde enthousiast en kwam met de onderstaande verbeterpunten en suggesties.

- Moet de website automatisch starten met opnemen?
  - Ja. Nog wel een stop- en startknop om de privacy mee te kunnen waarborgen.

- Hoe moet hij iets selecteren? Is hij daar tevreden mee? Is een optie om tekst te selecteren middels spraak interessant?
  - Eric kan prima selecteren, maar de mogelijkheid om te selecteren middels spraak is zeker interessant voor een kennis van hem die beperkter is.

- Is een [vertaalmachine](https://yandex.com/dev/translate/) interessant?
  - Ja, dat is altijd leuk.

- Zijn er nog overige opmerkingen?
  - De tussentijdse resultaten zijn te afleidend, in de uiteindelijke versie is het fijner als de gebruiker enkel ziet dat er geluisterd wordt. De tussentijdse resultaten kunnen beter in de console worden gelogd.
  - Zoeken naar meerdere instanties van hetzelfde woord zou handig zijn, net als grote stukken tekst op een pagina selecteren en kopiëren middels spraak. Op de positie van de geselecteerde tekst iets aanpassen is ook handig.
  - Implementatie van Google Docs is de moeite waard om te onderzoeken (voornamelijk Google Sheets, dat gebruikt Eric veel). Opmaak meenemen (of juist niet) is belangrijk bij het plakken.
  - Feedback van Koop: Is het interessant om de voice assistant in een Chrome Extensie om te zetten? Dat is persoonlijk genoeg (prioritise identity).
  - Voorkeur voor de Nederlandse taal, maar tweetalig is nóg beter.
  - Liever één hele solide functie dan meerdere half-werkende functies.

Voor de tweede test ga ik de website automatisch laten starten met opnemen, een stop- en startknop toevoegen, de tussentijdse resultaten leegmaken zodra er een nieuw spraakcommando wordt uitgesproken en zoeken naar meerdere instanties van hetzelfde woord ondersteunen.

Later ga ik eventueel een vertaalmachine implementeren, grote stukken tekst op een pagina selecteren ondersteunen, de geselecteerde tekst aanpasbaar maken, Google Docs implementeren, de website omzetten naar een Chrome Extensie en de spraakassistent tweetalig maken.

### Versie 2
**Datum:**  28 april 2022  
**Code: [GitHub](https://github.com/lisannevvliet/erics-spraakassistent/tree/versie-2)**  
**Live demo: [Heroku app](https://erics-spraakassistent-versie-2.herokuapp.com/)**

Tijdens de tweede test heb ik de eerste paar minuten niets gezegd, om de pijnpunten van de website te achterhalen. Een ander verschil met de eerste test was het apparaat waarop de website getoond werd, dit maal gebruikte hij namelijk zijn eigen Windows-laptop. Hij was wederom positief verrast. Tijdens de eerste test had hij verteld dat hij graag wilde dat de spraakassistent automatisch begon met opnemen, maar nu kwam hij hierop terug. Toen ik vroeg waarom hij dit liever niet wilde, legde hij uit dat hij het niet fijn vond dat er een kans was dat de gebruiker niet weet dat de website aan het opnemen is. Om dit te voorkomen, stelde hij voor om een melding hiervan bovenaan de website te tonen. Zo blijft de website toch toegankelijk, omdat de gebruiker niet hoeft te klikken, maar kan hij/zij niet missen dat de microfoon aanstaat. Hier stemde hij mee in. De onderstaande takenlijst heb ik opgesteld tijdens en na de tweede test, aan de hand van Eric's verbeterpunten en suggesties.

- Instructies verduidelijken en wachttijd na spraakcommando's melden.
- Meteen kopiëren na selecteren (optioneel, eventueel een checkbox van maken).
- Spraakcommando's "kopieer geselecteerde tekst" en "selecteer" niet laten botsen (optioneel).
- Mogelijk om te selecteren van ... tot ..., met ondersteuning voor "volgende" en "vorige".
- Vermelden dat de website spraak opneemt bovenaan de pagina.

Voor de derde test ga ik alle bovenstaande taken uitvoeren. Daarnaast ga ik grote stukken tekst op een pagina selecteren ondersteunen en de spraakassistent tweetalig maken.

### Versie 3
**Datum:**  12 mei 2022  
**Code: [GitHub](https://github.com/lisannevvliet/erics-spraakassistent/tree/versie-3)**  
**Live demo: [Heroku app](https://erics-spraakassistent-versie-3.herokuapp.com/)**

...

- Is het vervelend voor de kennis van Eric dat knoppen handmatig moeten worden ingedrukt, en niet via spraakcommando's bestuurd kunnen worden?
  - Nee, voor haar niet. Maar een website die volledig met spraak kan worden bestuurd is wel een interessant concept.

- Staan de spraakcommando's goed onder de instructies?
  - Opzich wel, maar het zou nog fijner zijn als ze op de pagina zelf zouden staan en daar versleept zouden kunnen worden naar een plek naar keuze.

- Is Eric tevreden over de opneem-knop?
  - Ja.

- Wat is Eric's favoriete kleur?
  - Hij houdt van meerdere kleuren, maar groen en geel zijn momenteel zijn favoriet.

-  Wat is Eric's hobby's?
  -  Rijden (door het bos), lezen, film kijken, muziek luisteren en concerten bezoeken.

- Houdt Eric van light of dark mode?
  - Light mode, maar als het automatisch veranderd naar dark mode in de avond vind hij dat fijn.
 
- Vind Eric het leuk als er qua nonsense een rolstoel langs komt rijden onderaan het scherm? 
  - Jazeker! Zijn rolstoel is zijn identiteit.

- Is de functie om geselecteerde tekst aan te passen belangrijk?
  - Ja, dat zou de website nóg bruikbaarder maken.

- Is het nodig dat in de pop-up staat dat de geselecteerde tekst gekopieerd is als de checkbox aanstaat?
  - Ja.

- Zijn er nog overige opmerkingen?
  - Het zou nog handiger zijn als er ook een "maak ongedaan" optie is.
  - Als er "tot" in het woord/de zin zit die geselecteerd moet worden gaat het niet goed. Alternatief: "tot" vervangen door "tot en met", dat vermindert de kans hierop. Een eigen taal voor de spraakcommando's zou dit probleem ook oplossen, maar hierbij is de leercurve te groot.

Voor het eindproduct ga ik het kleurenpalet aanpassen naar Eric's favoriete kleuren: groen en geel, een rolstoel langs laten rijden onderaan het scherm en in de pop-up zetten dat de geselecteerde tekst gekopieerd is als de checkbox aanstaat.

Later ga ik eventueel "volgende" en "vorige" bij "selecteer ... tot ..." efficiënter maken, de website volledig bestuurbaar met spraak maken, de spraakcommando's versleepbaar maken, 's avonds automatisch veranderen naar dark mode, geselecteerde tekst aanpasbaar maken, een "maak ongedaan" optie toevoegen en "tot" vervangen door "tot en met".

### Conclusie
...

<!-- Er is minimaal drie keer getest. Er is een verslaglegging van de tests gedaan waarin de test-opzet wordt behandeld en er is een duidelijke conclusie beschreven met do's en dont's over hoe je goed kan testen. -->
<!-- Aan de hand van de tests wordt duidelijk gemaakt hoe deze hebben bijgedragen aan het verbeteren van het ontwerp of hoe dit een volgende keer beter of anders kan. -->
