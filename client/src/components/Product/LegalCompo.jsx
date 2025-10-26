import LegalContentSkeleton from '../../Skeleton/LegalContentSkeleton';
import FeatureStoreZustin from '../../Store/FetereStore'
import parse from "html-react-parser";

const LegalCompo = () => {
    const { LegalDetailsStore } =FeatureStoreZustin()
    

  if(LegalDetailsStore===null){
        return <LegalContentSkeleton/>
    }
    else{
        return (
            <div className="container mt-3">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card p-4">
                            {parse(LegalDetailsStore['description'])}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LegalCompo