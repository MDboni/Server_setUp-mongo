import React, { useState } from 'react'
import ProductStore from '../../Store/ProductStore'
import DetailsSkeleton from '../../Skeleton/DetailsSkeleton'
import parse from 'html-react-parser';
import ProductImages from './ProductImages';
import Reviews from './Reviews';

const Details = () => {
  const{ ProductDetailsStore }=ProductStore()

  const [quantity,SetQuantity ] = useState(1)

  const incrementQuantity =()=>{
    SetQuantity(quantity=> quantity+1)
  }

   const decrementQuantity=()=>{
        if(quantity>1){
            SetQuantity(quantity=>quantity-1)
        }
    }
  
  if(!ProductDetailsStore || ProductDetailsStore.length === 0 ){
    return <DetailsSkeleton/>
  }else{
    return (
    <div>
        <div className="container mt-2">
          <div className="row">
            <div className="col-md-7 p-3">
              <ProductImages/>
            </div>
            <div className="col-md-5 p-3">
              <h4>{ProductDetailsStore?.[0]?.title}</h4>
              <p className="text-muted bodySmal my-1">Category:{ProductDetailsStore[0].category.categoryName}</p>
              <p className="text-muted bodySmal my-1">Brand:{ProductDetailsStore[0].brand.brandName}</p>
              <p className="bodySmal mb-2 mt-1">{ProductDetailsStore[0].shortDes}</p>
              {
                  ProductDetailsStore[0]['discount']?(
                      <span className="bodyXLarge">Price: <strike class="text-secondary">{ProductDetailsStore[0]['price']}</strike> {ProductDetailsStore[0]['discountPrice']} </span>
                  ):(
                      <span className="bodyXLarge">Price: {ProductDetailsStore[0]['price']}</span>
                  )
               }
          
              <div className="row">
                <div className="col-4 p-2">
                  <label className="bodySmal">Size</label>
                  <select className="form-control my-2 form-select">
                    <option value="">Size</option>
                    {
                      ProductDetailsStore[0].detail?.size?.split(",").map((item,i)=>{
                        return <option key={i} value={item}>{item}</option>
                      })
                    }
                  </select>
                </div>

                <div className="col-4 p-2">
                  <label className="bodySmal">Color</label>
                  <select className="form-control my-2 form-select">
                    <option value="">Color</option>
                    {
                      ProductDetailsStore[0].detail?.color?.split(",").map((item,i)=>{
                        return <option key={i} value={item}>{item}</option>
                      })
                    }
                  </select>
                </div>

                <div className="col-4 p-2">
                  <label className="bodySmal">Quantity</label>
                  <div className="input-group my-2">
                    <button onClick={decrementQuantity} className="btn btn-outline-secondary">-</button>
                    <input
                      type="text"
                      className="form-control bg-light text-center"
                      value={quantity}
                      readOnly
                    />
                    <button onClick={incrementQuantity} className="btn btn-outline-secondary">+</button>
                  </div>
                </div>

                <div className="col-4 p-2">
                  <button className="btn w-100 btn-success">Add to Cart</button>
                </div>

                <div className="col-4 p-2">
                  <button className="btn w-100 btn-success">Add to Wish</button>
                </div>
              </div>
            </div>
          </div>

          <div className="row mt-3">
            {/* Nav Tabs */}
            <ul className="nav nav-tabs" id="myTab" role="tablist">
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link active"
                  id="specs-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#specs-tabpane"
                  type="button"
                  role="tab"
                  aria-controls="specs-tabpane"
                  aria-selected="true"
                >
                  Specifications
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="review-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#review-tabpane"
                  type="button"
                  role="tab"
                  aria-controls="review-tabpane"
                  aria-selected="false"
                >
                  Review
                </button>
              </li>
            </ul>

            {/* Tab Content */}
            <div className="tab-content" id="myTabContent">
              {/* Specifications Tab */}
              <div
                className="tab-pane fade show active p-3"
                id="specs-tabpane"
                role="tabpanel"
                aria-labelledby="specs-tab"
                tabIndex="0"
              >
                {parse(ProductDetailsStore[0].detail.des)}
              </div>

              {/* Review Tab */}
              <div
                className="tab-pane fade p-3"
                id="review-tabpane"
                role="tabpanel"
                aria-labelledby="review-tab"
                tabIndex="0"
              >
                <Reviews />
              </div>
            </div>
          </div>
        </div>
    </div>

  )
  } 
  
}

export default Details