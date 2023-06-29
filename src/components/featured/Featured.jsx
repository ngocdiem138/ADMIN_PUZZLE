import "./featured.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import statisticService from "../../services/statisticService";
import moment from 'moment'
import { useState } from "react";
import { useEffect } from "react";

const Featured = () => {
  const date = new Date()
  const timeNow = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
  const dateNow = moment(new Date()).format('YYYY-MM-DD 00:00:00')
  const lastWeek = moment(new Date(date.getFullYear(), date.getMonth(), date.getDate() - 7)).format('YYYY-MM-DD 00:00:00')
  const firstDayCurrentMonth = moment(new Date(date.getFullYear(), date.getMonth(), 1)).format('YYYY-MM-DD 00:00:00');
  const firstDayPreviousMonth = moment(new Date(date.getFullYear(), date.getMonth() - 1, 1)).format('YYYY-MM-DD 00:00:00');
  const lastDayPreviousMonth = moment(new Date(date.getFullYear(), date.getMonth(), 0)).format('YYYY-MM-DD 23:59:59');

  const [totalSaleToday, setTotalSaleToday] = useState(0);
  const [totalSaleLastWeek, setTotalSaleLastWeek] = useState(0);

  const [totalSaleLastMonth, setTotalSaleLastMonth] = useState(0);
  const [totalSaleCurrentMonth, setTotalSaleCurrentMonth] = useState(0);
  useEffect(() => {
    statisticService.getTotalRevenueByTime({
      "startTime": dateNow,
      "endTime": timeNow
    }).then((res) => {
      setTotalSaleToday(res.data.data);
    });
    statisticService.getTotalRevenueByTime({
      "startTime": firstDayPreviousMonth,
      "endTime": lastDayPreviousMonth
    }).then((res) => {
      setTotalSaleLastMonth(res.data.data);
    });
    statisticService.getTotalRevenueByTime({
      "startTime": lastWeek,
      "endTime": timeNow
    }).then((res) => {
      setTotalSaleLastWeek(res.data.data);
    });
    statisticService.getTotalRevenueByTime({
      "startTime": firstDayCurrentMonth,
      "endTime": timeNow
    }).then((res) => {
      setTotalSaleCurrentMonth(res.data.data);
    });
  })
  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">Total Revenue</h1>
        <MoreVertIcon fontSize="small" />
      </div>
      <div className="bottom">
        <div className="featuredChart">
          <CircularProgressbar value={totalSaleLastMonth ? (totalSaleCurrentMonth/totalSaleLastMonth)*100 : 0} text={parseFloat(totalSaleLastMonth ? (totalSaleCurrentMonth/totalSaleLastMonth)*100 : 0).toFixed(2)+"%"} strokeWidth={5} />
        </div>
        <p className="title">Total sales made today</p>
        <p className="amount">${totalSaleToday}</p>
        <p className="desc">
          Previous transactions processing. Last payments may not be included.
        </p>
        <div className="summary">
          <div className="item">
            <div className="itemTitle">Current Month</div>
            {/* <div className="itemResult negative"> */}
            {/* <KeyboardArrowDownIcon fontSize="small" /> */}
            <div className="itemResult positive">
              <div className="resultAmount">${totalSaleCurrentMonth}</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Last Week</div>
            <div className="itemResult positive">
              {/* <KeyboardArrowUpOutlinedIcon fontSize="small" /> */}
              <div className="resultAmount">${totalSaleLastWeek}</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Last Month</div>
            <div className="itemResult positive">
              {/* <div className={totalSaleCurrentMonth - totalSaleLastMonth >= 0 ? "itemResult positive" : "itemResult negative"}> */}
              {/* <KeyboardArrowUpOutlinedIcon fontSize="small" /> */}
              <div className="resultAmount">${totalSaleLastMonth}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
