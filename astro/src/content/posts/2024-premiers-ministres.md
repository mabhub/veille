---
title: Petit exercice futile de traitement de données
date: "2024-12-04"
---

L'actualité politique aidant, nous nous sommes retrouvés à nous interroger sur
les durées d'exercices de nos différents chefs du gouvernement.

Données de base nécessaires : un inventaire des premiers ministres, accompagné
de leurs dates de début et de fin de fonction. Malheureusement, l'absence d'un
jeu de données exploitable sur [data.gouv.fr](https://www.data.gouv.fr/fr/) nous
contraint à le constituer nous-mêmes.

Sur le site d'informations du gouvernement, on trouve cette page : [Les anciens
Premiers et Premières ministres de la Ve
République](https://www.info.gouv.fr/les-anciens-premiers-et-premieres-ministres-de-la-ve-republique)

La liste présente une structure suffisamment régulière pour permettre une
extraction méthodique des informations recherchées.

## Extraire les données brutes

Via la **console** des outils de développement du navigateur web (accessible
généralement par la touche F12) il est possible d'exécuter des fragments de
JavaScript.

On peut ainsi exécuter la commande suivante :

```js
// Sélectionne les éléments de la page contenant chaque ancien premier ministre
const fichesBrutes = document.querySelectorAll('.fr-tile__content');

// Produit un tableau avec dans chaque cellule, un objet contenant le nom et la période d'éxercice
const donnéesBrutes = Array.from(fichesBrutes)
  .map(element => ({
    ministre: element.querySelector('.fr-tile__title')?.textContent.trim(),
    dates: element.querySelector('.fr-tile__detail')?.textContent.trim(),
  }));

console.log(donnéesBrutes);

```

```json
[
  {
    "ministre": "Gabriel Attal",
    "dates": "Du 11 janvier 2024 au 05 septembre 2024"
  },
  {
    "ministre": "Élisabeth Borne",
    "dates": "16 mai 2022 – 8 janvier 2024"
  },
  …
]
```

## Produire des données numériques

L'étape suivante va être de transformer le texte contenant les dates de début et
fin, en des valeurs numériques exploitables.

Voici déjà une fonction qui permet de transformer chaque date textuelle :

```js
const obtenirTimestamp = dateEnFrançais => {
  // Tableau de correspondance des mois français à leurs indices (0-11 pour Date)
  const moisFrançais = [
    'janvier', 'février', 'mars', 'avril', 'mai', 'juin',
    'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'
  ];

  // Extraire les parties de la date
  const regex = /(\d+)\s([a-zéû]+)\s(\d{4})/i;
  const match = dateEnFrançais.match(regex);

  if (!match) {
    throw new Error('Format de date invalide');
  }

  const jour = parseInt(match[1], 10);
  const mois = moisFrançais.indexOf(match[2].toLowerCase());
  const année = parseInt(match[3], 10);

  if (mois === -1) {
    throw new Error('Mois invalide');
  }

  // Créer une instance de Date
  const date = new Date(année, mois, jour);

  // Retourner le timestamp
  return date.getTime();
};

```

Puis la fonction qui permettra de transformer la différence de *timestamp* en
une représentation textuelle de cette durée :

```js
const timestampEnTexte = timestamp => {
  // Constantes de temps en millisecondes
  const uneJournée = 24 * 60 * 60 * 1000; // Millisecondes dans une journée
  const unMoisApprox = 30.4375 * uneJournée; // Mois moyen (365.25/12 jours)
  const uneAnnéeApprox = 365.25 * uneJournée; // Année moyenne (avec les années bissextiles)

  // Calcul des différences
  let reste = timestamp; // Début du calcul avec le timestamp
  const années = Math.floor(reste / uneAnnéeApprox);
  reste %= uneAnnéeApprox; // Reste après avoir calculé les années

  const mois = Math.floor(reste / unMoisApprox);
  reste %= unMoisApprox; // Reste après avoir calculé les mois

  const jours = Math.floor(reste / uneJournée);

  // Génération du texte
  const texteAnnées = années > 0 ? `${années} année${années > 1 ? 's' : ''}` : '';
  const texteMois = mois > 0 ? `${mois} mois` : '';
  const texteJours = jours > 0 ? `${jours} jour${jours > 1 ? 's' : ''}` : '';

  // Assemblage final
  return [texteAnnées, texteMois, texteJours].filter(Boolean).join(', ');
};

```

## Déterminer les durées de mandats

Nous pouvons donc ensuite les appliquer sur nos données :

```js
const donnéesTraités = donnéesBrutes.map(ministre => {
  const resultatRegexp = ministre.dates.match(/(Du )?(.*)( - | au | – )(.*)/);

  const début = resultatRegexp.at(2);
  const fin = resultatRegexp.at(4);

  const écart = obtenirTimestamp(fin) - obtenirTimestamp(début);

  return {
    ministre: ministre.nom,
    du: début,
    au: fin,
    écart: écart,
    écartTexte: timestampEnTexte(écart),
  };
});

console.log(donnéesTraités);

```

```json
[
  {
    "ministre": "Gabriel Attal",
    "du": "11 janvier 2024",
    "au": "05 septembre 2024",
    "écart": 20559600000,
    "écartText": "7 mois, 24 jours"
  },
  {
    "ministre": "Élisabeth Borne",
    "du": "16 mai 2022",
    "au": "8 janvier 2024",
    "écart": 52016400000,
    "écartTexte": "1 année, 7 mois, 23 jours"
  },
  …
]
```

Il est possible de récupérer le résultat au format JSON dans le presse papier
ainsi :

```js
copy(JSON.stringify(donnéesTraités, null, 2));
```

## Afficher le résultat

Il y a de nombreuses possibilités pour faire un rendu lisible des données
produites.  
Actuellement nous explorons les possibilités offertes par
[DuckDB](https://duckdb.org/), nous vous proposons donc de l'utiliser pour
simplement afficher nos données :


```sql
SELECT * from 'premier_ministres.json' ORDER BY écart;
┌───────────────────────────┬─────────────────┬───────────────────┬──────────────┬─────────────────────────────┐
│         ministre          │       du        │        au         │    écart     │         écartTexte          │
│          varchar          │     varchar     │      varchar      │    int64     │           varchar           │
├───────────────────────────┼─────────────────┼───────────────────┼──────────────┼─────────────────────────────┤
│ Bernard Cazeneuve         │ 6 décembre 2016 │ 15 mai 2017       │  13820400000 │ 5 mois, 7 jours             │
│ Alain Juppé               │ 17 mai 1995     │ 7 novembre 1995   │  15037200000 │ 5 mois, 21 jours            │
│ Gabriel Attal             │ 11 janvier 2024 │ 05 septembre 2024 │  20559600000 │ 7 mois, 24 jours            │
│ Édith Cresson             │ 15 mai 1991     │ 2 avril 1992      │  27907200000 │ 10 mois, 18 jours           │
│ Maurice Couve de Murville │ 10 juillet 1968 │ 20 juin 1969      │  29808000000 │ 11 mois, 10 jours           │
│ Pierre Bérégovoy          │ 2 avril 1992    │ 29 mars 1993      │  31190400000 │ 11 mois, 26 jours           │
```

Il est également possible de lui faire produire du Markdown :

```sql
.mode markdown
SELECT * from 'premier_ministres.json' ORDER BY écart;
|         ministre          |       du        |        au         |    écart     |          écartTexte         |
|---------------------------|-----------------|-------------------|-------------:|-----------------------------|
| Bernard Cazeneuve         | 6 décembre 2016 | 15 mai 2017       | 13820400000  | 5 mois, 7 jours             |
| Alain Juppé               | 17 mai 1995     | 7 novembre 1995   | 15037200000  | 5 mois, 21 jours            |
| Gabriel Attal             | 11 janvier 2024 | 05 septembre 2024 | 20559600000  | 7 mois, 24 jours            |
| Édith Cresson             | 15 mai 1991     | 2 avril 1992      | 27907200000  | 10 mois, 18 jours           |
| Maurice Couve de Murville | 10 juillet 1968 | 20 juin 1969      | 29808000000  | 11 mois, 10 jours           |
| Pierre Bérégovoy          | 2 avril 1992    | 29 mars 1993      | 31190400000  | 11 mois, 26 jours           |
```

Et même de l'extraire vers un fichier au format CSV :

```sql
COPY (SELECT * from 'premier_ministres.json' ORDER BY écart) TO 'premier_ministres.csv';
```

```csv
ministre,du,au,écart,écartText
Bernard Cazeneuve,6 décembre 2016,15 mai 2017,13820400000,"5 mois, 7 jours"
Alain Juppé,17 mai 1995,7 novembre 1995,15037200000,"5 mois, 21 jours"
Gabriel Attal,11 janvier 2024,05 septembre 2024,20559600000,"7 mois, 24 jours"
Édith Cresson,15 mai 1991,2 avril 1992,27907200000,"10 mois, 18 jours"
Maurice Couve de Murville,10 juillet 1968,20 juin 1969,29808000000,"11 mois, 10 jours"
Pierre Bérégovoy,2 avril 1992,29 mars 1993,31190400000,"11 mois, 26 jours"
```
