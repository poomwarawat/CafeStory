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
  function Next(){
    console.log("Next");
    window.open("tour/tour.html");
  }
  
  // price
  var Defualt = 1;
  var DefualtChilde =1;
  

  document.getElementById("ShowNum").innerHTML = "1";
  document.getElementById("ShowNum_childe").innerHTML = "1";
  document.getElementById("Total").innerHTML = "0";
  function Minus(n){
      Defualt +=n;
      console.log(Defualt);
      if(Defualt < 1){
          document.getElementById("MinusBTN").disabled = true;
      }
      // if(Defualt <= 20){
      //     document.getElementById("PlusBTN").disabled = false;
      // }
      TotalAdult();
  }
  function Plus(n){
      Defualt +=n;
      console.log(Defualt);
      if(Defualt >0){
          document.getElementById("MinusBTN").disabled = false;
      }
      // if(Defualt >= 20){
      //     document.getElementById("PlusBTN").disabled = true;
      // }
      TotalAdult();
  }
  function ChildeMinus(n){
      DefualtChilde +=n;
      TotalAdult();
      if(DefualtChilde < 1){
          document.getElementById("MinusChilde").disabled = true;
      }
  
  }
  function ChildePlus(n){
      DefualtChilde +=n;
      if(DefualtChilde >0){
          document.getElementById("MinusChilde").disabled = false;
      }
      TotalAdult();
  }
  function TotalAdult(){
      var Price = 1500;
      var PriceChilde = 1000;
      var TotalChilde = PriceChilde*DefualtChilde;
      var TotalAdult = Price*Defualt;
      var TotalPrice = TotalAdult+TotalChilde + "  THB";
      console.log(TotalAdult);
      console.log(TotalChilde);
      console.log("Total is :" + TotalPrice);
      document.getElementById("ShowNum").innerHTML = Defualt;
      document.getElementById("ShowNum_childe").innerHTML = DefualtChilde;
      // document.getElementById("PriceShow").innerHTML = TotalAdult;
      // document.getElementById("PriceShow_childe").innerHTML = TotalChilde;
      document.getElementById("Total").innerHTML = TotalPrice;
  }

function Nextpage(){
    var Home1 = document.getElementById("page1");
    var Home2 = document.getElementById("page2");
    var Home3 = document.getElementById("page3");
    var HomeNum = document.getElementById("Number1");
    var HomeNum2 = document.getElementById("Number2");
    var HomeNum3 = document.getElementById("Number3");
    // var Select = document.getElementById("selectDay");
    // var Meet = document.getElementById("selectMeet");
    // var Adlut = document.getElementById("Adultnum");
    // var Childe = document.getElementById("Childe");
    if(Home1.style.display == "inline"){
        Home1.style.display = "none";
        Home2.style.display = "inline";
        HomeNum.style.backgroundColor = "#66CDAA";
        HomeNum.style.color = "white"; 
    }else if(Home2.style.display == "inline"){
        Home2.style.display = "none";
        Home3.style.display = "inline";
        HomeNum2.style.backgroundColor = "#66CDAA";
        HomeNum2.style.color = "white";
    }else if(Home3.style.display == "inline" ){
        console.log("confirm");
    }
}
function Backpage(){
    console.log("back now");
    var Home1 = document.getElementById("page1");
    var Home2 = document.getElementById("page2");
    var Home3 = document.getElementById("page3");
    var HomeNum = document.getElementById("Number1");
    var HomeNum2 = document.getElementById("Number2");
    var HomeNum3 = document.getElementById("Number3");
    if(Home1.style.display == "inline"){
        console.log("Back to Info");
        location.href = "../tour.html"
    }else if(Home2.style.display == "inline"){
        Home2.style.display = "none";
        Home1.style.display = "inline";
        HomeNum.style.backgroundColor = "#F3F4F7";
        HomeNum.style.color = "#66CDAA";
    }else if(Home3.style.display == "inline"){
        Home3.style.display = "none";
        Home2.style.display = "inline";
        // HomeNum.style.backgroundColor = "white";
        // HomeNum.style.color = "#66CDAA";
        HomeNum2.style.backgroundColor = "#F3F4F7";
        HomeNum2.style.color = "#66CDAA";
    }
}
// to top

