/* Donkey Inspire — data layer + localStorage persistence */
(function () {
  const STORAGE_KEY = 'donkey-inspire:content:v1';

  const CATEGORIES = ['Geloof', 'Hoop', 'Liefde', 'Gebed', 'Bemoediging', 'Gemeenschap'];
  const TYPES = [
    { id: 'quote',   label: 'Quote',     nl: 'Quote' },
    { id: 'article', label: 'Artikel',   nl: 'Artikel' },
    { id: 'photo',   label: 'Foto',      nl: 'Foto' },
  ];

  // Original, warm reflections written for this platform (no copyrighted text).
  const SEED = [
    {
      id: 'c1', type: 'quote', status: 'published', category: 'Hoop',
      title: 'Licht in de morgen',
      quote: 'Hoop is geen ontkenning van de nacht, maar het vertrouwen dat de morgen komt.',
      author: 'Donkey Inspire',
      date: '2026-05-28',
    },
    {
      id: 'c2', type: 'article', status: 'published', category: 'Gemeenschap',
      title: 'Samen onderweg in een nieuw seizoen',
      excerpt: 'Hoe kleine groepen een kerk dragen — en waarom het delen van een maaltijd vaak meer doet dan duizend woorden.',
      body: 'Gemeenschap groeit zelden in het grote. Ze groeit aan de keukentafel, in het gedeelde brood, in de stilte na een moeilijk gesprek.\n\nWanneer we elkaar opzoeken zonder agenda, ontstaat er ruimte. Ruimte om gezien te worden, om te twijfelen, om opnieuw te beginnen. Een nieuw seizoen vraagt niet om grotere plannen, maar om trouwere aanwezigheid.\n\nMisschien is dat de uitnodiging van deze tijd: niet meer doen, maar dichterbij zijn.',
      author: 'Redactie',
      readingTime: 4,
      date: '2026-05-22',
    },
    {
      id: 'c3', type: 'photo', status: 'published', category: 'Geloof',
      title: 'Ochtendgloren boven de velden',
      caption: 'Een nieuwe dag begint — stilte voordat de wereld ontwaakt.',
      author: 'Beeldarchief',
      ratio: '4/5',
      date: '2026-05-19',
    },
    {
      id: 'c4', type: 'quote', status: 'published', category: 'Gebed',
      title: 'Het stille gesprek',
      quote: 'Gebed is niet het vullen van de stilte, maar het bewonen ervan.',
      author: 'Donkey Inspire',
      date: '2026-05-15',
    },
    {
      id: 'c5', type: 'article', status: 'published', category: 'Bemoediging',
      title: 'Wanneer je het even niet ziet zitten',
      excerpt: 'Drie gedachten voor de dagen waarop de moed je in de schoenen zakt.',
      body: 'Er zijn dagen waarop alles zwaar weegt. De wekker is een vijand, de to-do-lijst een berg.\n\nEen eerste gedachte: je hoeft de hele berg niet vandaag te beklimmen. Eén stap is genoeg.\n\nEen tweede: je bent niet alleen, ook al voelt het zo. Er is altijd iemand die je naam kent.\n\nEn een derde: rust is geen luxe, maar een vorm van vertrouwen. Soms is het moedigste wat je kunt doen, even loslaten.',
      author: 'Redactie',
      readingTime: 3,
      date: '2026-05-11',
    },
    {
      id: 'c6', type: 'photo', status: 'published', category: 'Hoop',
      title: 'Open handen',
      caption: 'Ontvangen begint bij loslaten.',
      author: 'Beeldarchief',
      ratio: '1/1',
      date: '2026-05-08',
    },
    {
      id: 'c7', type: 'quote', status: 'published', category: 'Liefde',
      title: 'Het kleine gebaar',
      quote: 'Liefde wordt niet gemeten in grootse daden, maar in de trouw van het kleine.',
      author: 'Donkey Inspire',
      date: '2026-05-04',
    },
    {
      id: 'c8', type: 'article', status: 'published', category: 'Geloof',
      title: 'Twijfel hoort erbij',
      excerpt: 'Waarom vragen stellen geen teken van zwak geloof is, maar van een levend geloof.',
      body: 'We doen soms alsof geloof en twijfel tegenpolen zijn. Alsof een goede gelovige alle antwoorden heeft.\n\nMaar wie nooit twijfelt, heeft misschien gewoon nog niet goed gekeken. Twijfel is de schaduw die hoort bij het licht van een echte vraag.\n\nGeloof is geen gebouw van zekerheden, maar een weg die je gaat — met vragen in je rugzak en hoop in je hart.',
      author: 'Redactie',
      readingTime: 5,
      date: '2026-04-29',
    },
    {
      id: 'c9', type: 'quote', status: 'published', category: 'Bemoediging',
      title: 'Eén stap',
      quote: 'Je hoeft de hele weg niet te zien. Genoeg licht voor de volgende stap is genoeg.',
      author: 'Donkey Inspire',
      date: '2026-04-25',
    },
    {
      id: 'c10', type: 'photo', status: 'published', category: 'Gemeenschap',
      title: 'Aan tafel',
      caption: 'Waar brood gedeeld wordt, ontstaat thuis.',
      author: 'Beeldarchief',
      ratio: '4/3',
      date: '2026-04-20',
    },
    {
      id: 'c11', type: 'quote', status: 'draft', category: 'Geloof',
      title: 'Concept: vertrouwen',
      quote: 'Vertrouwen is springen terwijl je gelooft dat de grond er zal zijn.',
      author: 'Donkey Inspire',
      date: '2026-04-18',
    },
    {
      id: 'c12', type: 'article', status: 'published', category: 'Gebed',
      title: 'Een ritme van rust',
      excerpt: 'Over het terugvinden van eenvoud in een leven dat altijd door lijkt te razen.',
      body: 'Onze dagen zijn vol. Vol schermen, vol meldingen, vol verwachtingen.\n\nEen ritme van rust begint klein: een ademhaling voor het eten, een wandeling zonder telefoon, een avond zonder agenda.\n\nDeze momenten lijken nutteloos in een wereld die productiviteit aanbidt. En juist daarom zijn ze heilig.',
      author: 'Redactie',
      readingTime: 3,
      date: '2026-04-14',
    },
  ];

  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) { /* ignore */ }
    save(SEED);
    return JSON.parse(JSON.stringify(SEED));
  }

  function save(items) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); } catch (e) {}
  }

  function reset() {
    save(SEED);
    return JSON.parse(JSON.stringify(SEED));
  }

  function uid() {
    return 'c' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  }

  window.DonkeyData = { CATEGORIES, TYPES, SEED, load, save, reset, uid, STORAGE_KEY };
})();
