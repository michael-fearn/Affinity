module.exports = function getBaseDomain ( url ) {
  
    const pathArray = url.split( '/' );
    const protocol = pathArray[0];
    const host = pathArray[2];  
    const domain = host.split('.').slice(host.split('.').length - 2).join('.')
    const baseDomain = protocol + '//' + domain
    
    return baseDomain;
  }