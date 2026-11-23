import PropTypes from 'prop-types';
import './SelectAll.css';

const SelectAll = ({
  totalCount,
  selectedCount,
  onToggleSelectAll,
  onMarkComplete,
  onDeleteSelected,
}) => {
  const isSelectAll = selectedCount === totalCount && totalCount > 0;
  const hasSelection = selectedCount > 0;

  return (
    <div
      className="select-all-bar"
      role="region"
      aria-label="Bulk task actions"
    >
      <div className="select-all-left">
        <label className="select-all-label">
          <input
            type="checkbox"
            className="select-all-checkbox"
            checked={isSelectAll}
            onChange={onToggleSelectAll}
            disabled={totalCount === 0}
          />
          <span className="select-all-text">Select All</span>
        </label>
        <span className="selected-count">{selectedCount} selected</span>
      </div>

      <div className="select-all-actions">
        <button
          className="mark-complete-button"
          onClick={onMarkComplete}
          disabled={!hasSelection}
        >
          Mark Complete
        </button>
        <button
          className="delete-selected-button"
          onClick={onDeleteSelected}
          disabled={!hasSelection}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

SelectAll.propTypes = {
  totalCount: PropTypes.number.isRequired,
  selectedCount: PropTypes.number.isRequired,
  onToggleSelectAll: PropTypes.func.isRequired,
  onMarkComplete: PropTypes.func.isRequired,
  onDeleteSelected: PropTypes.func.isRequired,
};

export default SelectAll;
