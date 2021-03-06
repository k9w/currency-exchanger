export default class CurrencyExchange {
  static async getCurrency(currency) {
    try {
      const response = await fetch(`https://v6.exchangerate-api.com/v6/${process.env.api_key}/latest/${currency}`);
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    } catch(error) {
      return error.message;
    }
  }
}

