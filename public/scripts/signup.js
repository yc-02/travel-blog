const form = document.getElementById('signupForm');
const emailError = document.getElementById('emailError')
const usernameError = document.getElementById('usernameError')
const passwordError = document.getElementById('passwordError')
form.addEventListener('submit', async (e)=>{
  e.preventDefault();
  emailError.textContent='';
  passwordError.textContent='';
  usernameError.textContent='';
  const email = form.email.value;
  const password =form.password.value;
  const username = form.username.value;
  try{
    const res = await fetch('/auth/signup',{
      method:'POST',
      body:JSON.stringify({email,password,username}),
      headers:{'Content-Type':'application/json'}
    });
    const data = await res.json()
    if(data.errorMessages){
      emailError.textContent=data.errorMessages.email;
      passwordError.textContent=data.errorMessages.password;
      usernameError.textContent=data.errorMessages.username;
    }
    if(data.user){
      location.assign('/')
    }
  }catch(err){
    console.log(err)
  }


})