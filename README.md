# Instalation

```sh
npm install git+git@github.com:FRST-Falconi/iframe.communication.git#master --save
```

# How to use it

- At parent:

```jsx
import { setupParentListener } from "iframe-communication";

export default function Page() {
  useEffect(() => {
    // SET UP PARENT LISTENER PASSING CHILD DOMAIN(s)
    setupParentListener(["http://localhost:3000"]);
  }, []);

  return (
    <div>
      <Box style={{ height: "1000px" }}>
        <iframe
          loading="lazy"
          height="100%"
          width="100%"
          src="http://localhost:3000/user/student-progress" // child to be loaded
          frameBorder="0"
        />
      </Box>
    </div>
  );
}
```

- At Child

```jsx
import { getDataFromParent } from "iframe-communication";
...
useEffect(() => {
  getDataFromParent("user", setUser);
}, []);
```

Functions:

```ts
function setupParentListener(childDomains: Array<String>): void;

function getDataFromParent(key: String, callback: Function): void;
```
