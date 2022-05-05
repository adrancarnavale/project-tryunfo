import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Filters extends Component {
  render() {
    const { setFilterStates, nameFilter, rareFilter, trunfoFilter } = this.props;

    return (
      <div>
        <div className="name-filter-input">
          <label htmlFor="name-filter">
            Filtro por Nome:
            <input
              data-testid="name-filter"
              name="nameFilter"
              type="text"
              id="name-filter"
              value={ nameFilter }
              onChange={ setFilterStates }
            />
          </label>
        </div>
        <div className="rare-filter-input">
          <label htmlFor="rare-filter">
            Filtro por raridade:
            <select
              data-testid="rare-filter"
              name="rareFilter"
              id="rare-filter"
              value={ rareFilter }
              onChange={ setFilterStates }
            >
              <option value="todas">Todas</option>
              <option value="normal">Normal</option>
              <option value="raro">Raro</option>
              <option value="muito raro">Muito Raro</option>
            </select>
          </label>
        </div>
        <div className="trunfo-filter-input">
          <label htmlFor="trunfo-filter">
            Super Trunfo:
            <input
              data-testid="trunfo-filter"
              name="trunfoFilter"
              id="trunfo-filter"
              type="checkbox"
              checked={ trunfoFilter }
              onChange={ setFilterStates }
            />
          </label>
        </div>
      </div>
    );
  }
}

Filters.propTypes = {
  setFilterStates: PropTypes.func.isRequired,
  nameFilter: PropTypes.string.isRequired,
  rareFilter: PropTypes.string.isRequired,
  trunfoFilter: PropTypes.bool.isRequired,
};

export default Filters;
