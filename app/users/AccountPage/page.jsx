const AccountPage = () => {
  return (
    <>
      <div>
        <header>
          <h1 className="text-3xl font-bold text-left px-10 py-10">
            Manage Your Account
          </h1>
          <h2 className="text-2xl font-bold text-left px-10 py-5">
            Change Your Password
          </h2>
        </header>

        <div className=" grid grid-cols-1">
          <label className=" px-10 py-2 text-left">Old Password:</label>
          <input
            className="rounded-md max-w-xs ml-10 mt-5 py-2 px-10 border-2 border-slate-500"
            type="password"
            name="<PASSWORD>"
          />

          <label className="px-10 mt-5 py-2 text-left">New Password:</label>

          <input
            className="rounded-md max-w-xs ml-10 mt-5 py-2 border-2 border-slate-500"
            type="password"
            name="<PASSWORD>"
          />

          <button
            type="submit"
            className="bg-primary hover:bg-red-400 transition-all text-white rounded-full
            max-w-fit px-5 py-5 ml-10 mt-12 text-center"
          >
            Submit
          </button>

          <button
            type="submit"
            className=" bg-red-700 hover:bg-red-400 transition-all text-white rounded-full max-w-xs py-5 mt-20 ml-10"
          >
            Delete Your Account
          </button>
        </div>
      </div>
    </>
  );
};

export default AccountPage;
