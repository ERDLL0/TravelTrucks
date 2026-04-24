import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCamperById } from '../../redux/campers/campersSlice';
import { StarIcon, MapPinIcon, TransmissionIcon, EngineIcon, KitchenIcon, ACIcon, AlcoveIcon, BathroomIcon, TVIcon, RadioIcon, FormIcon } from '../../components/common/Icons';
import Loader from '../../components/common/Loader';
import styles from './Detail.module.css';

export default function DetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { current: camper, status } = useSelector((s) => s.campers);
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    dispatch(getCamperById(id));
  }, [dispatch, id]);

  if (status === 'loading' || !camper) return <Loader size="lg" />;

  const badges = [
    { label: camper.transmission ? formatForm(camper.transmission) : 'Automatic', icon: <TransmissionIcon />, show: !!camper.transmission },
    { label: camper.engine ? formatForm(camper.engine) : 'Petrol', icon: <EngineIcon />, show: !!camper.engine },
    { label: 'AC', icon: <ACIcon />, show: camper.AC },
    { label: 'Kitchen', icon: <KitchenIcon />, show: camper.kitchen },
    { label: 'Bathroom', icon: <BathroomIcon />, show: camper.bathroom },
    { label: 'TV', icon: <TVIcon />, show: camper.TV },
    { label: 'Radio', icon: <RadioIcon />, show: camper.radio },
    { label: 'Refrigerator', icon: <KitchenIcon />, show: camper.refrigerator },
    { label: 'Microwave', icon: <KitchenIcon />, show: camper.microwave },
    { label: 'Gas', icon: <EngineIcon />, show: camper.gas },
    { label: 'Water', icon: <BathroomIcon />, show: camper.water },
    { label: camper.form ? formatForm(camper.form) : '', icon: camper.form === 'alcove' ? <AlcoveIcon /> : <FormIcon />, show: !!camper.form },
  ].filter(b => b.show);

  const gallery = camper.gallery || [];

  const handleBooking = (e) => {
    e.preventDefault();
    alert('Thank you for your booking! We will contact you soon.');
    window.location.reload(); // Simple way to clear form and show success
  };

  return (
    <div className={styles.page}>
      <div className={styles.topSection}>
        {/* Left: Gallery */}
        <div className={styles.galleryColumn}>
          <div className={styles.mainImageWrap}>
            <img 
              src={gallery[activeImg]?.original || gallery[activeImg]?.thumb} 
              alt={camper.name} 
              className={styles.mainImage}
            />
          </div>
          <div className={styles.thumbnails}>
            {gallery.map((img, i) => (
              <div 
                key={i} 
                className={`${styles.thumbWrap} ${i === activeImg ? styles.thumbActive : ''}`}
                onClick={() => setActiveImg(i)}
              >
                <img src={img.thumb} alt="" className={styles.thumb} />
              </div>
            ))}
          </div>
        </div>

        {/* Right: Info Cards */}
        <div className={styles.infoColumn}>
          {/* Main Info Card */}
          <div className={styles.card}>
            <h1 className={styles.name}>{camper.name}</h1>
            <div className={styles.meta}>
              <div className={styles.rating}>
                <StarIcon filled />
                <span>{camper.rating}({camper.reviews?.length} Reviews)</span>
              </div>
              <div className={styles.location}>
                <MapPinIcon />
                <span>{camper.location}</span>
              </div>
            </div>
            <div className={styles.price}>€{camper.price?.toFixed(2)}</div>
            <p className={styles.description}>{camper.description}</p>
          </div>

          {/* Vehicle Details Card */}
          <div className={styles.card}>
            <h2 className={styles.sectionTitle}>Vehicle details</h2>
            <div className={styles.badges}>
              {badges.map((b, i) => (
                <div key={i} className={styles.badge}>
                  {b.label}
                </div>
              ))}
            </div>
            <div className={styles.specsTable}>
              <div className={styles.specRow}><span>Form</span> <span>{formatForm(camper.form)}</span></div>
              <div className={styles.specRow}><span>Length</span> <span>{camper.length}</span></div>
              <div className={styles.specRow}><span>Width</span> <span>{camper.width}</span></div>
              <div className={styles.specRow}><span>Height</span> <span>{camper.height}</span></div>
              <div className={styles.specRow}><span>Tank</span> <span>{camper.tank}</span></div>
              <div className={styles.specRow}><span>Consumption</span> <span>{camper.consumption}</span></div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.bottomSection}>
        {/* Reviews Section */}
        <div className={styles.reviewsColumn}>
          <h2 className={styles.sectionTitle}>Reviews</h2>
          <div className={styles.reviewsList}>
            {camper.reviews?.map((r, i) => (
              <div key={i} className={styles.reviewCard}>
                <div className={styles.reviewHeader}>
                  <div className={styles.avatar}>{r.reviewer_name?.charAt(0)}</div>
                  <div className={styles.reviewInfo}>
                    <p className={styles.reviewerName}>{r.reviewer_name}</p>
                    <div className={styles.stars}>
                      {[...Array(5)].map((_, si) => (
                        <StarIcon key={si} filled={si < r.reviewer_rating} />
                      ))}
                    </div>
                  </div>
                </div>
                <p className={styles.reviewComment}>{r.comment}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Booking Card */}
        <div className={`${styles.card} ${styles.bookingCard}`}>
          <h2 className={styles.sectionTitle}>Book your campervan now</h2>
          <p className={styles.formSub}>Stay connected! We are always ready to help you.</p>
          <form className={styles.form} onSubmit={handleBooking}>
            <input type="text" placeholder="Name*" className={styles.input} required />
            <input type="email" placeholder="Email*" className={styles.input} required />
            <button type="submit" className={styles.submitBtn}>Send</button>
          </form>
        </div>
      </div>
    </div>
  );
}

function formatForm(form) {
  if (!form) return '';
  return form.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
}
