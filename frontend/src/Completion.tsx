import { Link, useSearchParams } from "react-router-dom"

function Completion() {

    const [searchParams] = useSearchParams();

    return <div className="container">
    <div className="row my-5">
        {
            searchParams.get('redirect_status') == "failed" ?
            <div className="col-md-6 mx-auto text-center">
                <h2 className="text-danger">Your Payment Failed</h2>
                <h1>Try Again!</h1>
                <Link to="/" className='btn btn-primary'>Back to Home</Link>
            </div>
            :
            <div className="col-md-6 mx-auto text-center">
                <h2>Your Payment was Successful</h2>
                <h1>Thank you! 🎉</h1>
                <Link to="/" className='btn btn-primary'>Back to Home</Link>
            </div>
        }
       
    </div>
    </div>
  }
  
  export default Completion;