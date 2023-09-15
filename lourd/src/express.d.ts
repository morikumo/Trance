declare module 'express' {
    interface Request {
      user: any; // Remplacez 'any' par le type de votre utilisateur si possible
    }
  }
  