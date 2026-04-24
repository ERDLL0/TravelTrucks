import styles from './Header.module.css';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useRef, useEffect } from 'react';
import { HeartIcon } from './Icons';
import { toggleFavorite } from '../../redux/favorites/favoritesSlice';

export default function Header() {
  const favorites = useSelector((s) => s.favorites.items);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <NavLink to="/" className={styles.logo}>
          <span className={styles.logoTravel}><strong>Travel</strong></span>
          <span className={styles.logoTrucks}><strong>Trucks</strong></span>
        </NavLink>
        <nav className={styles.nav}>
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/catalog"
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            Catalog
          </NavLink>
        </nav>
        <div className={styles.favoritesSection} ref={dropdownRef}>
          <button 
            className={styles.favoritesBtn} 
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Favorites"
          >
            <HeartIcon filled={favorites.length > 0} />
            {favorites.length > 0 && <span className={styles.favoritesCount}>{favorites.length}</span>}
          </button>
          
          {isOpen && (
            <div className={styles.favoritesDropdown}>
              <h3 className={styles.dropdownTitle}>Favorites</h3>
              {favorites.length === 0 ? (
                <p className={styles.emptyFavs}>No favorites yet.</p>
              ) : (
                <ul className={styles.favList}>
                  {favorites.map(camper => (
                    <li key={camper.id} className={styles.favItem}>
                      <img 
                        src={camper.gallery?.[0]?.thumb || camper.gallery?.[0]?.original || ''} 
                        alt={camper.name} 
                        className={styles.favImg} 
                      />
                      <div className={styles.favInfo}>
                        <span className={styles.favName}>{camper.name}</span>
                        <span className={styles.favPrice}>€{camper.price?.toFixed(2)}</span>
                      </div>
                      <button 
                        className={styles.favRemoveBtn}
                        onClick={() => dispatch(toggleFavorite(camper))}
                        aria-label="Remove favorite"
                      >
                        ✕
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
