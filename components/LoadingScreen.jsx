import { Oval } from 'react-loader-spinner';

const LoadingScreen = () => {
  return (
    <div className="grid place-items-center">
      <Oval
        height={50}
        width={50}
        color="#EE6338"
        wrapperStyle={{}}
        wrapperClass=""
        ariaLabel="oval-loading"
        secondaryColor="#ccc"
        strokeWidth={5}
        strokeWidthSecondary={5}
      />
    </div>
  );
};

export default LoadingScreen;
