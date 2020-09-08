export default function (context) {
  const url = process.server ? context.req.url : '';
  const userAgent = process.server ?
    `(server) ${context.req.headers['user-agent']}` : `(client) ${navigator.userAgent}`;

  console.log(`[Access] ${url} : ${userAgent}`);
}
