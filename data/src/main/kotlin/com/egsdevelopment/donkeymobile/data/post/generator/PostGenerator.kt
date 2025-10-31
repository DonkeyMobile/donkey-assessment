package com.egsdevelopment.donkeymobile.data.post.generator

import com.egsdevelopment.donkeymobile.data.post.entity.PostEntity
import javax.inject.Inject

class PostGenerator @Inject constructor() {

    fun generate(amount: Int): List<PostEntity> {
        val posts = mutableListOf<PostEntity>()
        repeat(amount) { index ->
            posts.add(
                PostEntity(
                    id = index,
                    title = titles[(titles.indices).random()],
                    message = messages[(messages.indices).random()],
                    imgSrc = images[(images.indices).random()],
                    timeStamp = timestamps[(timestamps.indices).random()],
                )
            )
        }
        return posts
    }

    /**
     * Just a dataset of images of churches to enrich posts. We want to add some random nulls to simulate posts without image content
     */
    private val images: List<String?> = listOf(
        "https://upload.wikimedia.org/wikipedia/commons/1/16/Interior_of_a_Gothic_Church_%28SM_574%29.png",
        "https://upload.wikimedia.org/wikipedia/commons/0/04/1023581-Cathedral_Church_of_St_Mary_%2810%29.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/1/1f/Canterbury-cathedral-wyrdlight.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/c/c3/A_CHURCH_INTERIOR_%29.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/f/f7/Eunate-inside_iglesia_santa_maria.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/St._Gertrude_Old_Church_Interior_1%2C_Riga%2C_Latvia_-_Diliff.jpg/1533px-St._Gertrude_Old_Church_Interior_1%2C_Riga%2C_Latvia_-_Diliff.jpg?20150120163232",
        "https://pixnio.com/free-images/2021/03/11/2021-03-11-12-26-22-1800x1200.jpg",
        "https://i1.pickpik.com/photos/987/417/269/architecture-bright-catholic-church-preview.jpg",
        "https://www.lookandlearn.com/history-images/preview/YLV/YLV1/YLV1037/YLV1037178_RC-Church-Maitland.jpg",
        "https://b2385643.smushcdn.com/2385643/wp-content/uploads/2019/04/Unifying-Architecture-and-Design-NB-min.jpg?lossy=1&strip=1&webp=1",
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null
    )

    private val titles = listOf(
        "Nieuwe kringavond aangekondigd",
        "Vrijwilligers gezocht voor koffiedienst",
        "Gezamenlijke dienst met jeugdkerk",
        "Ouderenmiddag druk bezocht",
        "Update renovatie ontmoetingsruimte",
        "Zomerkamp voor jongeren gestart",
        "Welkom aan onze nieuwe predikant",
        "Bloemengroet team zoekt versterking",
        "Kerkdienst verplaatst vanwege onderhoud",
        "Inzameling voor voedselbank gestart",
        "Nieuw zangkoor repeteert elke woensdag",
        "Paasontbijt in voorbereiding",
        "Veranderingen in coronamaatregelen",
        "Nieuwe website van de gemeente live",
        "Dankdienst voor vrijwilligers gepland",
        "Kerkmarkt trekt veel bezoekers",
        "Nieuwe geluidsinstallatie geplaatst",
        "Inloopochtend voortaan twee keer per maand",
        "Samen eten avond groot succes",
        "Collecteopbrengst overstijgt verwachting"
    )

    private val messages = listOf(
        "De volgende kringavond vindt plaats op donderdag om 20:00 uur in de bovenzaal. Iedereen is welkom om aan te sluiten.",
        "Voor de komende zondagen zoeken we nog mensen die willen helpen met de koffiedienst. Opgeven kan via de appgroep of bij het secretariaat.",
        "Aankomende zondag is er een gezamenlijke dienst met de jeugdkerk. De jongeren zullen ook enkele liederen verzorgen.",
        "De ouderenmiddag van afgelopen dinsdag was erg gezellig. Ruim 40 bezoekers genoten van muziek en gebak.",
        "De renovatie van de ontmoetingsruimte verloopt volgens planning. De vloer is inmiddels gelegd en het schilderwerk start volgende week.",
        "Het zomerkamp is van start gegaan! 32 jongeren vertrokken maandagochtend naar de Ardennen voor een week vol activiteiten.",
        "Afgelopen zondag hebben we onze nieuwe predikant officieel verwelkomd. Na afloop was er gelegenheid tot kennismaken in de hal.",
        "Het bloemengroet team zoekt nieuwe leden om eens per maand bloemen te bezorgen bij gemeenteleden.",
        "Vanwege werkzaamheden aan de verwarming vindt de dienst aankomende zondag plaats in de kleine zaal.",
        "De diaconie is gestart met een inzameling voor de lokale voedselbank. Houdbare producten kunnen worden ingeleverd bij de ingang.",
        "Sinds deze week repeteert het nieuwe zangkoor op woensdagavond. Interesse om mee te zingen? Neem contact op met Anneke.",
        "Het jaarlijkse paasontbijt wordt weer georganiseerd. Opgeven kan tot 10 maart via de intekenlijst in de hal.",
        "Er zijn enkele aanpassingen in de coronamaatregelen. Mondkapjes zijn niet langer verplicht, maar afstand houden blijft gewenst.",
        "Onze nieuwe website is live! Bezoek www.gemeentevoorbeeld.nl voor het laatste nieuws en activiteiten.",
        "Op zondag 12 november houden we een dankdienst voor alle vrijwilligers die zich inzetten voor de gemeente.",
        "De kerkmarkt afgelopen zaterdag trok veel bezoekers. De opbrengst gaat naar het onderhoudsfonds.",
        "De nieuwe geluidsinstallatie is geplaatst en zal komende zondag voor het eerst worden gebruikt.",
        "De inloopochtenden worden zo goed bezocht dat we voortaan twee bijeenkomsten per maand organiseren.",
        "De samen eten avond van vorige week was een groot succes. Dank aan iedereen die heeft geholpen met koken en opruimen!",
        "De collecte van afgelopen zondag leverde €740 op, een prachtig resultaat. Hartelijk dank voor alle bijdragen."
    )

    private val timestamps = listOf(
        "2024-11-10T09:00:00Z",
        "2024-11-17T09:00:00Z",
        "2024-11-24T09:00:00Z",
        "2024-12-01T09:00:00Z",
        "2024-12-15T09:00:00Z",
        "2025-01-07T09:00:00Z",
        "2025-01-14T09:00:00Z",
        "2025-01-28T09:00:00Z",
        "2025-02-04T09:00:00Z",
        "2025-02-18T09:00:00Z",
        "2025-03-03T09:00:00Z",
        "2025-03-17T09:00:00Z",
        "2025-03-31T09:00:00Z",
        "2025-04-14T09:00:00Z",
        "2025-05-05T09:00:00Z",
        "2025-05-19T09:00:00Z",
        "2025-06-02T09:00:00Z",
        "2025-06-16T09:00:00Z",
        "2025-07-07T09:00:00Z",
        "2025-07-21T09:00:00Z"
    )
}


