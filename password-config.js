const { body, validationResult } = require('express-validator');

// module.exports.mid =   (req,res,next) =>  {
    
//   }


module.exports = function validatePassword (req,res,next)  {
    // mid(bodys)
    // console.log('check')
    console.log(req.body)
    const errors = validationResult(req.body);
    console.log(errors)
    if (!errors.isEmpty()) {
      console.log('1')
      return res.status(422).json({ errors: errors });
    }
  
    // If there are no validation errors, proceed with the next middleware
    console.log('2')

    next();
}

