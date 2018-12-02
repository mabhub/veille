---
title: Novembre 2018
date: "2018-12-02"

---

*Work in progress…*

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





