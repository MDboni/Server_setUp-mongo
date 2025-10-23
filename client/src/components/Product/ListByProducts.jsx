
import { Link } from "react-router-dom";
import ProductStore from "../../Store/ProductStore";
import StarRatings from "react-star-ratings";

const ListByProducts = () => {
  const { ProductListByBCK } = ProductStore();

  return (
    <div>
      <div className="container mt-2">
        <div className="row">
            <div className="col-md-3">
              <div className="card w-100 p-3 shadow-sm">
                  <label className="form-label mt-3">Brands</label>
                  <select className="form-control form-select">
                      <option value="">Choose Brand</option>
                  </select>

                  <label className="form-label mt-3">Categories</label>
                  <select className="form-control form-select">
                    <option value="">Choose Category</option>
                  </select>

                  <label className="form-label mt-3">Maximum Price $</label>
                  <input 
                    min={0} 
                    max={100000} 
                    step={1000} 
                    type="range" 
                    className="form-range" 
                  />
                  <input 
                    className="form-range" 
                    min={0} 
                    max={100000} 
                    step={1000} 
                    type="range" 
                  />
              </div>
            </div>

            <div className="col-md-9">
              <div className="container">
                <div className="row">
                  {/* Product List Here */}

                   {ProductListByBCK.map((item) => {
                        // Price logic
                        const price = item.discount === 'true' ? (
                          <p className="bodyMedium text-dark my-1">
                            Price: <strike> ${item.price}</strike> ${item.discount}
                          </p>
                        ) : (
                          <p className="bodyMedium text-dark my-1">Price: ${item.price}</p>
                        );

                        return (
                          <div key={item._id} className="col-md-3 p-2 col-lg-3 col-sm-6 col-12">
                            <Link to={`/By-product/${item._id}`} className="card shadow-sm h-100 rounded-3 bg-white">
                              <img className="w-100 rounded-top-2" src={item.image} alt={item.title} />
                              <div className="card-body">
                                <p className="bodySmal text-secondary my-1">{item.title}</p>
                                {price}
                                <StarRatings
                                  rating={parseFloat(item.star)}
                                  starRatedColor="red"
                                  starDimension="15px"
                                  starSpacing="2px"
                                />
                              </div>
                            </Link>
                          </div>
                        );
                  })}

                </div>
              </div>
            </div>
        </div>
      </div>

    </div>
  );
};

export default ListByProducts;
