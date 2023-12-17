import { Oval } from 'react-loader-spinner';

const Button = ({ type, loading, onClick, style, children }) => {
  return (
    <button
      onClick={onClick}
      type={type || 'button'}
      className={`bg-primary hover:bg-red-400 transition-all text-white rounded-full py-3 px-6 justify-self-center flex justify-center items-center gap-3 ${style}`}
    >
      <Oval
        height={20}
        width={20}
        color="#ffff"
        wrapperStyle={{}}
        wrapperClass=""
        visible={loading}
        ariaLabel="oval-loading"
        secondaryColor="#EE6338"
        strokeWidth={4}
        strokeWidthSecondary={4}
      />
      {children}
    </button>
  );
};

export default Button;
