import { useState } from 'react';
import { Button } from '.';
import bidService from '@/services/bidService';
import { useDispatch, useSelector } from 'react-redux';
import { activateJob, initializeJobs } from '@/redux/reducers/jobReducer';
import { acceptBid, initializeBids } from '@/redux/reducers/bidReducer';
import { getUser, newContact } from '@/redux/reducers/userReducer';
import { useRouter } from 'next/navigation';

const Bid = ({ bid }) => {
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  const [creating, setCreating] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const inContacts = user.contacts.find(
    (contact) => contact === bid?.contractorId,
  );
  const handleOnClick = async () => {
    setSubmitting(true);

    try {
      const { updatedJob, updatedBid } = await bidService.acceptBid(bid.id);
      await dispatch(acceptBid(updatedBid));
      await dispatch(activateJob(updatedJob));
      await dispatch(initializeJobs());
      await dispatch(initializeBids());
    } catch (error) {
      console.error(error);
    }

    setSubmitting(false);
  };

  const createChat = async () => {
    setCreating(true);
    try {
      await dispatch(newContact({ id: bid.contractorId }));
      await dispatch(getUser());
      router.push('/users/ChatPage');
    } catch (error) {
      console.error(error);
    }
    setCreating(false);
  };

  return (
    <li className="flex rounded-full gap-10 justify-center items-center bg-primary bg-opacity-20 py-5 px-7">
      <h3 className="font-bold text-xl">${bid.amount}</h3>
      {!inContacts && (
        <Button loading={creating} onClick={createChat}>
          Add to contacts
        </Button>
      )}

      {!bid.successful && (
        <Button type={'buttton'} loading={submitting} onClick={handleOnClick}>
          Accept
        </Button>
      )}
    </li>
  );
};

export default Bid;
