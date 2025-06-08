const jwt = require("jsonwebtoken");

function verifyAccessToken(req, res, next) {
    try {
        const header = req.headers.authorization;

        if (!header || !header.startsWith("Bearer ")) {
            throw new Error("Missing or malformed token");
        }

        const token = header.split(" ")[1];

        const verifiedData = jwt.verify(token, process.env.SECRET);
        console.log("✅ Token verified:", verifiedData);

        req.userEmail = verifiedData.email;
        req.userRole = verifiedData.role;

        next();
    } catch (error) {
        console.error("❌ JWT Error:", error.message || error);
        return res.status(403).json({
            message: "authentication failed",
            error: "invalid access",
            data: null
        });
    }
}

module.exports = {
    verifyAccessToken
};
