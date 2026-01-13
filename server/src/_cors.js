export default function enableCors(req, res) {
  const allowedOrigin =
    "https://its-atttendance-system-yeur-itldfikhh-c19rks-projects.vercel.app";

  res.setHeader("Access-Control-Allow-Origin", allowedOrigin);
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Requested-With"
  );

  // Handle preflight
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return true;
  }
  return false;
}
