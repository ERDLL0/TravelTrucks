import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCampers, loadMoreCampers } from '../../redux/campers/campersSlice';
import CamperCard from '../../components/catalog/CamperCard';
import FilterPanel from '../../components/catalog/FilterPanel';
import Loader from '../../components/common/Loader';
import styles from './Catalog.module.css';

const PAGE_SIZE = 4;

export default function CatalogPage() {
  const dispatch = useDispatch();
  const { items, hasMore, status, loadMoreStatus } = useSelector((s) => s.campers);
  const filters = useSelector((s) => s.filters);

  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    dispatch(getCampers({ limit: PAGE_SIZE, page: 1 }));
  }, [dispatch]);

  const handleSearch = () => {
    setPage(1);
    const params = buildParams(filters, 1, PAGE_SIZE);
    dispatch(getCampers(params));
    setShowFilters(false);
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    const params = buildParams(filters, nextPage, PAGE_SIZE);
    dispatch(loadMoreCampers(params));
  };

  return (
    <div className={styles.page}>
      <div className={styles.inner}>

        {/* MOBILE FILTER BUTTON */}
        <button
          className={styles.filterToggle}
          onClick={() => setShowFilters(true)}
        >
          Filters
        </button>

        {/* DESKTOP FILTER */}
        <aside className={styles.filterDesktop}>
          <FilterPanel onSearch={handleSearch} />
        </aside>

        {/* MOBILE DRAWER */}
        {showFilters && (
          <div className={styles.filterDrawer}>
            <div className={styles.drawerHeader}>
              <h3>Filters</h3>
              <button onClick={() => setShowFilters(false)}>✕</button>
            </div>

            <FilterPanel onSearch={handleSearch} />

            <button
              className={styles.applyBtn}
              onClick={handleSearch}
            >
              Apply Filters
            </button>
          </div>
        )}

        {/* MAIN */}
        <main className={styles.main}>
          {status === 'loading' && items.length === 0 ? (
            <Loader size="lg" />
          ) : status === 'failed' ? (
            <div className={styles.error}>
              <p>Failed to load campers.</p>
              <button
                className={styles.retryBtn}
                onClick={() => dispatch(getCampers({ limit: PAGE_SIZE, page: 1 }))}
              >
                Retry
              </button>
            </div>
          ) : items.length === 0 ? (
            <div className={styles.empty}>
              <span>🚐</span>
              <p>No campers found</p>
            </div>
          ) : (
            <>
              <div className={styles.list}>
                {items.map((camper) => (
                  <CamperCard key={camper.id} camper={camper} />
                ))}
              </div>

              {loadMoreStatus === 'loading' && (
                <div className={styles.loadMoreLoader}>
                  <Loader size="md" />
                </div>
              )}

              {hasMore && loadMoreStatus !== 'loading' && (
                <div className={styles.loadMoreWrap}>
                  <button
                    className={styles.loadMoreBtn}
                    onClick={handleLoadMore}
                  >
                    Load more
                  </button>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}

/* PARAM BUILDER */
function buildParams(filters, page, limit) {
  const params = { page, limit };

  if (filters.location) params.location = filters.location;
  if (filters.form) params.form = filters.form;
  if (filters.engine) params.engine = filters.engine;
  if (filters.transmission) params.transmission = filters.transmission;

  [
    'AC',
    'bathroom',
    'kitchen',
    'TV',
    'radio',
    'refrigerator',
    'microwave',
    'gas',
    'water',
  ].forEach((key) => {
    if (filters[key]) params[key] = true;
  });

  return params;
}