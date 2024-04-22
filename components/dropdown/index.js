const Dropdown = ({ data, client, setClient }) => {
  return (
    <div className="mt-4 ml-4 dropdown dropdown-hover">
      <div tabIndex="0" className="m-1 text-white btn btn-info">
        {client}
      </div>
      <ul
        tabIndex="0"
        className="p-2 bg-black shadow menu dropdown-content rounded-box w-52"
      >
        {data.map((item) => (
          <li
            key={item.id}
            className="text-white hover:bg-blue-500 hover:rounded-lg"
            onClick={(event) => setClient(event.target.text)}
          >
            <a>{item.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
