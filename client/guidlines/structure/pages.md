# Pages

Pages is supposed to be top level of composition. Here you compose widgets/features/entities.
Page can have own model but it shouldnt have logic which can be put to some entity/feature, for example if you have user entity and you need to get when you go to specific page, you can either store it inside the user entity or inside the page state IF it's somehow different and not shared between other parts of the app if it's the only place when you use user you better to leave it inside the entity and not in page, inside the page you'll have an event which you trigger (via GSSP or useEffect way) then you can bind it (via sample) to trigger getUserFx for example.

Page is supposed to be put inside the own folder, folder can contain

- index.ts - public export file
- pagename.component.tsx - page view + bindings
- pagename.props.ts - here you can define HOC function which will get all needed data for your page (map stores/map events/call effects), also there you can store props map ( with stores for createView factory ).
- pagename.module.scss - page styles
- pagename.model.ts - effector based model file (you can check recommendations for model files in respective guidelines doc)

To simplify page construction ( applies to any other components ) you can use `createPage` factory for the page model and `createView` to configure mappings and provide separation of bindings and render of any page.

Example

```tsx
// home.component.tsx

// can be moved to home.props.ts, to prevent spamming of same named exports across the projects, it's recommended to name it homeProps (in this case)
const props = {
  featured: $featured,
  onGoSeeMoreClick: seeMoreClicked
};

// can be moved to home.props.ts, same things about naming, those functions can be called mapHomeProps (in this case)
const map = ({ someProp }) => {
  return {
    // it's an example, prefer mapping things from stores in props map instaed of mapping function, until you need to use external props
    title: 'Hello, nice to see you again! ' + someProp
  };
};

const Home = createView()
  .props(props)
  .map(map)
  .enter(homePage.enter)
  .view(({ featured, onGoSeeMoreClick }) => {
    // preferably, you shouldnt put any logic here, just map TSX as pure render function, you can map some stuff inbefore it passed to render function
    return <div>Some more JSX content goes here</div>;
  });

// home.model.ts

// you can simplify creation of lifecycle models with createPage;
const homePage = createPage();

sample({
  clock: homePage.enter,

  target: getFeaturedFx
});
```
