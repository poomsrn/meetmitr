import {
  Box,
  TextField,
  Button,
  Grid,
  Card,
  Modal,
  Slider,
} from "@mui/material";
import DateRangePicker, { DateRange } from "@mui/lab/DateRangePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import Navbar from "../components/Navbar";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { styled } from "@mui/material/styles";
import { useState, Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { TimePicker } from "@mui/lab";
import axios from "axios";

const MySearch = styled(TextField)`
  background-color: white;
  & .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color: #ffd468;
  }
  & label.Mui-focused {
    color: #ffd468;
  }
`;

const MySlider = styled(Slider)`
  color: #ffcc4d;
`;

interface EventPaperProps {
  id: string;
  imageUrl?: string;
  name: string;
  time: string;
  location: string;
}

interface FilterModalProps {
  open: boolean;
  setShowFilterModal: any;
  setFilter: any;
}

const FilterModal: React.FC<FilterModalProps> = (props) => {
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    backgroundColor: "#FAF3E7",
    borderRadius: "10px",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const [dateRange, setDateRange] = useState<DateRange<Date>>([null, null]);
  const [startTime, setStartTime] = useState<Date | null>(new Date());
  const [stopTime, setStopTime] = useState<Date | null>(new Date());
  const [distance, setDistance] = useState<any>(50);

  return (
    <Modal open={props.open}>
      <Box sx={style}>
        <Box>วันที่</Box>
        <Box marginY={2}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateRangePicker
              startText="Check-in"
              endText="Check-out"
              value={dateRange}
              onChange={(newValue) => {
                setDateRange(newValue);
              }}
              renderInput={(startProps, endProps) => (
                <Fragment>
                  <TextField {...startProps} />
                  <Box sx={{ mx: 2 }}> to </Box>
                  <TextField {...endProps} />
                </Fragment>
              )}
            />
          </LocalizationProvider>
        </Box>
        <hr />
        <Box>เวลา</Box>
        <Box display="flex" width="100%">
          <Box marginY={2}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <TimePicker
                label="Start Time"
                value={startTime}
                onChange={(newValue) => {
                  setStartTime(newValue);
                }}
                renderInput={(params) => (
                  <TextField style={{ width: "100%" }} {...params} />
                )}
              />
            </LocalizationProvider>
          </Box>
          <Box display="flex" alignItems="center" mx={2}>
            to
          </Box>
          <Box marginY={2}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <TimePicker
                label="Stop Time"
                value={stopTime}
                onChange={(newValue) => {
                  setStopTime(newValue);
                }}
                renderInput={(params) => (
                  <TextField style={{ width: "100%" }} {...params} />
                )}
              />
            </LocalizationProvider>
          </Box>
        </Box>
        <hr />
        <Box>ระยะทาง</Box>
        <MySlider
          value={distance}
          onChange={(e, newValue) => {
            setDistance(newValue);
          }}
          defaultValue={50}
          aria-label="Default"
          valueLabelDisplay="auto"
        />
        <Box display="flex" justifyContent="space-between">
          <Box>0 KM</Box>
          <Box>100 KM</Box>
        </Box>
        <hr />
        <Box
          marginLeft="55%"
          display="flex"
          width="45%"
          justifyContent="space-between"
        >
          <Button
            variant="contained"
            onClick={() => props.setShowFilterModal(false)}
            style={{ backgroundColor: "#B54040" }}
          >
            Close
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              props.setFilter({
                dateRange: dateRange,
                startTime: startTime,
                stopTime: stopTime,
                distance: distance,
              });
              props.setShowFilterModal(false);
            }}
            style={{ backgroundColor: "#356843" }}
          >
            Apply
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

const EventPaper: React.FC<EventPaperProps> = (props) => {
  let defaultUrl =
    "https://seda.college/blog/wp-content/uploads/2018/06/party.jpg";
  return (
    <Link to={"/event/" + props.id}>
      <Card style={{ height: "300px", cursor: "pointer" }}>
        <Box
          height="70%"
          style={{
            backgroundImage: `url(${props.imageUrl || defaultUrl})`,
            backgroundPosition: "center",
          }}
        ></Box>
        <Box
          display="flex"
          height="10%"
          justifyContent="center"
          alignItems="center"
          fontWeight="bold"
          style={{ backgroundColor: "black", color: "white" }}
        >
          {props.name}
        </Box>
        <Box
          display="flex"
          height="8%"
          justifyContent="center"
          alignItems="center"
          style={{ color: "#C72200" }}
          fontSize={10}
        >
          {props.time.slice(0, 25)}
        </Box>
        <Box
          display="flex"
          height="10%"
          justifyContent="center"
          alignItems="center"
        >
          <LocationOnIcon />
          {props.location}
        </Box>
      </Card>
    </Link>
  );
};

const JoinEventPage: React.FC = () => {
  const [search, setSearch] = useState("");
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filter, setFilter] = useState(null);
  const [event, setEvent] = useState<any>([]);

  const searchHandler = () => {
    axios.get(`http://35.213.155.144:4000/event/${search}`).then((res) => {
      setEvent(res.data);
    });
  };

  useEffect(() => {
    axios.get("http://35.213.155.144:4000/event/ ").then((res) => {
      console.log(res.data);
      setEvent(res.data);
    });
  }, []);

  useEffect(() => {
    console.log("filter", filter);
  }, [filter]);

  return (
    <Box minHeight="100vh" style={{ backgroundColor: "#FAF3E7" }}>
      <FilterModal
        open={showFilterModal}
        setShowFilterModal={setShowFilterModal}
        setFilter={setFilter}
      />
      <Navbar title="Event Feed" home />
      {/* <Box
        display="flex"
        paddingY="10px"
        justifyContent="center"
        alignItems="center"
        height="8vh"
        style={{ background: "linear-gradient(0,#FFD468 0%,#FFC229 100%)" }}
      >
        <Box
          height="100%"
          width="90%"
          display="flex"
          justifyContent="space-between"
        >
          <img src={Logo} alt="logo" height="100%" />
          <Box display="flex" alignItems="center">
            <h1>Event Feed</h1>
          </Box>
          <Box display="flex" alignItems="center" style={{ cursor: "pointer" }}>
            <AddToPhotosIcon fontSize="large" />
          </Box>
        </Box>
      </Box> */}
      <Box display="flex" justifyContent="center">
        <Box
          display="flex"
          width="80%"
          justifyContent="space-between"
          marginY={3}
        >
          {/* <TextField label="Search" size="small"  style={{ width: "90%" }} /> */}
          <MySearch
            label="Search"
            size="small"
            style={{ width: "80%" }}
            onChange={(e) => setSearch(e.target.value)}
          ></MySearch>
          <Button
            variant="contained"
            style={{ backgroundColor: "green", color: "white" }}
            onClick={searchHandler}
          >
            Search
          </Button>
          <Button
            variant="contained"
            style={{ backgroundColor: "black", color: "white" }}
            endIcon={<AddToPhotosIcon />}
            onClick={(e) => setShowFilterModal(true)}
          >
            Filter
          </Button>
        </Box>
      </Box>
      <Box width="90%" marginLeft="5%">
        <Grid container spacing={2}>
          {event.map((e) => {
            return (
              <Grid item xs={3}>
                <EventPaper
                  id={e.eventId}
                  imageUrl={
                    e.imageURL !==
                    "https://images.pexels.com/photos/235922/pexels-photo-235922.jpeg"
                      ? e.imageURL
                      : ""
                  }
                  name={e.name}
                  time={e.takePlace}
                  location={e.province + " " + e.district + " " + e.zipcode}
                />
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Box>
  );
};

export default JoinEventPage;
