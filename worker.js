export default {
  async fetch(request, env) {
    // If this is a Pages project, static assets are served automatically
    // This fallback just returns a message for root requests
    const url = new URL(request.url);
    if (url.pathname === '/') {
      return new Response('AnuraOS - Fallback', { status: 200, headers: { 'Content-Type': 'text/plain' } });
    }
    return new Response('Not Found', { status: 404 });
  }
}
