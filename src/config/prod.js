const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT;
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_ALGORITHN = process.env.JWT_ALGORITHN;
const JWT_SHORT_EXPIRESIN = process.env.JWT_SHORT_EXPIRESIN;
const COOKIE_SECRET = process.env.COOKIE_SECRET;
export default {
  MONGO_URI,
  PORT,
  JWT_SECRET,
  JWT_ALGORITHN,
  JWT_SHORT_EXPIRESIN,
  COOKIE_SECRET
};
