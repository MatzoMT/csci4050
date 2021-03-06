import { useRouter } from 'next/router';
import AdminNavBar from './AdminNavBar';


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
    if (typeof window !== undefined && window.sessionStorage.getItem("isAdmin") == "true") {
      return (
        <AdminNavBar />
      );
    } else if (typeof window !== undefined && window.sessionStorage.getItem("email") !== null) {
      return (<div>
        <div className="navbar">
          <a id="logo" href="..">FilmMax</a>
          <a className="navbar-button" href="/movies">MOVIES</a>
          <a className="navbar-button">ABOUT US</a>
          <a id="profile-button" onClick={showDropdown}>Profile ⋮</a>
  
        </div>
        <div className="dropdown-content">
          <div><span style={{ fontWeight: 'bold' }}>{window.sessionStorage.getItem("email")}</span></div>
          <div><a href="/editprofile"><span style={{ color: '#eeeeee' }}>Edit Profile</span></a></div>
          <div className="border-top"><a href="/" onClick={signOut}><span style={{ color: '#eeeeee' }}>Sign Out</span></a></div>
        </div>
      </div>);
    } else {
      return (<div className="navbar">
      <a id="logo" href="..">FilmMax</a>
      <a className="navbar-button" href="/movies">MOVIES</a>
      <a className="navbar-button">ABOUT US</a>
      <a id="sign-in" href="/login">Sign In</a>
  
    </div>);
    }
  } else {
    return (<div className="navbar">
    <a id="logo" href="..">FilmMax</a>
    <a className="navbar-button" href="/movies">MOVIES</a>
    <a className="navbar-button">ABOUT US</a>
    <a id="sign-in" href="/login">Sign In</a>

  </div>);
  }

}

function NavBarRender(props) {
  return (
    <NavBar />
  );
}

export default NavBarRender;