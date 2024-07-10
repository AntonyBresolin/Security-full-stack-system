export class UserControllerService {
  static async registerUser(data) {
    await fetch('http://localhost:8080/users/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(response => {
      if (!response.ok) {
        throw new Error('Failed to register user');
      }
      console.log(response.status);
    });
  }

  static async loginUser(data) {
    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Failed to login user');
      }

      const responseText = await response.text();
      console.log('Response text:', responseText);

      if (responseText) {
        const responseData = JSON.parse(responseText);
        console.log('User logged in successfully');
        console.log('Response:', responseData);
      } else {
        console.log('User logged in successfully but no JSON response');
      }

      // Verifique se o cookie foi definido
      console.log('Cookie:', document.cookie);

    } catch (error) {
      console.error('Error:', error);
    }
  }
}


