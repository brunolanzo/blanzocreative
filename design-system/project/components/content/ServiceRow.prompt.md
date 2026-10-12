Accordion row for services and capabilities. Rows are separated by hairlines — never boxed in cards.

```jsx
<ServiceRow index="01" title="motion design" description="Frame-by-frame craft…" tags={["2d","3d","type in motion"]} open={open === 0} onToggle={() => setOpen(0)} />
```

The `+` rotates 45° on open using `--ease-draw`.
