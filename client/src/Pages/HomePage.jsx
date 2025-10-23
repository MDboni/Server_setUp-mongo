
import Layoutt from "../components/Layout/Layoutt"
import BrandsSkeleton from "../Skeleton/BrandsSkeleton"
import CategoriesSkeleton from "../Skeleton/CategoriesSkeleton"
import FeatersSkeleton from "../Skeleton/FeatersSkeleton"
import ProductSkeleton from "../Skeleton/ProductSkeleton"
import SliderSkeleton from "../Skeleton/SliderSkeleton"

const HomePage = () => {
  return (
    <Layoutt>
       <SliderSkeleton/>
       <FeatersSkeleton/>
       <CategoriesSkeleton/>
       <ProductSkeleton/>
       <BrandsSkeleton/>
    </Layoutt>
  )
}

export default HomePage