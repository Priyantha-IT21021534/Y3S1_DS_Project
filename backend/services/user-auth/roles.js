const AccessControl = require("accesscontrol");
const ac = new AccessControl();

exports.roles = (function() {
    
    
    ac.grant("buyer")
        .readOwn("profile")
        .updateOwn("profile")
    
    ac.grant("seller")
        .extend("buyer")
        .createAny("product")

    
    ac.grant("admin")
     .extend("buyer")
     .readAny("profile")
     .deleteAny("profile")
    return ac;
    })();