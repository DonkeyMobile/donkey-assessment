/** Original Donkey Inspire seed content (no copyrighted text). */
export interface SeedItem {
  type: "quote" | "article" | "photo";
  status: "published" | "draft";
  category: string;
  title: string;
  author: string;
  date: string; // YYYY-MM-DD
  quote?: string;
  excerpt?: string;
  body?: string;
  readingTime?: number;
  caption?: string;
  ratio?: string;
  imageUrl?: string;
}

export const SEED: SeedItem[] = [
  {
    type: "quote",
    status: "published",
    category: "Hoop",
    title: "Hoop tegen hoop",
    quote:
      "Waar de ziel geen grond meer vindt in zichzelf, daar leert zij hopen op de Heere alleen - en die hoop beschaamt niet.",
    author: "Meditatie",
    date: "2026-05-28",
  },
  {
    type: "article",
    status: "published",
    category: "Gemeenschap",
    title: "Onder het Woord vergaderd",
    excerpt:
      "Over de gemeente als plaats waar schuldige zondaren samenkomen onder de bediening der verzoening - en waar het gezelschap der godvrezenden tot onderwijs is.",
    body: "De gemeente is geen vergadering van volmaakten, maar een toevlucht voor schuldigen. Onder het Woord komen wij samen, niet om onszelf te verheffen, maar om verootmoedigd en weer opgericht te worden.\n\nIn het gezelschap der godvrezenden wordt de ene ziel de andere tot onderwijs. Daar wordt geklaagd over de zonde en geroemd in de genade; daar leert de aangevochtene dat hij niet alleen staat in zijn strijd.\n\nWaar twee of drie vergaderd zijn in Zijn Naam, daar wil de Heere Zelf tegenwoordig zijn. Dat is geen kleine zaak, maar het wonder waaruit de kerk van alle eeuwen leeft.",
    author: "Kerkbode",
    readingTime: 4,
    imageUrl: "https://picsum.photos/seed/seizoen/1200/675",
    date: "2026-05-22",
  },
  {
    type: "photo",
    status: "published",
    category: "Geloof",
    title: "De morgenstond",
    caption:
      "De schepping zwijgt en spreekt tegelijk: al wat adem heeft getuigt van de hand des Heeren.",
    author: "Beeldarchief",
    ratio: "4/5",
    imageUrl: "https://picsum.photos/seed/ochtendgloren/800/1000",
    date: "2026-05-19",
  },
  {
    type: "quote",
    status: "published",
    category: "Gebed",
    title: "Worstelen aan de troon",
    quote:
      "Het gebed is niet het opzeggen van woorden, maar het uitstorten van een nooddruftige ziel voor de troon der genade.",
    author: "Meditatie",
    date: "2026-05-15",
  },
  {
    type: "article",
    status: "published",
    category: "Bemoediging",
    title: "Voor de aangevochten ziel",
    excerpt:
      "Een woord voor wie meent dat het voor hem niet meer kan - over de ruimte die er in Christus is voor de grootste der zondaren.",
    body: "Er zijn tijden waarin de ziel niets ziet dan haar eigen schuld, en de hemel als koper boven het hoofd gesloten lijkt. De vijand fluistert dat het te laat is, dat de genade voor anderen wel, maar voor u niet bestemd is.\n\nMaar de Heere werpt niemand uit die met al zijn schuld tot Hem de toevlucht neemt. Juist de verlorene, de bankroete, de uitgeschudde wordt genodigd. Niet uw waardigheid, maar Zijn barmhartigheid is de enige grond.\n\nDaarom, bekommerde ziel: zie van uzelf af en zie op de Borg. Een gebroken hart en een verslagen geest zal Hij niet verachten.",
    author: "Kerkbode",
    readingTime: 3,
    imageUrl: "https://picsum.photos/seed/bemoediging/1200/675",
    date: "2026-05-11",
  },
  {
    type: "photo",
    status: "published",
    category: "Hoop",
    title: "Lege handen",
    caption: "Met lege handen komen - want wie meent rijk te zijn, gaat ledig heen.",
    author: "Beeldarchief",
    ratio: "1/1",
    imageUrl: "https://picsum.photos/seed/openhanden/800/800",
    date: "2026-05-08",
  },
  {
    type: "quote",
    status: "published",
    category: "Liefde",
    title: "Liefde uit genade",
    quote:
      "Wij hebben niet eerst liefgehad, maar zijn liefgehad; en uit die eerste, vrije liefde wordt alle ware wederliefde geboren.",
    author: "Meditatie",
    date: "2026-05-04",
  },
  {
    type: "article",
    status: "published",
    category: "Geloof",
    title: "Van de strijd des geloofs",
    excerpt:
      "Waarom aanvechting en bestrijding het ware geloof niet uitsluiten, maar er dikwijls de metgezel van zijn.",
    body: "Men denkt soms dat geloof een ongestoorde, vlakke zekerheid is. Maar wie de Heere vreest, kent de strijd: het ongeloof dat opspeelt, de bestrijding van de boze, en de bange vraag of het bij hem wel oprecht is.\n\nJuist daar, in die worsteling, wordt het geloof beproefd en gelouterd als goud in de smeltkroes. Niet de afwezigheid van strijd, maar het aanhoudend pleiten op de beloften kenmerkt de levende ziel.\n\nHet geloof leeft niet uit het gevoel, maar uit het Woord. En waar het gevoel wegzinkt, daar mag de ziel zich vastklemmen aan Hem Die getrouw is en niet laat varen de werken Zijner handen.",
    author: "Kerkbode",
    readingTime: 5,
    imageUrl: "https://picsum.photos/seed/twijfel/1200/675",
    date: "2026-04-29",
  },
  {
    type: "quote",
    status: "published",
    category: "Bemoediging",
    title: "Genoeg voor heden",
    quote:
      "U hoeft de gehele weg niet te overzien; genade voor deze dag, voor deze enkele stap, is genade genoeg.",
    author: "Meditatie",
    date: "2026-04-25",
  },
  {
    type: "photo",
    status: "published",
    category: "Gemeenschap",
    title: "Aan de dis",
    caption: "Waar het brood gebroken wordt, gedenkt de gemeente haar gebroken Borg.",
    author: "Beeldarchief",
    ratio: "4/3",
    imageUrl: "https://picsum.photos/seed/aantafel/800/600",
    date: "2026-04-20",
  },
  {
    type: "quote",
    status: "draft",
    category: "Geloof",
    title: "Concept: het betrouwen",
    quote:
      "Geloven is leunen op een Ander; het is alles buiten zichzelf verliezen en in Christus gevonden worden.",
    author: "Meditatie",
    date: "2026-04-18",
  },
  {
    type: "article",
    status: "published",
    category: "Gebed",
    title: "Het verborgen leven",
    excerpt:
      "Over de binnenkamer, waar de ziel alleen met de Heere verkeert, verre van het oog der mensen.",
    body: "Het ware leven der godzaligheid speelt zich niet af op het marktplein, maar in de binnenkamer. Daar, achter de gesloten deur, wordt geworsteld, beleden en gesmeekt - buiten het gezicht van mensen.\n\nIn die verborgen omgang wordt de ziel gevoed en gesterkt. Geen mens ziet het, maar de Vader, Die in het verborgene ziet, zal het in het openbaar vergelden.\n\nWelgelukzalig is de mens wiens sterkte in U is, in wiens hart de gebaande wegen liggen; hij gaat voort van kracht tot kracht en zal verschijnen voor God in Sion.",
    author: "Kerkbode",
    readingTime: 3,
    imageUrl: "https://picsum.photos/seed/rust/1200/675",
    date: "2026-04-14",
  },
];
