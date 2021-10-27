### Folder Structure
Within the `/components` directory, 3 major folders exist.
1. `./App`
   > Contains components related to the functional side of the web application (i.e. MapCard, Map, etc.). 
2. `./Product`
   > Contains components related to the product side of the web application (i.e. Homepage, Contact Us, etc.).
3. `./Global`
   > Contains components related to the entire web application (i.e. Button, Logo, etc.).

### Component Structure
1. For each component, a directory should be named after the component, written PascalCase.
2. The component function should be named accordingly, always matching the component directory they are contained within.
3. Any other files directly correlated to a given component should be placed within that component's directory, including styles and tests.


#### Example
For a component named "Component" the structure would look like:
> **Component**
\
> `./Component/index.tsx`
\
> `./Component/Component.module.scss`
\
> `./Component/Component.test.tsx`

The component itself would then look like:
```ts
const Component = () => {
    ...
}

export default Component;
```

And if we presume that Component is a Global component. Then we modify `/Global/index.tsx` as follows:
```ts
...
import Component from './Component';


export {
    ...,
    Component
}
```

#### Guidelines

```ts
// bad
import Component from './Component/Component';
import Component from './Component/index';

// good
import Component from './Component';
```

```ts
// bad - never name components index, even though the file is named that
const Index = () => {
    ...
}

export default Index;
```
