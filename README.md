Assessment Donkey Mobile
====================

#### Get the project up and running
- Make sure you have docker and docker-compose
- Run `bin/init` to start the application
- Import Assessment.postman_collection.json into Postman
- Import Assessment.postman_environment.json into Postman
- Edit the environment variables where needed

#### Notes
Ik ben helaas niet toegekomen aan de unit tests. 
Heb hier ongeveer 4x 2u aan gezeten, meer tijd had ik helaas niet.
Mocht dit een vereiste zijn heb ik, afhankelijk van de hoeveelheid tests, nog 1 a 2 avonden van 2u nodig.

Vond het mooi om op deze manier nodejs te leren.
Had hiervoor enkel verstand van een (uitgebreide) PHP-stack.
Ik weet niet in hoeverre mijn beslissingen gelden als 'best-practice':
- Ben na onderzoek uit gekomen op het express framework. 
Achteraf blijkt het okay te werken, echter mis ik gigantisch veel wat bij Symfony (PHP) standaard mee komt.
- Ik heb nog moeite met bepalen wanneer `async` en `await` nodig zijn, in PHP is dit totaal niet aan de orde.
- Ik heb geprobeerd een aantal manieren te gebruiken, bij de Posts gebruik ik direct de model terwijl ik bij de Comments een repository gebruik. Ik ben er zelf nog niet over uit welke methode het fijnst werkt.
- Om niet in herhaling te vallen heb ik Files op een andere manier gekoppeld als de Comments. 
Achteraf gezien had ik dit beter om kunnen draaien ivm populate, Files zijn een stuk groter dan Comments. 
Daarnaast had ik ervoor kunnen kiezen de bestanden direct op de server te plaatsen. Vond het echter wel interessant om ze in de DB te zetten. Bijkomend voordeel is dat je dan binnen docker geen extra persistent storage nodig hebt.
- Mijn hoofd is nogal gericht op relationele databases, waarschijnlijk is dat terug te zien in de structuur.
Ben heel benieuwd naar de voordelen, op grote schaal, van een non relationele database.

