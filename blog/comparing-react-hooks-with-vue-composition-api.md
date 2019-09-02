---
path: /blog/test-netlify-cms
date: 2019-08-21T22:42:19.319Z
title: Comparing React Hooks with Vue Composition API
summary: What are their similarities and differences?
---
React presents [Hooks](https://reactjs.org/docs/hooks-intro.html) as an alternative to [classes extending React.Component](https://reactjs.org/docs/react-component.html) for writing components. They have received an overwhelming positive reaction from the community, since for a long time there has been a steep learning curve for adopting classes and situations like starting a new component as a stateless function and realizing later we need state and having to refactor the whole component as a `class`.

Vue recently presented the [Vue Composition API RFC](https://vue-composition-api-rfc.netlify.com), a new API for writing Vue components inspired by React Hooks but with many interesting differences that I will discuss in this post. This RFC has a really controversial story, since it started with [a previous version called Functio-based Component API](https://github.com/vuejs/rfcs/blob/function-apis/active-rfcs/0000-function-api.md) that received [lots of criticism](https://github.com/vuejs/rfcs/pull/42) from certain part of the community, based on the fear of Vue starting to be more complicated and less like the simple library that people liked in the first place.

The Vue core team made a great emphasis on assuring the community that this new API won't make the original API (now informally referred as the "Options-based API") disappear, and we will be even be able to [combine both components API](https://vue-composition-api-rfc.netlify.com/#usage-alongside-existing-api) together.

## Number of executions of the code
React hooks allow you to "hook into" React functionalities like the component state and side effects handling. You make use of hooks inside function components so each time the component renders, the hooks are evaluated. This is one of the first differences we can identify between React Hooks and Vue Composition API, **React hooks run each time the component renders while Vue setup function is only executed once**. Because React Hooks can get executed multiple times, there are [certain rules](https://reactjs.org/docs/hooks-rules.html) the render function must follow, one of them being:

> Don’t call Hooks inside loops, conditions, or nested functions. 

Here is a code example straight from React docs that demonstrate this:
```js{6-10}
function Form() {
  // 1. Use the name state variable
  const [name, setName] = useState('Mary');

  // 2. Use an effect for persisting the form
  if (name !== '') {
    useEffect(function persistForm() {
      localStorage.setItem('formData', name);
    });
  }
  // 3. Use the surname state variable
  const [surname, setSurname] = useState('Poppins');

  // 4. Use an effect for updating the title
  useEffect(function updateTitle() {
    document.title = name + ' ' + surname;
  });

  // ...
}
```

React interally keeps track of all the hooks we are using in our component. In this example we are using four hooks. But notice how the first `useEffect` invocation is done conditionally, and since on the first render the `name` state variable will be assigned the default value of `'Mary'`, React will know that it needs to keep track of all of these four hooks in order. What happens if on another render the `name` state is empty? Well, if that's the case React won't know what to return on the second `useState` hook call. To avoid this and other issues, there is an [ESLint plugin](https://www.npmjs.com/package/eslint-plugin-react-hooks) that is strongly recommended when working with React Hooks and is included by default with Create React App.

Going back to Vue, something equivalent to the previous example would be this:
```js
export default {
  setup() {
    // 1. Use the name state variable
    const name = ref("Mary");
    // 2. Use a watcher for persisting the form
    if(name.value !== '') {
      watch(function persistForm() => {
        localStorage.setItem('formData', name.value);
      });
    }
   // 3. Use the surname state variable
   const surname = ref("Poppins");
   // 4. Use a watcher for updating the title
   watch(function updateTitle() {
     document.title = name.value + ' ' + surname.value;
   });
  }
}
```

Since the `setup` method will only run once, we can make use of the different functions that are part of the Composition API (`reactive`, `ref`, `computed`, `watch`, lifecycle hooks, etc.) as part of loops or conditional statements. However, for this same reason, the `if` statement will also only run once, so it  will only make sense if we include it inside of the `watch` callback:
```js
watch(function persistForm() => {
  if(name.value !== '') {
    localStorage.setItem('formData', name.value);
  }
});
```

This same recommendation is what we need to fix the React example:
```js
useEffect(function persistForm() {
  if (name !== '') {
      localStorage.setItem('formData', name);
    });
  }
}
```

Something to be aware when accessing state with the Vue Composition API is that when using a `ref`, you need to use the `value` of property in order to get the current value or make modifications. An alternative would be to use the `reactive` function, that works this way:
```js
const state = reactive({name: "Mary"});
watch(() => {
  console.log("Current name: ", state.name);
});
```

Here, we can access and mutate the `name` state like we would usually do with a JavaScript object. It's important to note that **we can't destructure the returned object from the `reactive` call, if we do so we lose the reactivity.

## How to track dependencies

The `useEffect` Hook in React, allows us to run certain side effect (like making a subscription, data fetching or using Web APIs such as storage) after each render and to optionally run some cleanup before the next execution of the callback or when the component will unmount. By default, all `useEffect` registered functions will run after each render but we can define the actual state and props dependencies so that React skips the execution of our `useEffect` hook if the relevant state didn't change (e.g. a render was made because of another state). Going back to our previous `Form` example we can pass an array of dependencies as the second argument of the `useEffect` hook:
```js{4-6}
function Form() {
  const [name, setName] = useState('Mary');
  const [surname, setSurname] = useState('Poppins');
  useEffect(function persistForm() {
      localStorage.setItem('formData', name);
  }, [name]);

  // ...
}
```
This way, only when `name` changes we will update the browser `localStorage`. A common source of bugs with React Hooks is forgetting to exhaustively declare all of our dependencies in the dependency array, fortunately the [`eslint-plugin-react-hooks`](https://www.npmjs.com/package/eslint-plugin-react-hooks) include a linting rule that warns about missing dependencies.

`useCallback` and `useMemo` also use an array of dependencies argument to decide if they should return the same memoized version of the callback or value respectively than the last execution or not.

In the case of Vue Composition API, we can use the `watch` function to perform side effects in response of props or state changes. Thanks to the reactivity system of Vue the dependencies will be automatically tracked and the registered function will be called reactively when the dependencies changed. Going back to our example:
```js{5-7}
export default {
  setup() {
    const name = ref("Mary");
    const lastName = ref("Poppins");
    watch(function persistForm() => {
      localStorage.setItem('formData', name.value);
    });
  }
}
```

After the first time our watcher runs, `name` will be tracked as a dependency and when it mutates at a later time, the watcher will run again.

## Access to the lifecycle of the component

Hooks represent a complete switch of mental model when dealing with lifecycle, side effects and state management of your React component. Ryan Florence, an active member of the React community, [expressed that there is a mental shift to be made from class components into hooks](https://twitter.com/ryanflorence/status/1125041041063665666), and as React docs point out:
> If you’re familiar with React class lifecycle methods, you can think of `useEffect` Hook as `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount` combined.

The goal of React Hooks are to allow us to split the code based on what it is doing rather than what lifecycle it is part of.

Vue Component API in the other hand, still gives us access to [lifecycle hooks](https://vue-composition-api-rfc.netlify.com/api.html#lifecycle-hooks) (the equivalent name that lifecycle methods get in the Vue world) with `onMounted`, `onUpdated` and `onBeforeUnmount`, etc.
```js
setup() {
  const name = ref("Mary");
  onMounted(() => {
    console.log(`Component was mounted with name: ${name}`); 
  });
  onBeforeUnmount(() => {
    console.log(`Component will unmount with name: ${name}`);
  });
}
```

## Custom code
