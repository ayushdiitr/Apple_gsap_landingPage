import { navLinks } from "../constants";

const Navbar = () => {

    return (
        <header>
            <nav>
                <img src="/logo.svg" alt="Apple logo" />

                <ul>
                    {
                        navLinks.map((it) => (
                            <li key={it.label} >
                                <a href={it.href}>{it.label}</a>
                            </li>
                        ))
                    }
                </ul>

                <div className="flex-center gap-3">
                    <button>
                        <img src="/search.svg" alt="search" />
                    </button>
                    <button>
                        <img src="/cart.svg" alt="search" />
                    </button>
                </div>
            </nav>
        </header>
    )
}

export default Navbar;