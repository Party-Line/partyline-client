function connect(user) {
    window.user = user
    
    // pause for 2 seconds so there is no weird blip when the login is fast
    setTimeout(function () {
        document.querySelector('#pl-login').classList.add('d-none')
        document.querySelector('#pl-head').classList.remove('d-none')
        document.querySelector('#pl-channels').classList.remove('d-none')
        document.querySelector('#pl-foot').classList.remove('d-none')
    }, 2000)
}

function disconnect() {
    // TODO
}

function token(token) {
    let tokenDecoded
    
    try {
        tokenDecoded = JSON.parse(atob(token.split('.')[1]))
    } catch (e) {
        // TODO
        // let error = '<strong>An invalid refresh token was returned. Please login again.</strong>'
        // 
        // let messageHTML = '<div class="alert-unknown">' + error + '</div>'
        // document.querySelector('#logout-message').innerHTML = messageHTML
        
        this.logout()
        
        return
    }
    
    if (tokenDecoded.remember === 1) {
        sessionStorage.removeItem('jwt')
        
        try {
            localStorage.setItem('jwt', token)
        } catch (e) {
            // TODO
            // let error = '<strong>Your local storage is full. Please delete it and login again.</strong>'
            // 
            // let messageHTML = '<div class="alert-unknown">' + error + '</div>'
            // document.querySelector('#logout-message').innerHTML = messageHTML
            
            this.logout()
            
            return
        }
    } else {
        localStorage.removeItem('jwt')
        
        sessionStorage.setItem('jwt', token)
    }
}

function logout(errorCode, ws) {
    localStorage.removeItem('jwt')
    sessionStorage.removeItem('jwt')
    
    // TODO
    // if (typeof errorCode == 'string' && errorCode !== '') {
    //     let error = '<strong>There was an authentication error. Please login again.</strong>'
    //     error += '<br>' + errorCode
    //             
    //     let messageHTML = '<div class="alert-unknown">' + error + '</div>'
    //     document.querySelector('#logout-message').innerHTML = messageHTML
    // }
    // 
    // document.querySelector('#logout').style.display = ''
    
    ws.close()
}

export { connect, disconnect, token, logout }