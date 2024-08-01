export const checkValidData = (email) => {
  const isEmailValid = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(
    email
  );

  if (!isEmailValid) return "Enter a valid email id";

  return null;
};
