import { useRouter } from 'next/router';


function NavBar() {
  const router = useRouter()

  let showDropdown = async (e) => {
    e.preventDefault();
    if (document.getElementsByClassName('dropdown-content')[0].style.display == "none") {
      document.getElementsByClassName('dropdown-content')[0].style.display = "block";
    } else {
      document.getElementsByClassName('dropdown-content')[0].style.display = "none";
    }
  };

  let signOut = async (e) => {
    e.preventDefault();
    router.push('/')
    window.sessionStorage.removeItem("email");
  };

  if (typeof window !== "undefined") {
    // Client-side-only code
    if (typeof window !== undefined && window.sessionStorage.getItem("email") !== null) {
      return (<div>
        <div className="navbar">
          <a id="logo" href="..">FilmMax</a>
          <a id="searchbar"><input type="text" placeholder="Search for movies.."></input></a>
          <a className="navbar-button">MOVIES</a>
          <a className="navbar-button">ABOUT US</a>
          <a id="profile-button" onClick={showDropdown}>Profile ⋮</a>
  
        </div>
        <div className="dropdown-content">
          <div><span style={{ fontWeight: 'bold' }}>{window.sessionStorage.getItem("email")}</span></div>
          <div><span style={{ color: '#eeeeee' }}>Edit Profile</span></div>
          <div className="border-top"><a href="/" onClick={signOut}><span style={{ color: '#eeeeee' }}>Sign Out</span></a></div>
        </div>
      </div>);
    } else {
      return (<div className="navbar">
      <a id="logo" href="..">FilmMax</a>
      <a id="searchbar"><input type="text" placeholder="Search for movies.."></input></a>
      <a className="navbar-button">MOVIES</a>
      <a className="navbar-button">ABOUT US</a>
      <a id="sign-in" href="/login">Sign In</a>
  
    </div>);
    }
  } else {
    return (<div className="navbar">
    <a id="logo" href="..">FilmMax</a>
    <a id="searchbar"><input type="text" placeholder="Search for movies.."></input></a>
    <a className="navbar-button">MOVIES</a>
    <a className="navbar-button">ABOUT US</a>
    <a id="sign-in" href="/login">Sign In</a>

  </div>);
  }



  /*
   if (typeof window == 'undefined') {
     return (<div className="navbar">
       <a id="logo" href="..">FilmMax</a>
       <a id="searchbar"><input type="text" placeholder="Search for movies.."></input></a>
       <a className="navbar-button">MOVIES</a>
       <a className="navbar-button">ABOUT US</a>
       <a id="sign-in" href="/login">Sign In</a>
 
     </div>);
   } else if (typeof window !== 'undefined' && window.sessionStorage.getItem("email") !== 'null') {
     return (<div>
       <div className="navbar">
         <a id="logo" href="..">FilmMax</a>
         <a id="searchbar"><input type="text" placeholder="Search for movies.."></input></a>
         <a className="navbar-button">MOVIES</a>
         <a className="navbar-button">ABOUT US</a>
         <a id="profile-button" onClick={showDropdown}>Profile ⋮</a>
 
       </div>
       <div class="dropdown-content">
           <div><span style={{fontWeight: 'bold'}}>{window.sessionStorage.getItem("email")}</span></div>
           <div><span style={{color: '#eeeeee'}}>Edit Profile</span></div>
           <div class="border-top"><a href="/" onClick={signOut}><span style={{color: '#eeeeee'}}>Sign Out</span></a></div>
         </div>
     </div>);
   } else {
     return (<div className="navbar">
     <a id="logo" href="..">FilmMax</a>
     <a id="searchbar"><input type="text" placeholder="Search for movies.."></input></a>
     <a className="navbar-button">MOVIES</a>
     <a className="navbar-button">ABOUT US</a>
     <a id="sign-in" href="/login">Sign In</a>
 
   </div>
     );
   }*/
}

function NavBarRender(props) {

  /*
function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <UserGreeting />;
  }
  return <GuestGreeting />;
}

ReactDOM.render(
  // Try changing to isLoggedIn={true}:
  <Greeting isLoggedIn={false} />,
  document.getElementById('root')
);
  */


  return (
    <NavBar />
  );
}

export default NavBarRender;