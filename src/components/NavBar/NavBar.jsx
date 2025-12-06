import { Link } from "react-router";

export default function NavBar({ numCartItems }) {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/shop">Shop</Link>
        </li>
        <li>
          <Link to="/cart">Cart ({numCartItems})</Link>
        </li>
      </ul>
    </nav>
  );
}
