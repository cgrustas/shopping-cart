import { Link } from "react-router";

export default function NavBar() {
  return (
    <nav className="navbar">
      <h2>Nav Bar</h2>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/shop">Shop</Link>
        </li>
        <li>
          <Link to="/cart">Cart</Link>
        </li>
      </ul>
    </nav>
  );
}
