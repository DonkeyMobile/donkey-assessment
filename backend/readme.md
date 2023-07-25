# Lokaal starten

npm install
npm run build
npm run start

# User stories
US2 - user must be able create a post.
US3 - user must be able edit a post.
US4 - user must be able delete a post.
US5 - user must be able read a post.
US6 - user must be able to create a comment on a post.
US7 - user must be able to add attachment to a post (bonus-points)
US8 - post must have a created date so it can be viewed on a timeline

Zie ook het UML via het bestand class-diagram v2.png

# Ervaring & toelichting
Leuk project! Zat wel aardig wat tijdsdruk achter aangezien ik morgen richting IJsland vlieg, maar volgens mij heb ik er wat moois van kunnen maken. Onderstaand toelichting op bepaalde keuzes die ik heb gemaakt.

**Het volgende is mogelijk:**<br>
Post aanmaken zonder attachments
Post verwijderen
Post bewerken
Alle posts bekijken inclusief comments en attachments
Specifieke post bekijken inclusief comments en attachments
Attachment toevoegen aan al bestaande post
Comment toevoegen aan al bestaande post

Daarnaast heb ik een aantal simpele testen geschreven. Vanwege tijdgebrek heb ik het hierbij gehouden:
- De mongoose test is eigenlijk integration testen. Het zal vast mogelijk zijn om deze zonder externe database te testen, maar hier zal ik dan dieper in moeten duiken.
- De service test is wel unit testen met behulp van Jest.
- Uitvoeren kan door npm test uit te voeren in de terminal. Hier zie je ook direct een overzicht van wat er getest wordt.

**Keuzes:**<br>
Comments zijn geembedded in de posts, netzoals voor de attachments. Dit had apart gekund, maar lijkt mij niet relevant aangezien een post vaak met attachments en comments wordt getoond in de app.

Attachments worden los op de server (in dit geval lokale computer) opgeslagen in de map uploads. In de database wordt er verwezen naar het bestandspad. Dit was nu eenmaal een eenvoudigere implementatie dan GridFS, vandaar dat ik omwille van de tijd hiervoor gekozen heb. Ook behoud je hierdoor de snelheid van je database. Je zou dit nog kunnen uitbouwen naar een CDN, zodat foto's en video's vanaf daar opgehaald worden.

De auteur van de berichten of comments worden nu nog opgeslagen als string, dit kan uitgebreidt worden door user functionaliteit (registeren en inloggen) te maken.

Error handling is nog erg simpel, had dit graag wat beter willen hebben. Had bijvoorbeeld nog een response willen geven als bepaalde attributen ontbraken bij een request vanaf de client.

De server geeft nu een error:
- Als een post niet gevonden kan worden
- Als het ID niet overeenkomt met de regex van de IDs van MongoDB
- Als er fouten optreden bij het aanmaken van een post, comment of attachment

Ik heb er daarnaast voor gekozen om het bij services en models te houden, en daarnaast de routes te scheiden aangezien dit wat overzichtelijker is. Om dit uit te breiden zou ik nog DTO's en controllers kunnen toevoegen zodat de verantwoordelijkheden meer opgesplitst zijn.

De MongoDB instance op mijn lokale computer kreeg ik helaas niet niet direct aan de praat, vandaar dat ik een instance heb aangemaakt in de cloud via MongoDB Compass.