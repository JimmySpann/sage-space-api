import jwt from 'jsonwebtoken';

const authRequired = (req, res, next) => {
  // GET TOKEN FROM REQUEST HEADER
  const token = req.headers['authorization'];

  // VERIFY TOKEN
  jwt.verify(token, process.env.JWT_SECRET, (err, decodedUser) => {
    if (err || !decodedUser) {
      return res.status(401).json({
        message: 'You are not authorized. Please login and try again'
      });
    }

    // ADD PAYLOAD TO REQ OBJECT
    req.currentUser = decodedUser;

    // ********** --- --- **********
    // CALL NEXT AS MIDDLEWARE FUNCTION
    next();
  });
}

export default authRequired;
