import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
    const tok = process.env.JWT_SECRET;
    console.log(tok)
  const token = jwt.sign({ userId }, tok, {  //userid ka jwt token bana rahe hain bhai
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // MS
    httpOnly: true, // prevent XSS attacks cross-site scripting attacks
    sameSite: 'None', // CSRF attacks cross-site request forgery attacks
    secure: true,
  });
  console.log("Token cookie set:", token);

  return token;
};