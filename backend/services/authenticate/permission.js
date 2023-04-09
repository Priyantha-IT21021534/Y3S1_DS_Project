const AccessControl = require('accesscontrol');

const ac = new AccessControl();


exports.permission = (function(){
    ac.grant('buyer').readAny('product')
ac.grant('seller').extend('buyer').createOwn('product').deleteOwn('product')
ac.grant('admin').extend('buyer').extend('seller').updateAny('product').deleteAny('product')

return ac;
})();
