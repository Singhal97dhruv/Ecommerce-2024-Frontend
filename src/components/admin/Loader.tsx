import { Triangle } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="mainLoader">
      <Triangle
        visible={true}
        height="100%"
        width="100%"
        
        color="#353b48"
        ariaLabel="triangle-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
      <h1>Loading...</h1>
    </div>
  );
};

export default Loader;
