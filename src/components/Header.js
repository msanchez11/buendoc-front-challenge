import Logo from '../assets/images/logo.png';
import '../styles/Header.css';

function Header() {
  return (
    <div className="header_container">
      <span className="header-title">Profesionales</span>
      <img src={Logo} alt="Logo" />
    </div>
  )
}

export default Header;