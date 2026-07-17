export default async function handler(req, res) {
  const token = process.env.BOT_TOKEN;

  if (!token) {
    return res.status(500).json({
      error: "BOT_TOKEN not found"
    });
  }

  return res.status(200).json({
    status: "Global Taxi SPB Bot is running",
    bot_token: "configured"
  });
}
