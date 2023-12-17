import { ArrowBackIcon } from '@/public';

const BackButton = () => {
  return (
    <button onClick={() => history.back()} className="border">
      <ArrowBackIcon />
    </button>
  );
};

export default BackButton;
