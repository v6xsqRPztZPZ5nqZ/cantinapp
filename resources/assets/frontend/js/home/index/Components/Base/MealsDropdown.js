import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SET_PRODUCT_ID } from '../../Actions/order';

const mapStateToProps = state => ({
  ...state,
});

const mapDispatchToProps = dispatch => ({
  setProductId: (productId, productKey) => dispatch({
    type: SET_PRODUCT_ID,
    productId,
    productKey,
  }),
});

const MealsDropdown = ({
  label, value, elementKey, setProductId,
}) => (
  <Query
    query={gql`
      {
        meals {
          id name image_path
        }
      }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;

      return (
        // eslint-disable-next-line jsx-a11y/label-has-for
        <label htmlFor={label}>
          {trans('frontend.homepage.this_plate')}
          <select
            className="form-control"
            onChange={(e) => {
              setProductId(Number(e.target.value), elementKey);
            }}
            defaultValue={value}
          >
            {data.meals
              .map(product => (
                <option
                  key={product.id}
                  value={product.id}
                >
                  {product.name}
                </option>
              ))}
            {data.meals.length === 0 && (
              <option>
                {trans('frontend.homepage.no_results')}
              </option>
            )}
          </select>
        </label>
      );
    }}
  </Query>
);

MealsDropdown.propTypes = {
  label: PropTypes.string,
  value: PropTypes.number,
  elementKey: PropTypes.string.isRequired,
  setProductId: PropTypes.func,
};

MealsDropdown.defaultProps = {
  label: 'Meals',
  value: null,
  setProductId: () => (''),
};

export default connect(mapStateToProps, mapDispatchToProps)(MealsDropdown);
