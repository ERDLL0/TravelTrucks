import { useDispatch, useSelector } from 'react-redux';
import {
  setLocation,
  setForm,
  setEngine,
  setTransmission,
  toggleEquipment,
  clearFilters,
} from '../../redux/filters/filtersSlice';
import { getCampers, clearCampers } from '../../redux/campers/campersSlice';
import { MapPinIcon, KitchenIcon, ACIcon, TVIcon, BathroomIcon } from '../common/Icons';
import styles from './FilterPanel.module.css';

const FORM_OPTIONS = [
  { value: 'alcove', label: 'Alcove' },
  { value: 'panelTruck', label: 'Panel Van' },
  { value: 'fullyIntegrated', label: 'Integrated' },
  { value: 'semiIntegrated', label: 'Semi Integrated' },
];

const ENGINE_OPTIONS = [
  { value: 'diesel', label: 'Diesel' },
  { value: 'petrol', label: 'Petrol' },
  { value: 'hybrid', label: 'Hybrid' },
  { value: 'electric', label: 'Electric' },
];

const TRANSMISSION_OPTIONS = [
  { value: 'automatic', label: 'Automatic' },
  { value: 'manual', label: 'Manual' },
];

const EQUIPMENT_OPTIONS = [
  { key: 'AC', label: 'AC', icon: <ACIcon /> },
  { key: 'kitchen', label: 'Kitchen', icon: <KitchenIcon /> },
  { key: 'TV', label: 'TV', icon: <TVIcon /> },
  { key: 'bathroom', label: 'Bathroom', icon: <BathroomIcon /> },
];

export default function FilterPanel({ onSearch }) {
  const dispatch = useDispatch();
  const filters = useSelector((s) => s.filters);

  const handleSearch = () => {
    dispatch(clearCampers());

    const params = {
      limit: 4,
      page: 1,
      ...filters,
    };

    dispatch(getCampers(params));
    onSearch && onSearch();
  };

  const handleClear = () => {
    dispatch(clearFilters());
    dispatch(clearCampers());
    dispatch(getCampers({ limit: 4, page: 1 }));
  };

  return (
    <aside className={styles.panel}>
      
      {/* Location */}
      <div className={styles.section}>
        <label className={styles.sectionLabel}>Location</label>
        <div className={styles.inputWrap}>
          <span className={styles.inputIcon}>
            <MapPinIcon />
          </span>
          <input
            className={styles.input}
            type="text"
            placeholder="Kyiv, Ukraine"
            value={filters.location}
            onChange={(e) => dispatch(setLocation(e.target.value))}
          />
        </div>
      </div>

      {/* Filters */}
      <div className={styles.filtersBlock}>
        <p className={styles.filtersLabel}>Filters</p>

        {/* Camper Form */}
        <div className={styles.filterSection}>
          <p className={styles.groupLabel}>Camper form</p>
          <div className={styles.radioGroup}>
            {FORM_OPTIONS.map(({ value, label }) => (
              <label key={value} className={styles.radioLabel}>
                <input
                  type="radio"
                  checked={filters.form === value}
                  onChange={() => dispatch(setForm(value))}
                />
                {label}
              </label>
            ))}
          </div>
        </div>

        {/* Engine */}
        <div className={styles.filterSection}>
          <p className={styles.groupLabel}>Engine</p>
          <div className={styles.radioGroup}>
            {ENGINE_OPTIONS.map(({ value, label }) => (
              <label key={value} className={styles.radioLabel}>
                <input
                  type="radio"
                  checked={filters.engine === value}
                  onChange={() => dispatch(setEngine(value))}
                />
                {label}
              </label>
            ))}
          </div>
        </div>

        {/* Transmission */}
        <div className={styles.filterSection}>
          <p className={styles.groupLabel}>Transmission</p>
          <div className={styles.radioGroup}>
            {TRANSMISSION_OPTIONS.map(({ value, label }) => (
              <label key={value} className={styles.radioLabel}>
                <input
                  type="radio"
                  checked={filters.transmission === value}
                  onChange={() => dispatch(setTransmission(value))}
                />
                {label}
              </label>
            ))}
          </div>
        </div>

        {/* Equipment */}
        <div className={styles.filterSection}>
          <p className={styles.groupLabel}>Vehicle equipment</p>
          <div className={styles.equipmentGrid}>
            {EQUIPMENT_OPTIONS.map(({ key, label, icon }) => (
              <button
                key={key}
                className={`${styles.equipBtn} ${filters[key] ? styles.equipActive : ''}`}
                onClick={() => dispatch(toggleEquipment(key))}
              >
                {icon}
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className={styles.actions}>
        <button className={styles.searchBtn} onClick={handleSearch}>
          Search
        </button>
        <button className={styles.clearBtn} onClick={handleClear}>
          <span>✕</span> Clear filters
        </button>
      </div>
    </aside>
  );
}