const {constants} = require("../constants");
const errorHandler = (err,req,res,next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    switch (statusCode) {
        case constants.VALIDATION_ERR:
            res.json({title: "Validation failed",
            message: err.message,
            stackTrace: err.stack,
         });
        case constants.NOT_FOUND:
            res.json({title: "NOT Found",
            message: err.message,
            stackTrace: err.stack,
         });
            break;
        case constants.FORBIDDEN:
            res.json({title: "Forbdden",
            message: err.message,
            stackTrace: err.stack,
         });
            break;
        case constants.UNAUTHORIZED:
            res.json({title: "Ethical User",
            message: err.message,
            stackTrace: err.stack,
         });
            break;
        case constants.SERVER_ERR:
            res.json({title: "Server Error",
            message: err.message,
            stackTrace: err.stack,
         });
            break;
        default:
            console.log("No Error, All good :)");
            break;
    }
    
    
};

module.exports= errorHandler;
