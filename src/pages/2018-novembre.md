---
title: Novembre 2018
date: "2018-12-02"

---

*Work in progress…*

## React 16.6

Première actu depuis la dernière fois : la sortie le 23 octobre de
**[la version 16.6][React 16.6]** de [React][].

Parmi les ajouts de cette nouvelle [version mineure][semver],
`React.memo` qui est un [HOC][] permettant de faire un *PureComponent* à
partir d'un *functional component* (alors que jusqu'ici la seule
solution était d'utiliser une classe étendant `React.PureComponent`).

On trouve aussi `Suspense` et `lazy` qui permettent de contrôler
finement le découpage et le chargement dynamique du code, et la
déclaration statique de `contextType` facilitant la consommation de
`Context` avec les `class components`.

[React 16.6]: https://reactjs.org/blog/2018/10/23/react-v-16-6.html
[React]: https://reactjs.org
[semver]: https://semver.org/ "Semantic Versioning"
[HOC]: https://reactjs.org/docs/higher-order-components.html "Higher-Order Components"


## The Platform

Alors que React 16.6 vient tout juste de sortir, une pre-release de la
version 16.7 nous a présenté les Hooks.

The Platform est un bibliothèque de composants utilisant ces hooks pour
rentre facilement accessibles certaines API Web aux applications React.
