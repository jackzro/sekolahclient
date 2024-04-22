import { DateRange } from "react-date-range";

function Datedown({ state, onHandleSubmit }) {
  return (
    <div className="dropdown dropdown-hover">
      <div tabIndex="0" className="m-1 text-white btn btn-info">
        select date
      </div>
      <ul tabIndex="0" className="p-2 shadow menu dropdown-content rounded-box">
        <DateRange
          editableDateInputs={true}
          onChange={onHandleSubmit}
          moveRangeOnFirstSelection={false}
          ranges={state}
        />
      </ul>
    </div>
  );
}

export default Datedown;
