package com.egsdevelopment.donkeymobile.data.post.generator

import com.egsdevelopment.donkeymobile.data.post.entity.PostEntity
import com.egsdevelopment.donkeymobile.data.user.provider.UserProvider
import javax.inject.Inject

class PostGenerator @Inject constructor(
    private val userProvider: UserProvider
) {

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
        "https://upload.wikimedia.org/wikipedia/commons/5/5f/People_gathering_in_front_of_the_Sixth_Presbyterian_Church_for_the_2018_Jewish_pittsburgh_shooting_event.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/2/25/Central_Christian_Church_worship_service.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/e/e5/All_Saints_Church%2C_Highweek_from_the_graveyard.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/d/d2/Church_Service_1600s.jpeg",
        "https://upload.wikimedia.org/wikipedia/commons/a/ae/BonfimSalvador-CCBY.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/1/19/St_Casimir_Church_Exterior_At_Dusk%2C_Vilnius%2C_Lithuania_-_Diliff.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Church_service%2C_Yerevan_%285211267961%29.jpg/1200px-Church_service%2C_Yerevan_%285211267961%29.jpg",
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

    private val users = userProvider.provide()

    val posts = generate(450)

    private fun generate(amount: Int): List<PostEntity> {
        val posts = mutableListOf<PostEntity>()
        repeat(amount) { index ->
            posts.add(
                PostEntity(
                    id = index,
                    title = titles[(titles.indices).random()],
                    message = messages[(messages.indices).random()],
                    imgSrc = images[(images.indices).random()],
                    timeStamp = timestamps[(timestamps.indices).random()],
                    userId = users[(users.indices).random()].id
                )
            )
        }
        return posts
    }
}


