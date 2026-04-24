import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toggleFavorite } from '../../redux/favorites/favoritesSlice';
import {
  StarIcon,
  MapPinIcon,
  HeartIcon,
  TransmissionIcon,
  EngineIcon,
  FormIcon,
  AlcoveIcon
} from '../common/Icons';
import styles from './CamperCard.module.css';

function getFeatureBadges(camper) {
  const badges = [];

  if (camper.engine) {
    badges.push({
      label: camper.engine,
      icon: <EngineIcon />,
    });
  }

  if (camper.transmission === 'automatic') {
    badges.push({
      label: 'Automatic',
      icon: <TransmissionIcon />,
    });
  }

  if (camper.form === 'alcove') {
    badges.push({
      label: 'Alcove',
      icon: <AlcoveIcon />,
    });
  } else if (camper.form) {
    badges.push({
      label: camper.form,
      icon: <FormIcon />,
    });
  }

  return badges.slice(0, 3);
}

export default function CamperCard({ camper }) {
  const dispatch = useDispatch();
  const favorites = useSelector((s) => s.favorites.items);
  const isFav = favorites.some((f) => f.id === camper.id);

  const rating = camper.rating ?? 0;
  const reviewsCount = camper.reviews?.length ?? 0;
  const price = camper.price?.toFixed(2);
  const image = camper.gallery?.[0]?.original || '';

  return (
    <article className={styles.card}>
      
      {/* IMAGE */}
      <div className={styles.imageWrap}>
        <img
          src={image}
          alt={camper.name}
          className={styles.image}
          loading="lazy"
        />

        <button
          className={`${styles.heartBtn} ${isFav ? styles.active : ''}`}
          onClick={() => dispatch(toggleFavorite(camper))}
        >
          <HeartIcon filled={isFav} />
        </button>
      </div>

      {/* CONTENT */}
      <div className={styles.content}>
        
        {/* TOP */}
        <div className={styles.topRow}>
          <h2 className={styles.title}>{camper.name}</h2>
          <span className={styles.price}>€{price}</span>
        </div>

        {/* META */}
        <div className={styles.meta}>
          <span className={styles.rating}>
            <StarIcon filled />
            {rating.toFixed(1)} ({reviewsCount})
          </span>

          <span className={styles.location}>
            <MapPinIcon />
            {camper.location}
          </span>
        </div>

        {/* DESCRIPTION */}
        <p className={styles.desc}>{camper.description}</p>

        {/* BADGES */}
        <div className={styles.badges}>
          {getFeatureBadges(camper).map((b, i) => (
            <span key={i} className={styles.badge}>
              {b.icon}
              {b.label}
            </span>
          ))}
        </div>

        {/* ACTION */}
        <Link
          to={`/catalog/${camper.id}`}
          className={styles.btn}
        >
          Show more
        </Link>
      </div>
    </article>
  );
}