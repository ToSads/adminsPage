async function fetchtest() {
    const response = await fetch('https://tourmaline-delirious-burglar.glitch.me/exams', {
        method: 'get',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('tosadsToken')}`  // Include the token in Authorization header
        }
    });
    let data = await response.json()
    document.querySelector('.consolelog').innerHTML = JSON.stringify(data[0])
    console.log(response)
    console.log(data)
}


async function login() {
let myform = document.querySelector('#myform')

    let email = myform.childNodes[1].value.trim()
    let password = myform.childNodes[5].value.trim()
    let body = {
        email, 
        password
    }
    if (email == '' || password == '') {
        alert('يرجى وضع المعلومات بصورة صحيحة')
        window.location.pathname = 'adminsPage/index.html'
    }
    console.log(body)
    try {
        const response = await fetch('https://tourmaline-delirious-burglar.glitch.me/accounts/login', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
              },
        });
        let data = await response.json()
    
        if (data['message'] == 'welcome') {
            localStorage.setItem('tosadsToken', data['token'])
            document.querySelector('.consolelog').textContent = data['message']
            console.log(response)
            console.log(data)
            window.location.pathname = 'adminsPage/mainmenu.html'
        } else {
            document.querySelector('.consolelog').textContent = data['message']
            console.log(response)
            console.log(data)
        }
    }
    catch {
        alert("هناك مشكلة في الاتصال بالخادم")
    }
}

let data;
async function createAccount() {
    data;
    let myform = document.querySelector('#myform')

    let username = myform.childNodes[1].value.trim()
    let email = myform.childNodes[5].value.trim()
    let password = myform.childNodes[9].value.trim()
    if (username == '' || email == '' || password == '') {
        alert('يرجى وضع المعلومات بصورة صحيحة')
        window.location.pathname = 'adminsPage/index.html'
    }
    let body = {
        username,
        email, 
        password
    }
    console.log(body)
    try {
        const response = await fetch('https://tourmaline-delirious-burglar.glitch.me/accounts/create', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
              },
        });
        data = await response.json()
    
        if (data['message'] == 'تم إنشاء الحساب، يرجى طلب تفعيله من المسؤولين ومن ثم تسجيل الدخول') {
            alert(data['message'])
            window.location.pathname = 'adminsPage/index.html'
        } else {
            document.querySelector('.consolelog').textContent = data['message']
            console.log(response)
            console.log(data)
        }
    }
    catch {
        alert("هناك مشكلة في الاتصال بالخادم")
    }
}



const mainDiv = document.querySelector('.main-div')
function putHTML(template) {
    if (template == 'login') {
        mainDiv.innerHTML = `
        <h1>تسجيل الدخول</h1>

        <div id="myform" class="login-form">
            <input placeholder="email" type="email" name="email"> <br>
            <input placeholder="password" type="password" name="password"> <br>
            <button onclick="login()" id="sendbtn">send</button> <br>
        </div>
        <button class="create-account-btn-a" onclick="putHTML('create-account')">إنشاء حساب</button>
        `
    } else if (template == 'create-account') {
        mainDiv.innerHTML = `
        <h1>إنشاء حساب</h1>
            <div id="myform" class="create-account-form">
                <input placeholder="username" type="text" name="username"> <br>
                <input placeholder="email" type="email" name="email"> <br>
                <input placeholder="password" type="password" name="password"> <br>
                <button onclick="createAccount()" id="sendbtn">send</button> <br>
            </div>        
            <button class="login-btn-a" onclick="putHTML('login')">تسجيل دخول</button>


        `
    }
}


        /* headers: {
            'Authorization': `Bearer ${token}`  // Include the token in Authorization header
        } */
