export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { server } = await import("./mocks/server"); // <- not from a JSON file
    server.listen();
  }
}