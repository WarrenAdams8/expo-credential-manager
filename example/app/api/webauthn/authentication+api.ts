const notImplementedResponse = (message: string) =>
  new Response(
    JSON.stringify({ error: 'Not implemented', message }),
    {
      status: 501,
      headers: { 'content-type': 'application/json' },
    }
  );

export async function GET() {
  return notImplementedResponse(
    'Return WebAuthn authentication options JSON from your backend.'
  );
}
