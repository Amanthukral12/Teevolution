import dotenv from "dotenv";
dotenv.config();

async function getPayPalAccessToken() {
  // Authorization header requires base64 encoding
  const auth = Buffer.from(
    process.env.PAYPAL_CLIENT_ID + ":" + process.env.PAYPAL_APP_SECRET
  ).toString("base64");

  const url = `${process.env.PAYPAL_API_URL}/v1/oauth2/token`;

  const headers = {
    Accept: "application/json",
    "Accept-Language": "en_US",
    Authorization: `Basic ${auth}`,
  };

  const body = "grant_type=client_credentials";
  const response = await fetch(url, {
    method: "POST",
    headers,
    body,
  });

  if (!response.ok) throw new Error("Failed to get access token");

  const paypalData = await response.json();

  return paypalData.access_token;
}

export async function checkIfNewTransaction(orderModel, paypalTransactionId) {
  try {
    const orders = await orderModel.find({
      "paymentResult.id": paypalTransactionId,
    });

    return orders.length === 0;
  } catch (err) {
    console.error(err);
  }
}
