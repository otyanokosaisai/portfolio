export function deobf(encoded: string): string {
  const b64 = encoded.replace(/[A-Za-z]/g, (c) =>
    String.fromCharCode(
      c.charCodeAt(0) + (c.toLowerCase() < "n" ? 13 : -13)
    )
  );
  return atob(b64);
}
