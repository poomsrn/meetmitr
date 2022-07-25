import {
  Box,
  Avatar,
  Button,
  ButtonGroup,
  Modal,
  Paper,
  TextField,
} from "@mui/material";
import Navbar from "../components/Navbar";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddIcon from "@mui/icons-material/Add";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useUserInfo } from "../context/UserInfoProvider";

interface UserProfileModalProps {
  open: boolean;
  setOpen: any;
  id?: string;
  name?: string;
}

const UserProfileModal: React.FC<UserProfileModalProps> = (props) => {
  const { state } = useUserInfo();
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const [added, setAdded] = useState<boolean>(false);
  const [reason, setReason] = useState<string>("");

  const reportHandler = () => {
    axios
      .post("http://35.213.155.144:4000/report", {
        userId: state.userId,
        reason: reason,
        reportedUserId: props.id,
      })
      .then((res) => {
        console.log(res);
        props.setOpen(false);
      });
  };

  const addFriendHandler = () => {
    setAdded(true);
    axios
      .post("http://35.213.155.144:4000/addFriend", {
        userId: state.userId,
        friendId: props.id,
      })
      .then((res) => console.log(res));
  };

  return (
    <Modal open={props.open}>
      <Box sx={style}>
        <Box
          sx={{ cursor: "pointer" }}
          onClick={() => props.setOpen(false)}
          display="flex"
          justifyContent="right"
        >
          <CloseIcon />
        </Box>
        <Box display="flex" justifyContent="center">
          <Avatar sx={{ width: "100px", height: "100px" }}>J</Avatar>
        </Box>
        <Box marginTop="5%" display="flex" justifyContent="center">
          {props.name}
        </Box>
        <Box marginTop="5%" color="gray" display="flex" justifyContent="center">
          {props.id}
        </Box>

        <Box marginTop="5%" display="flex" justifyContent="center">
          <Button
            color="success"
            variant="contained"
            disabled={added}
            onClick={addFriendHandler}
          >
            {added ? "Friend Added" : "Add Friend"}
          </Button>
        </Box>
        <Divider />
        <Box
          fontSize={30}
          textAlign="center"
          width="100%"
          style={{ marginBottom: "10px" }}
        >
          Report
        </Box>
        <TextField
          onChange={(e) => setReason(e.target.value)}
          label="Reason"
          color="error"
          style={{ width: "100%" }}
        />
        <Box marginTop="15px" display="flex" justifyContent="right">
          <Button onClick={reportHandler} color="error" variant="contained">
            Send Report
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

interface EventPageProps {
  name: string;
}

const Divider: React.FC = () => {
  return (
    <Box
      marginY="20px"
      height="2px"
      width="100%"
      style={{ backgroundColor: "gray" }}
    />
  );
};

interface UserPaperProps {
  id: string;
  name: string;
}

const UserPaper: React.FC<UserPaperProps> = (props) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <UserProfileModal
        name={props.name}
        id={props.id}
        open={showModal}
        setOpen={setShowModal}
      />
      <Paper
        onClick={() => setShowModal(true)}
        style={{
          width: "50%",
          marginBottom: "10px",
          marginLeft: "25%",
          height: "30px",
        }}
      >
        <Box
          display="flex"
          height="100%"
          justifyContent="center"
          alignItems="center"
        >
          {props.name}
        </Box>
      </Paper>
    </>
  );
};

const EventPage: React.FC<EventPageProps> = (props) => {
  const [imageIdx, setImageIdx] = useState<number>(1);
  const [tag, setTag] = useState<string>("About");
  const [joinedUser, setJoinedUser] = useState([]);
  const [joined, setJoined] = useState<boolean>(false);
  const [event, setEvent] = useState<any>({});
  const { state } = useUserInfo();
  const id = useParams().id;

  useEffect(() => {
    axios.get("http://35.213.155.144:4000/eventInfo/" + id).then((res) => {
      let x = res.data[0];
      setEvent(x);
    });
    console.log(id);
    axios
      .post("http://35.213.155.144:4000/query", {
        sql: `SELECT * FROM UserJoinEvent NATURAL JOIN User WHERE eventId="${id}" AND status > 0 ;`,
      })
      .then((res) => {
        console.log(res);
        setJoinedUser(res.data);
        for (let i = 0; i < res.data.length; i++) {
          console.log(res.data[i].userId, state.userId);
          if (res.data[i].userId === state.userId) {
            setJoined(true);
          }
        }
      });
  }, []);

  const joinHandler = () => {
    setJoined(!joined);
    axios
      .post("http://35.213.155.144:4000/eventInfo/", {
        userId: state.userId,
        eventId: id,
      })
      .then((res) => console.log(res));
  };

  return (
    <Box minHeight="100vh" style={{ backgroundColor: "#FAF3E7" }}>
      <Navbar title={event.name} />
      <Box display="flex">
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          width="50%"
          minHeight="100vh"
          style={{
            backgroundImage: `url(${event.imageURL})`,
            //backgroundImage: `url(${process.env.PUBLIC_URL + '/image.png'})` ,
            backgroundSize: "cover",
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <Box width="98%" display="flex" justifyContent="space-between">
            <Button
              onClick={() => setImageIdx(Math.max(imageIdx - 1, 0))}
              style={{ backgroundColor: "black", color: "white" }}
            >
              <ArrowLeftIcon />
            </Button>
            <Button
              onClick={() => setImageIdx(Math.min(imageIdx + 1, 0))}
              style={{ backgroundColor: "black", color: "white" }}
            >
              <ArrowRightIcon />
            </Button>
          </Box>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          width="50%"
          paddingX="5%"
          paddingY="3%"
        >
          <Box display="flex">
            <Box width="40%" textAlign="center">
              <Box fontSize={40} fontWeight="bold">
                วิ่งแบบพี่ตูน
              </Box>
              <Box marginTop="5px" color="#C72200" fontWeight="bold">
                Sat 06 November
              </Box>
            </Box>
            <Box width="50%" marginTop="10px" display="flex">
              <Box
                width="2px"
                height="100%"
                style={{ backgroundColor: "gray" }}
              />
              <Box marginX="10px">
                <Avatar
                  alt="Pattarapong Sritong"
                  sx={{ width: "50px", height: "50px", top: "10px" }}
                  src={`https://scontent.fbkk12-4.fna.fbcdn.net/v/t1.18169-9/13178029_831779600288403_4886563183669817073_n.jpg?_nc_cat=109&ccb=1-5&_nc_sid=cdbe9c&_nc_eui2=AeGNL3FS3CMbDfjvXNPemMBP8fcrdMF8M_Px9yt0wXwz82BI4Yac3V2zfiYq79gZFqmjawevxrR2Xv_4fnc5KHUs&_nc_ohc=L-OzgPWQz7AAX_NiSnc&_nc_ht=scontent.fbkk12-4.fna&oh=37467c50f2f44e01e6ac7863257e05e8&oe=61BFA9A0`}
                />
              </Box>

              <Box>
                <Box fontSize={20}>Hosted By</Box>
                <Box fontSize={25}>Pattarapong Sritong</Box>
              </Box>
            </Box>
          </Box>
          <Divider />
          <Box>Price : {`300`} Coin</Box>
          <Box
            marginTop="2%"
            display="flex"
            width="45%"
            justifyContent="space-between"
          >
            {!joined && (
              <Button
                size="large"
                variant="contained"
                style={{ backgroundColor: "#FFC229" }}
                onClick={joinHandler}
              >
                <Box marginX="30px" fontWeight="bold">
                  Join
                </Box>
              </Button>
            )}
            {joined && (
              <Button
                size="large"
                variant="contained"
                style={{ backgroundColor: "#B54040" }}
                onClick={joinHandler}
              >
                <Box marginX="30px" fontWeight="bold">
                  Left
                </Box>
              </Button>
            )}
            <Button
              size="large"
              variant="contained"
              style={{ backgroundColor: "#FFC229" }}
            >
              <FavoriteIcon />
            </Button>
            <Button
              size="large"
              variant="contained"
              style={{ backgroundColor: "#FFC229" }}
            >
              <AddIcon />
            </Button>
          </Box>
          <Box marginTop="20px">Attendances : </Box>
          <Box
            marginTop="10px"
            borderRadius="10px"
            style={{ backgroundColor: "lightgray" }}
          >
            <Box
              width={`${
                ((2 + (joined ? 1 : 0)) / event.maxParticipant) * 100
              }%`}
              height="30px"
              display="flex"
              justifyContent="right"
              padding="1%"
              color="white"
              alignItems="center"
              borderRadius="10px"
              style={{
                background: "linear-gradient(to right,#e66465, #9198e5)",
              }}
            ></Box>
          </Box>
          <Box marginTop="5%">
            <ButtonGroup variant="text" aria-label="text button group">
              <Button
                style={{
                  borderColor: "gray",
                  color: tag === "About" ? "black" : "gray",
                }}
                onClick={() => setTag("About")}
              >
                About
              </Button>
              <Button
                style={{
                  borderColor: "gray",
                  color: tag === "Location" ? "black" : "gray",
                }}
                onClick={() => setTag("Location")}
              >
                Location
              </Button>
              <Button
                style={{
                  borderColor: "gray",
                  color: tag === "Attendances" ? "black" : "gray",
                }}
                onClick={() => setTag("Attendances")}
              >
                Attendances
              </Button>
              <Button
                style={{
                  borderColor: "gray",
                  color: tag === "DateTime" ? "black" : "gray",
                }}
                onClick={() => setTag("DateTime")}
              >
                Date & Time
              </Button>
            </ButtonGroup>
          </Box>
          <Divider />
          {tag === "About" && event.description}
          {tag === "Location" &&
            `${event.address} ${event.province} ${event.district} ${event.zipcode}`}
          {tag === "Attendances" &&
            joinedUser.map((e) => {
              return (
                <UserPaper
                  name={e.firstName + " " + e.lastName}
                  id={e.userId}
                />
              );
            })}
          {tag === "DateTime" && event.takePlace}
        </Box>
      </Box>
    </Box>
  );
};

export default EventPage;
