import { JSDOM } from "jsdom";
import { assert } from "https://deno.land/std@0.132.0/testing/asserts.ts";

const dom = new JSDOM(
  `<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Hello from Deno</title>
  </head>
  <body>
    <h1>Hello from Deno</h1>
    <form>
      <input name="user">
      <button>
        Submit
      </button>
    </form>
  </body>
</html>`,
  {
    url: "https://example.com/",
    referrer: "https://example.org/",
    contentType: "text/html",
    storageQuota: 10000000,
  },
);

const h1 = dom.window.document.querySelector("h1");
assert(h1);

console.log(h1.textContent);
