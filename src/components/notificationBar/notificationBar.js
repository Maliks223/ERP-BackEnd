
import { Alert, Snackbar } from "@mui/material";
import { green } from "@mui/material/colors";
import { makeStyles } from "@mui/styles";
import React from "react";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     color:theme,
//   },
// }));

export default function Notification(props) {
  const { notify, setNotify } = props;
//   const classes = useStyles();

const handleClose = (event,reason) => {
    if(reason === 'clickaway'){
        return ;
    }
    setNotify({
        ...notify,
        isOpen:false
    })
}


  return (
    <Snackbar
    //   className={classes.root}
      open={notify.isOpen}
      autoHideDuration={3000}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      onClose={handleClose}
    >
      <Alert 
      variant="filled"
      severity={notify.type}
         onClose={handleClose}
         >{notify.message}</Alert>
    </Snackbar>
  );
}

{/* <Notification 
      notify = {notify}
      setNotify = {setNotify}
      />
const [ notify, setNotify] = useState({isOpen:false , message:'', type:''})
setNotify({
          isOpen:true,
          message:'Employee added !',
          type:'success'
        }) */}