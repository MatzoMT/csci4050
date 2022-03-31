import { useRouter } from 'next/router';


export default function AdminNavBar() {

  const router = useRouter()

  let signOut = async (e) => {
    e.preventDefault();
    router.push('/')
    window.sessionStorage.removeItem("email");
    window.sessionStorage.removeItem("isAdmin");
  };

    return         <div className="navbar">
    <a id="admin-logo">FilmMax Admin</a>
    <a className="navbar-button">MOVIE MANAGER</a>
    <a className="navbar-button">USERS</a>
    <a className="navbar-button">PROMOTIONS</a>
    <div><a href="/" onClick={signOut}><span style={{ color: '#eeeeee' }}>Sign Out</span></a></div>

  </div>
  }