const errorCodes = (code) => {
  console.log('Received code:', code);
  switch (code) {
    case "auth/too-many-requests" : return "Too many requests. Try again later.";
    case "auth/invalid-email" : return "That wasn't an email";
    case "auth/email-already-in-use" : return "Email already in use.";
    case "auth/user-not-found" : return "User not found.";
    case "auth/invalid-credential" : return "Invalid credential.";
  };

  return code || 'An unknown error occurred';
};

export default errorCodes;
