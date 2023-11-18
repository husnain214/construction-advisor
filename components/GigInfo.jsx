function GigInfo() {
  const Information = [
    {
      id: '#Rt5643',
      siteName: 'School Wall Construction',
      contractor: 'Dustin',
      amount: 1090.34,
      status: 'Pending',
    },
    {
      id: '#Rt6753',
      siteName: 'School Roof Construction',
      contractor: 'Lucas',
      amount: 1090.34,
      status: 'Pending',
    },
    {
      id: '#Rt9093',
      siteName: 'Office Wall Construction',
      contractor: 'Mike',
      amount: 1090.34,
      status: 'Pending',
    },
    {
      id: '#Rt5653',
      siteName: 'Hotel Floor Construction',
      contractor: 'Will',
      amount: 1090.34,
      status: 'Pending',
    },
  ];

  const constructionInfo = Information.map((info) => (
    <div
      key={info.id}
      className="flex justify-around mt-9 font-semibold text-sm text-sky-950 bg-slate-200 rounded-lg py-5"
    >
      <div className="flex items-center">{info.id}</div>
      <div className="flex items-center text-slate-500 text-xs">
        {info.siteName}
      </div>
      <div className="flex items-center text-slate-500 text-xs">
        {info.contractor}
      </div>
      <div className="flex items-center">${info.amount}</div>
      <div className="flex items-center text-orange-400 bg-amber-100 rounded-lg px-4 py-2">
        <div className="mr-2 text-lg">•</div>
        {info.status}
      </div>
    </div>
  ));
  return (
    <div>
      <div className="flex justify-around mt-12 font-semibold  text-sky-950 text-sm">
        <div className="">ID</div>
        <div className="">Construction Name</div>
        <div className="">Contractor</div>
        <div className="">Amount</div>
        <div className="">Status</div>
      </div>
      <div>{constructionInfo}</div>
    </div>
  );
}

export default GigInfo;
