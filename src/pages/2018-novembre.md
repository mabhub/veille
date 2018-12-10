---
title: Novembre 2018
date: "2018-12-02"

---

## React 16.6

Première actu depuis la dernière édition : la sortie le 23 octobre de
**[la version 16.6][React 16.6]** de [React][].

Parmi les ajouts de cette nouvelle [version mineure][semver],
`React.memo` qui est un [HOC][] permettant de faire un *PureComponent* à
partir d'un *functional component* (alors que jusqu'ici la seule
solution était d'utiliser une classe étendant `React.PureComponent`).

On trouve aussi `Suspense` et `lazy` qui permettent de contrôler
finement le découpage et le chargement dynamique du code, et la
déclaration statique de `contextType` facilitant la consommation de
*[Context][]* avec les *class components*.

[React 16.6]: https://reactjs.org/blog/2018/10/23/react-v-16-6.html
[React]: https://reactjs.org
[semver]: https://semver.org/ "Semantic Versioning"
[HOC]: https://reactjs.org/docs/higher-order-components.html "Higher-Order Components"
[Context]: https://reactjs.org/docs/context.html


## The Platform

Alors que React 16.6 vient tout juste de sortir, une pre-release de la
version 16.7 nous a présenté les [Hooks][].

**[The Platform][]** est un bibliothèque de composants utilisant ces
hooks pour rentre facilement accessibles certaines API Web, aux
applications React.

[Hooks]: https://reactjs.org/docs/hooks-intro.html	"Introducing Hooks"
[The Platform]: https://github.com/palmerhq/the-platform

## Naviguer dans le monde sinistre de JavaScript

À l'occasion d'Halloween, l'article
**[Navigating the Spooky World of JavaScript][]** explore certains
risques liés au développement JavaScript et propose plusieurs conseils
sur les erreurs à éviter.

[Navigating the Spooky World of JavaScript]: https://dev.to/aspittel/navigating-the-spooky-world-of-javascript-3h45

## Life Hack

[Sophie Alpert][], manager React chez Facebook propose
**[une astuce][]** : une fonction de `log()` qui permet de visualiser la
profondeur de la pile d'appel.

```js
function log (format, ...args) {
  let indent = ' '.repeat(new Error().stack.match(/\n/g).length - 2);
  if (typeof format === 'string') {
    console.log(indent + format, ...args);
  } else {
    console.log(indent, format, ...args);
  }
}
```

[Sophie Alpert]: https://sophiebits.com/
[une astuce]: https://twitter.com/sophiebits/status/1058448900460138497

### Flowchart

On ne présente plus [xkcd][], la bande dessinée en ligne de [Randall Munroe][].

Voici l'une de ses publications proposant un **[arbre de décision][]**. Il permet de retrouver à partir de différents détails, l'age d'une carte qu'on a sous les yeux.

[xkcd]: https://xkcd.com
[Randall Munroe]: https://fr.wikipedia.org/wiki/Randall_Munroe
[arbre de décision]: https://xkcd.com/1688/

## Incomplete List of Mistakes in the Design of CSS

Il y a sur le [wiki][CSSWG Wiki] du [CSS Working Group][] une [liste (incomplète) des **erreurs de conception du CSS**][CSS Mistakes].

Elle représente un *mea culpa* du W3C sur de nombreux détails curieux, d'absurdités, d'incohérence dont certains mots clés, certaines règles, certains comportements ont été définis dans les spécifications du CSS. Morceaux choisis :

- La propriété `box-sizing` aurait dû avoir la valeur `border-box` par défaut.
- `border-radius` aurait dû se nommer `corner-radius`.
- `text-overflow` devrait s'appliquer indépendamment de la propriété `overflow`.
- …

[CSSWG Wiki]: https://wiki.csswg.org
[CSS Working Group]: https://en.wikipedia.org/wiki/CSS_Working_group
[CSS Mistakes]: https://wiki.csswg.org/ideas/mistakes "Incomplete List of Mistakes in the Design of CSS"

## Git happens!

Un oubli lors d'un *commit*, une branche mal nommée… Gitlab propose sur son blog [un petit article][Git happens!] présentant **6 erreurs communes avec Git** et les commandes pour s'en sortir.

[Git happens!]: https://about.gitlab.com/2018/08/08/git-happens/

## Save it now, read it later

Github a récemment ajouté à son interface de notification, un moyen de mettre de côté certaines notifications. Ainsi rangées dans un dossier 	*Saved for later*, on peut sans souci marquer

## .gitignore

Petit rappel fait par **[Brian Goff sur Twitter][.gitignore]** :

> .gitignore for a repo should contain things that are produced by build scripts in the repo that you don’t want to commit.
>
> Everything else, e.g. IDE generated files, macOS .DS_STORE files, etc, should go in your own global gitignore.

[.gitignore]: https://twitter.com/cpuguy83/status/1057352606123606016

