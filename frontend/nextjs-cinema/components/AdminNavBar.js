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
    <a href="/admin-moviemanager" className="navbar-button">MOVIE MANAGER</a>
    <a className="navbar-button">USERS</a>
    <a href="/admin-promotions" className="navbar-button">PROMOTIONS</a>
    <div><a href="/"  id="admin-sign-out" onClick={signOut}>Sign Out</a></div>

  </div>
  }