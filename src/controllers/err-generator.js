import { ERRORS } from "../config/error-conditions";

function ErrorCondition(err) {
  
  switch (err.message) {
    case ERRORS.NOT_FOUND:
      return {
        code: 404,
        message: "Not Found",
      };
    case ERRORS.EMAIL_ALREADY_EXIST:
      return {
          code: 400,
          message: 'Email already Exist'
      }
  }
}

export default ErrorCondition;
