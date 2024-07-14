export class TweetServices {
  static async listTweets() {
    console.log('Cookie:', document.cookie); // Adicionar log para verificar cookies

    const response = await fetch('http://localhost:8080/tweets/feed', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('user')}` 
      }
    });
    if (!response.ok) {
      throw new Error('Failed to fetch tweets');
    }

    const responseData = await response.json();
    return responseData;
  }
}