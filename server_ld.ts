import { DOMParser } from "https://esm.sh/linkedom@0.14.5";
import { assert } from "https://deno.land/std@0.132.0/testing/asserts.ts";

const fixture = `<!DOCTYPE html>
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
</html>`;

function getText(body: string) {
  return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <title>Hello from Deno Deploy</title>
    </head>
    ${body}
  </html>`;
}

async function handle(conn: Deno.Conn) {
  const httpConn = Deno.serveHttp(conn);
  for await (const { respondWith } of httpConn) {
    const document = new DOMParser().parseFromString(fixture, "text/html");
    assert(document);
    const h1 = document.querySelector("h1");
    assert(h1);
    h1.innerHTML = "Hello from Deno Deploy";
    respondWith(
      new Response(getText(document.body.outerHTML), {
        headers: {
          "content-type": "text/html",
        },
      }),
    );
  }
}

async function main() {
  const server = Deno.listen({ port: 8080 });
  console.log("listening on http://localhost:8080/");
  for await (const conn of server) {
    handle(conn);
  }
}

main();
