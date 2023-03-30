const AccessControl = require("accesscontrol");
const ac = new AccessControl();

exports.roles = (function() {
    
    
    ac.grant("buyer")
        .readOwn("profile")
        .updateOwn("profile")
        .createOwn("cart")
    
    ac.grant("seller")
        .readOwn("profile")
        .updateOwn("profile")
        .createAny("product")
        .readAny("product")

    
    ac.grant("admin")
     .readOwn("profile")
     .updateOwn("profile")
     .readAny("profile")
     .deleteAny("profile")
    return ac;
    })();