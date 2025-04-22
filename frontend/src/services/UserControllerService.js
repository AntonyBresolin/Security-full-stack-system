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
      await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        credentials: 'include'
      }).then(response => {
      });
    } catch (error) {
      console.error('Error:', error);
    }
  }

  static async logoutUser() {
    try {
      await fetch('http://localhost:8080/logout', {
        method: 'POST',
        credentials: 'include'
      });
    } catch (error) {
      console.error('Error during logout:', error);
    }
  }
}


