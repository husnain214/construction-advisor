import { useState } from 'react';
import { Button } from '.';
import bidService from '@/services/bidService';
import { useDispatch, useSelector } from 'react-redux';
import { activateJob, initializeJobs } from '@/redux/reducers/jobReducer';
import { acceptBid, initializeBids } from '@/redux/reducers/bidReducer';
import { newContact } from '@/redux/reducers/userReducer';

const Bid = ({ bid }) => {
  const [submitting, setSubmitting] = useState(false);
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

  const createChat = () => {
    try {
      dispatch(newContact({ id: bid.contractorId }));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex gap-3 justify-start items-center">
      <h1>${bid.amount}</h1>
      {!inContacts && (
        <button className="bg-primary" onClick={() => createChat()}>
          Add to contacts
        </button>
      )}

      {!bid.successful && (
        <Button type={'buttton'} loading={submitting} onClick={handleOnClick}>
          Accept
        </Button>
      )}
    </div>
  );
};

export default Bid;
