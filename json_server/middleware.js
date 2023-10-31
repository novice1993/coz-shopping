// middleware.js
module.exports = (req, res, next) => {

    
    // count 파라미터가 있다면 _limit으로 변환
    if (req.query.count) {
      req.query._limit = req.query.count;
      delete req.query.count;
    }
    next();
  };
  