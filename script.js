let input_name=document.querySelector("#uname")
let input_email=document.querySelector("#email")
let input_password=document.querySelector("#upw")
let input_cpassword=document.querySelector("#cpw")
let errormsg=document.getElementsByClassName("error")[0]
let signupform=document.querySelector(".signup")


signupform.addEventListener('submit', validateform)

let arr=[]
let id=1;

function validateform(e){
    let username=input_name.value
    let userpassword=input_password.value
    let useremail=input_email.value
    let usercpassword=input_cpassword.value    

    e.preventDefault()
    if(validatename(username) < 2){
        errormsg.innerHTML="Name should at least be 2 letter word"
    }
    else if(useremail.indexOf('@')==-1){
        errormsg.innerHTML="@ should be included in email"
    }
    else if(validatepassword(userpassword, useremail, username)==false){
        errormsg.innerHTML="Passwords should have at least 1 capital letter, 1 small, 1 number and 1 special characters, but password cannot be the same as name or email."
    }
    else if(usercpassword!=userpassword){
        errormsg.innerHTML="Password and confirm password should be the same."
    }
    else if(checkemail(useremail)==false){
        errormsg.innerHTML="Email already exists"
    }
    else{
        errormsg.innerHTML="Form submitted successfully"
        let obj = {id: id++, username, useremail , userpassword}
        arr.push(obj)
        console.log(arr);
        input_name.value=""
        input_password.value=""
        input_email.value=""
        input_cpassword.value="" //after submitting all the above values should be empty
        localStorage.setItem("data", JSON.stringify(arr))
       

        window.location.href="/loginpage.html"
    }
}
function checkemail(useremail){
    for(let t of arr){
        if(t.useremail==useremail){
            return false
        }
    }
    return true
}

function validatename(username){
    let count=username.split(" ")
    return count.length
}
function validatepassword(userpassword, useremail, username){
    let sl=0, cl=0, specl=0, num=0;
    for(let t of userpassword){
        if(t>='a' && t<='z'){
            sl++
        }
        if(t>='A' && t<='Z'){
            cl++
        }
        if(t>='0' && t<='9'){
            num++
        }
       else{
        specl++;
       }
    }   

    if(sl>=1 && cl>=1 && num>=1 && specl>=1 && userpassword!=useremail && userpassword!=username){
        return true
    }
    else{
        return false
    }
}