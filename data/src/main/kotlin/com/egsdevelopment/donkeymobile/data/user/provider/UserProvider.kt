package com.egsdevelopment.donkeymobile.data.user.provider

import com.egsdevelopment.domain.authentication.model.user.UserCredentials
import com.egsdevelopment.donkeymobile.data.user.entity.UserEntitiy
import javax.inject.Inject

class UserProvider @Inject constructor() {

    fun provide(): List<UserEntitiy> {
        return users
    }

    private val users = listOf(
        UserEntitiy(
            id = 0,
            username = "e_smits",
            password = "Test1234",
            bio = "Evert Smits is 27 jaar en werkzaam als Android Developer",
            avatarHexColor = "#FF0000",
            communitiesIds = listOf(0, 1, 2)
        ),
        UserEntitiy(
            id = 1,
            username = "jordy_donkeymobile",
            password = "TestJordy1234",
            avatarHexColor = "#00FF00",
            bio = "De afgelopen jaren ben ik werkzaam geweest als Android en iOS developer bij verschillende bedrijven op nationaal en internationaal niveau. Zo heb ik apps ontwikkeld voor het huren van hoogwerkers, het scannen van je boodschappen in de supermarkt en het digitaliseren van al je plastic pasjes. De opgedane kennis en ervaring kan ik nu gebruiken om DE app voor kerken te maken! Ik ben dankbaar dat Donkey Mobile op mijn pad terecht is gekomen en hoop op deze manier een steentje bij te dragen aan Gods Koninkrijk.",
            communitiesIds = listOf(3, 4, 5)
        ),
        UserEntitiy(
            id = 2,
            username = "henrik_donkeymobile",
            password = "TestHenrik1234",
            avatarHexColor = "#0000FF",
            bio = "Als ik in de kerk zit, zie ik de mogelijkheden één voor één voorbij komen: Een vriend vraagt of hij kleingeld mag lenen voor de collecte, want dat heeft hij nooit meer bij zich. De bloemengroet gaat naar een mevrouw van wie ik graag zou willen dat ik snel het gezicht erbij kon zoeken. Situaties die soepeler kunnen. Maar er is meer dan alleen de puur praktische toepassing. Betrokkenheid op elkaar en het delen van inspiratie kun je zoveel makkelijker maken. Dat is de reden dat ik Donkey Mobile heb opgericht. De kerk met zijn tijdloze boodschap van liefde voor God en de naaste willen wij ondersteunen met onze kennis van apps en mobiel. Concreet willen wij een technologie maken die kerken uit verschillende plaatsen in staat stelt hun eigen app te maken. Dat kan, want uiteindelijk zijn de gevraagde functionaliteiten in Utrecht hetzelfde als in Amsterdam of Urk. Hoe prachtig zou het zijn als wij straks iedere kerk een app geven waarvan de gebruikers zeggen: \"Wauw, is dit van mijn kerk!?!\" Maar uiteindelijk is het nog mooier als zo'n technologisch hulpmiddel kan leiden tot meer betrokkenheid op elkaar en een hechtere gemeenschap. Dat is echt mijn droom en onze missie.",
            communitiesIds = listOf(6, 7, 8)
        )
    )

    fun getUserForCredentials(credentials: UserCredentials): UserEntitiy? {
        return users.firstOrNull { user ->
            user.username.lowercase() == credentials.username.lowercase() &&
                    user.password.lowercase() == credentials.password.lowercase()
        }
    }
}