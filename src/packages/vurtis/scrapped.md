# Scrapped code snippets

```ts
const [listBottom, setListBottom] = useState(MIN_ITEM_SIZE);

useEffect(() => {
  setListBottom(listTop + listHeight);
}, [listTop, listHeight]);

// Compute the visible height of the list on screen.
useEffect(() => {
  const notYetScrolledIntoView =
    listTop >= windowHeight && scrollY <= listTop - windowHeight;
  const scrolledPast = scrollY >= listBottom;

  // const scrolledAmount = clamp(0, scrollY - listTop, listHeight);

  if (notYetScrolledIntoView || scrolledPast) {
    setListVisibleHeight(0);
  } else {
    const heightOffset =
      scrollY <= listTop ? listTop - scrollY : scrollY - listTop;
    setListVisibleHeight(clamp(0, listHeight - heightOffset, windowHeight));
  }
}, [listTop, listBottom, listHeight, scrollY, windowHeight]);
```
