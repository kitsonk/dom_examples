import { DOMParser as DDDOMParser } from "https://deno.land/x/deno_dom@v0.1.21-alpha/deno-dom-wasm.ts";
import { DOMParser as DDNDOMParser } from "https://deno.land/x/deno_dom@v0.1.21-alpha/deno-dom-native.ts";
import {
  DOMParser as LDDOMParser,
  parseHTML,
} from "https://esm.sh/linkedom@0.14.5";
import { JSDOM } from "jsdom";
import {
  assert,
  assertEquals,
} from "https://deno.land/std@0.132.0/testing/asserts.ts";

const warmup = 1000;
const n = 2000;

Deno.bench({
  name: "deno-dom",
  warmup,
  n,
  fn() {
    const document = new DDDOMParser().parseFromString(
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
      "text/html",
    );

    assert(document);
    const h1 = document.querySelector("h1");
    assert(h1);

    assertEquals(h1.textContent, "Hello from Deno");
  },
});

Deno.bench({
  name: "deno-dom native",
  warmup,
  n,
  fn() {
    const document = new DDNDOMParser().parseFromString(
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
      "text/html",
    );

    assert(document);
    const h1 = document.querySelector("h1");
    assert(h1);

    assertEquals(h1.textContent, "Hello from Deno");
  },
});

Deno.bench({
  name: "linkedom - DOMParser()",
  warmup,
  n,
  fn() {
    const document = new LDDOMParser().parseFromString(
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
      "text/html",
    );

    assert(document);
    const h1 = document.querySelector("h1");
    assert(h1);

    assertEquals(h1.textContent, "Hello from Deno");
  },
});

Deno.bench({
  name: "linkedom - parseHTML()",
  warmup,
  n,
  fn() {
    const { document } = parseHTML(
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
    );

    assert(document);
    const h1 = document.querySelector("h1");
    assert(h1);

    assertEquals(h1.textContent, "Hello from Deno");
  },
});

Deno.bench({
  name: "jsdom",
  warmup,
  n,
  fn() {
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

    assertEquals(h1.textContent, "Hello from Deno");
  },
});
