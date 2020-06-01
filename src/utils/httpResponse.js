export default function makeHttpResponse({ statusCode, result }) {
  return Object.freeze({
    statusCode,
    body: JSON.stringify(result),
    
  });
}
