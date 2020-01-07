# ngrx operators

This library is a collection of pipeable operators to create NgRx features.

The idea behind this is to let the developer compose a redux feature with building blocks that encapuslate common functionalities such as entity management, side effects and behaviors of the feature.

If you find yourself writing the same things over and over again you can also create your custom operator and use it to build many features.

## Disclamer

This is just an idea. I don't even know if it is a good one. <br>
This library is not tested and not properly documented. <br>
Works only with Ivy renderer which will be the default in Angular 9. <br>
<b> Every suggestion, feedback or contribution is highly appreciated. </b>

## Example

```typescript
export const ItemsFeature = createEntityFeature('items', {} as Todo).pipe(
    addSelectableEntity(null),
    addSideEffect('load', (_, i) => i.get(HttpClient).get<Dictionary<Todo>>('https://jsonplaceholder.typicode.com/todos')),
    addEffectMap((f) => f.actions.load.success, (f) => f.actions.addMany, (todos) => ({items: Object.values(todos)})),
).sample();
```

This snippet starts from the creator `createEntityFeature` which is a collection of operators that generate everything you need to work with entities such as create, update and delete actions (and relative reducers), array and entities selectors and the useful @ngrx/entity adapter.

After that three operators are piped:

`addSelectableEntity` encapsulate the common behavior of having a selectable entity in your feature adding a `selected` state, `select` action, a `selected` selector and the reducer that wires it all together.

`addSideEffect` creates a basic side effect with the name `load` creating 3 actions (trigger, success and failure) and an HTTP call to fetch todos.

`addEffectMap` creates an effect that maps an action to another. In this case the `load` success actions of the side effect is mapped to the `addMany` action of the feature, causing the todos to be wrote to the state in case the call succeed.

The full example code can be found inside `/projects/demo/src/app/items.ivy.feature.ts`
