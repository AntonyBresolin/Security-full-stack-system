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
    })
  }

  static async loginUser(data) {
    const response = await fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(response => {
      if (!response.ok) {
        throw new Error('Failed to login user');
      }
      return response.json();
    })
    return response;
  }
}