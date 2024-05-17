const form = document.getElementById('loginForm');
const loginError = document.getElementById('loginError')

form.addEventListener('submit',async (e)=>{
  e.preventDefault();
  const email = form.email.value;
  const password =form.password.value;
  try{
    const res = await fetch('/auth/login', {
      method:'POST',
      body:JSON.stringify({email,password}),
      headers:{'Content-Type':'application/json'}
    })
    const data = await res.json();
    if(res.ok){
      location.assign('/')
    }
    if(data.errorMessage){
      loginError.textContent=data.errorMessage

    }

  }catch(err){
    console.log(err)
  }
})