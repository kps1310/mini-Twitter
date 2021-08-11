const { body } = require("express-validator");


const validate = (method) => {
   switch (method) {
      case "createUser":
         return [
            body('username', 'Username needed').exists(),
            body('password', 'Password needed').exists()
         ]
   }
}

module.exports = validate;