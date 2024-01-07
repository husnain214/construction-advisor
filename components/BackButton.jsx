import { ArrowBackIcon } from '@/public';

const BackButton = () => {
  return (
    <button
      onClick={() => history.back()}
      className="border p-4 rounded-full bg-gray-50 justify-self-start self-center"
    >
      <ArrowBackIcon className="text-primary" />
    </button>
  );
};

export default BackButton;
