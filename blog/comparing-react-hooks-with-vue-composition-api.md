---
path: /blog/test-netlify-cms
date: 2019-08-21T22:42:19.319Z
title: Comparing React Hooks with Vue Composition API
summary: What are their similarities and differences?
---
React presents [Hooks](https://reactjs.org/docs/hooks-intro.html) as an alternative to [classes extending React.Component](https://reactjs.org/docs/react-component.html) for writing components. They have received an overwhelming positive reaction from the community, since for a long time there has been a steep learning curve for adopting classes and situations like starting a new component as a stateless function and realizing later we need state and having to refactor the whole component as a `class`.



Vue recently presented the Vue Composition API RFC, a new API for writing Vue components inspired by React Hooks but with many interesting differences that I will discuss in this post. This RFC has a really controversial story, since it started with a previous version that received lots of criticism from the community, based on the fear of Vue starting to feel more like React and less like the simple library that people liked in the first place.
