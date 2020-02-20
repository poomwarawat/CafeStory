function Picprofile() {
  document.getElementById("mySidenav").style.width = "250px";
}
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.

    document.getElementById("myBtn1").style.display = "none";
    document.getElementById("myBtn").style.display = "none";
    
    var user = firebase.auth().currentUser;
    var email_id = user.email;
    document.getElementById("user_para").innerHTML = email_id;
    if (user != null){
      document.getElementById("PicPro").style.display = "block";
      $('#exampleModalLong1').modal('hide');
    var Verify = user.emailVerified
    if(Verify == true){
      console.log("Verified");
    }else{
      console.log("not verified");
      $('#exampleModal2').modal('show');
    }
      
    }
  }
});
function sendEmailVerification() {
  firebase.auth().currentUser.sendEmailVerification().then(function() {
    alert('Email Verification Sent!');
  });
}

function login(){

  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;

  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    document.getElementById("error_login").innerHTML = errorMessage;
    // ...
  });

}

// to Reset password
function toReset(){
  console.log("To reset pass");
  $('#exampleModalLong1').modal('hide');
  $('#exampleModal3').modal('show');
}
// Reset
function sendPasswordReset() {
  var email = document.getElementById('emailReset').value;
  // [START sendpasswordemail]
  firebase.auth().sendPasswordResetEmail(email).then(function() {
    // Password Reset Email Sent!
    // [START_EXCLUDE]
    alert('Password Reset Email Sent!');
    // [END_EXCLUDE]
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // [START_EXCLUDE]
    if (errorCode == 'auth/invalid-email') {
      alert(errorMessage);
    } else if (errorCode == 'auth/user-not-found') {
      alert(errorMessage);
    }
    console.log(error);
    // [END_EXCLUDE]
  });
  // [END sendpasswordemail];
}
// tocreate
function toCreate(){
  $('#exampleModalLong1').modal('hide');
  $('#exampleModal').modal('show');
  console.log("tocreate");
}
function logout(){
  firebase.auth().signOut();
  document.getElementById("myBtn1").style.display = "block";
  document.getElementById("myBtn").style.display = "block";
  document.getElementById("PicPro").style.display = "none";
  location.reload();
  closeNav();
}

//  signUp
function SignUp(){
  var Email= document.getElementById('email').value;
  var Password = document.getElementById('password').value;
  var Name = document.getElementById('name').value;
  var Lastname = document.getElementById('lastname').value;
  var ErrorZone = document.getElementById('error_show');
  if(Email.lenght <6){
    console.log("Email must to more than 6 ");
    Error.innerHTML = "Email must to more than 6 ";
  }
  if(Password.lenght <6){
    console.log("Password must to more than 6");
    ErrorZone.innerHTML = "Password must to more than 6"
  }
  if(Name == ""){
    console.log("Please enter your name");
    ErrorZone.innerHTML = "Please enter your name"
  }
  if(Lastname == ""){
    console.log("Please enter your lastname");
    ErrorZone.innerHTML = "Please enter your lastname"
  }
  else{
    console.log("Success");
    $('#exampleModal').modal('hide');
    firebase.auth().createUserWithEmailAndPassword(Email, Password).catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    $('#exampleModal').modal('show');
    if (errorCode == 'auth/weak-password') {
        ErrorZone.innerHTML = "The password is too weak.";
    }
    else if(errorMessage){
        ErrorZone.style.color = "red";
        ErrorZone.innerHTML = errorMessage;
    }
    console.log(error);
    });
  }
}
function wishlist(){
  console.log("click Wishlist");
  firebase.auth().onAuthStateChanged(function(user) {
    if(user){
      console.log("logined");
      if(user.emailVerified){
        console.log("Verify true");
        SnakBar();
      }else{
        console.log("Not verify");
        $('#exampleModal2').modal('show');
      }
    }else{
      console.log("Not logined");
      $('#exampleModalLong1').modal('show');
    }
  })
}
// snakbar
function SnakBar() {
  var x = document.getElementById("snackbar");
  x.className = "show";
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}