const notImplementedResponse = (message: string) =>
  new Response(
    JSON.stringify({ error: 'Not implemented', message }),
    {
      status: 501,
      headers: { 'content-type': 'application/json' },
    }
  );

export async function POST() {
  return notImplementedResponse(
    'Verify Google ID token server-side and return a session.'
  );
}
