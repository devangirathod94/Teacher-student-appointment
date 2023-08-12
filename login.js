const firebaseConfig = {
    apiKey: "AIzaSyBPWFwPg-luOvdsCakQDLu6vS7WA8oUvds",
    authDomain: "student-48134.firebaseapp.com",
    databaseURL: "https://student-48134-default-rtdb.firebaseio.com",
    projectId: "student-48134",
    storageBucket: "student-48134.appspot.com",
    messagingSenderId: "852408450181",
    appId: "1:852408450181:web:74981d3c0953039a7dfdec"
  };



  // Initialize Firebase
  const app = firebase.initializeApp(firebaseConfig);
  const auth =firebase.auth();


 document.getElementById('Loginfrm').addEventListener('submit', submitForm);




function AuthenticateUser()
{

var username = document.getElementById("username");
var password = document.getElementById("password");

        // let role_data=[];
        //  firebase.database().ref('Login Data')
        // .once("value", (snapshot) =>{
        //     snapshot.forEach((childSnapshot) =>{

        //         role_data.push(childSnapshot.key);
        //     });
        // });
       // console.log(role_data);


//         let roles=['admin','teacher','student'] ;
//         if(roles[0] == "admin"){
         firebase.database().ref('Login Data').child('admin').child(username.value)
        .once("value",function (snapshot) {
            if(snapshot.exists()){
                 let role=snapshot.val().Role
                if( snapshot.val().Password == password.value && snapshot.val().Role == "admin" &&  snapshot.val().Username == username.value) 
                {
                             
                    window. window.location="admin.html";
                             
                }
                else{
                    alert('Enter Valid Data')
                }
              
            }
        });
        firebase.database().ref('Login Data').child('teacher').child(username.value)
        .once("value",function (snapshot) {
            if(snapshot.exists()){
                console.log(snapshot.val())
             
                if(snapshot.val().Password == password.value  && snapshot.val().Role == "teacher" && snapshot.val().Username == username.value ) 
                {
                        login_teacher(snapshot.val().Username);
                }
                else{
                    alert('Enter Valid Data')
                }
            }
            
        });
        firebase.database().ref('Login Data').child('student').child(username.value)
        .once("value",function (snapshot) {
            if(snapshot.exists()){
                if(snapshot.val().Activated == true){
                
                  if(DecPass(snapshot.val().Password) == password.value  && snapshot.val().Role == "student" &&   snapshot.val().Username == username.value)
                  {
                        login_student(snapshot.val().Username);
                  }
                  else{
                    alert('Enter Valid Data or ')
                  }}
                  else{
                    alert('You Are not Activated by admin')
                  }
            }

          
        });
       
    
}

 function login_student(user){
  
    let keepLoggedIn = document.getElementById('flexSwitchCheckDefault').checked;

    if(!keepLoggedIn){
      sessionStorage.setItem('user',JSON.stringify(user));
      window.location="stud_page.html";
    }
    else{
      localStorage.setItem('keepLoggedIn','yes');
      localStorage.setItem('user',JSON.stringify(user));
      window.location="stud_page.html";
    }
}
 function login_teacher(user){
  
    let keepLoggedIn = document.getElementById('flexSwitchCheckDefault').checked;

    if(!keepLoggedIn){
      sessionStorage.setItem('user',JSON.stringify(user));
      window.location="teacher_page.html";
    }
    else{
      localStorage.setItem('keepLoggedIn','yes');
      localStorage.setItem('user',JSON.stringify(user));
      window.location="teacher_page.html";
    }
}

function DecPass(dbpass){
 var pass2= CryptoJS.AES.decrypt(dbpass,password.value);
  return pass2.toString(CryptoJS.enc.Utf8);
}



 function submitForm(e) {
    e.preventDefault();
  AuthenticateUser();
  
  }
