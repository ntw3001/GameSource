const errorCodes = (code) => {
  let msg = "Come back another time"
  
  switch (code) {
    case 'auth/invalid-email':
      return 'Invalid email address format';
    case 'auth/user-disabled':
      return 'User account disabled';
    case 'auth/user-not-found':
      return 'User not found';
    case 'auth/wrong-password':
      return 'Invalid email or password';
    case 'auth/email-already-in-use':
      return 'Email already in use';
    case 'auth/weak-password':
      return 'Password is too weak';
    default:
      return code;
  }
}

export default errorCodes;
