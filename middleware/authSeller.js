import jwt from "jsonwebtoken"

const authSeller = async (req, res, next) => {
  const { sellerToken } = req.cookies;

  if (!sellerToken) {
    return res.status(401).json({ success: false, message: "Not Authorized" });
  }

  try {
    const tokenDecode = jwt.verify(sellerToken, process.env.JWT_SECRET);

    if (tokenDecode.email === process.env.SELLER_EMAIL) {
      return next(); // ✅ Call next only once, and return
    } else {
      return res.status(403).json({ success: false, message: "Forbidden" });
    }

  } catch (error) {
    return res.status(401).json({ success: false, message: error.message });
  }
};

export default authSeller