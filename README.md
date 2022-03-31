# Using the DOM with Deno

This repository contains simple examples of using the DOM with
[Deno](https://deno.land). It provides examples with several different
libraries:

- [deno-dom](https://deno.land/x/deno_dom)
- [linkeDOM](https://github.com/WebReflection/linkedom)
- [jsdom](https://github.com/jsdom/jsdom)

The `deno.jsonc` contains several tasks to run the examples.

## Notes

Both the benchmarks and the `deno_dom:native` task uses the _deno-dom_ FFI
interface to directly call into Rust. If you are on a supported platform, there
are already built binaries that will be cached. If you are on a currently
unsupported version (ARM64, M1) then this requires that the native version of
the code of the library to be built and the `DENO_DOM_PLUGIN` environment
variable to point to that library. For instructions on how to do that, see:
https://github.com/b-fuze/deno-dom#building-deno-dom-native

This repo expects that you are using Deno 1.20 or later.

To see what tasks are available, run the following:

```
deno task
```

To run the benchmarks use:

```
deno task bench
```
