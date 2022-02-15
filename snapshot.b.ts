import { decode } from "https://deno.land/std@0.92.0/encoding/ascii85.ts";
import { decompress } from "https://deno.land/x/brotli@v0.1.4/mod.ts";
import { parse } from "https://raw.githubusercontent.com/trgwii/bundler/master/parse.ts";
export default await parse(
  decompress(
    decode(
      "