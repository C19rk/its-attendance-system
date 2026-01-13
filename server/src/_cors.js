export default function enableCors(req, res, next) {
  const allowedOrigin = "https://its-atttendance-system-yeur.vercel.app";

  res.setHeader("Access-Control-Allow-Origin", allowedOrigin);
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Requested-With"
  );

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  next();
}
