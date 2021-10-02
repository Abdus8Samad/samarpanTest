// Promise Wrapper For Suspense Functionality

const wrapPromise = (promise) =>{
    let status = "pending";
    let response;
    // Handling when to suspend the promise
    const suspender = promise.then(
        (res) =>{
            status = "success";
            response = res;
        },
        (err) =>{
            status = "error";
            response = err;
        }
    )
    // Function to decide whether to suspend or recheck
    const read = () =>{
        switch(status){
            case "success":
                // Will return response so Suspense will render the original component other than fallback
                return response;
            case "pending":
                // Will throw promise so Suspense will take it as data loading is in progress
                throw suspender;
            default:
                // Error Case will trigger error action in Suspense
                throw response
        }
    }
    return { read };
}

export default wrapPromise;