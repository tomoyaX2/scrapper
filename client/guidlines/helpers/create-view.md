# View Factory

To provide easier and faster way to map state/handlers to the view from model, there are `createView` factory.

With it you can configure component and have everything separated to make testing easier + reduce amount of boilerplate (including types).

Example

```tsx
// somewhere in the model file
const reset = createEvent();
const increment = createEvent();
const decrement = createEvent();

const $count = createStore().reset(reset);

$count.on(increment, state => state + 1).on(decrement, state => state - 1);

const props = {
  count: $count,
  onMinusClick: increment,
  onPlusClick: decrement
};

const map = props => ({
  title: 'Count is: ' + props.count
});

const useEffects = props => {
  useEffect(() => {
    document.body.style.top = props.count + 'px';
    // dont forget about cleanup
  }, [props.count]);
};

// Props parameter will define external props of the component
// if you'll map some of this props in build chain, they will omit from final component
const Counter = createView<Props>()
  // will map stores to values using useStore
  // will map events to scope bound events via useEvent
  // will map all other static values in passed objects to props
  .props(props)
  // accepts props (including previously mapped by above chain or provided by .props )
  // avoid writing side effects in there
  .map(map)
  // called after all props mapped, accepts those props as parameter and here you can do something with react hooks for example
  .effect(useEffects)
  // enter will be called on mount
  .enter(reset)
  // exit will be called on unmount
  .exit(reset)
  // easier setup for displayname
  .displayName('Counter')

  .defaultProps// Pure render function, avoid writing any logic related code in there. Pre-map as much possible to only put some 1 lvl conditions and map data
  .view(({ count, onMinusClick, onPlusClick }) => {
    // Avoid writing any logic/variable calculations there, prefer using .map to provide mapper function
    return (
      <div>
        <button onClick={onMinusClick}>-</button>

        <div>Count: {count}</div>

        <button onClick={onPlusClick}>+</button>
      </div>
    );
  });

// you will get ready to use component after calling .view
<Counter />
// if you need to prevent extra renders you can use in-built memo version
<Counter.Memo />
// if you need to get pure render function you can use
<Counter.View />

```
