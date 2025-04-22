export class AuthService {
  static async checkAuthStatus() {
    try {
      const response = await fetch("http://localhost:8080/auth/status", {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        return data;
      }
      return { authenticated: false };
    } catch (error) {
      console.error("Error checking auth status:", error);
      return { authenticated: false };
    }
  }
}
