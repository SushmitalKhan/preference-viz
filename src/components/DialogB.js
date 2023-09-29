import * as React from "react";
// import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function App(props) {
   const [openDialog, handleDisplay] = React.useState(false);

   const handleClose = () => {
      handleDisplay(false);
   };

   const openDialogBox = () => {
      handleDisplay(true);
   };

   return (
      <>
         <button type="button" class="btn btn-primary btn-light float-right" onClick = {openDialogBox}>
            Next Page
         </button>
         <Dialog onClose = {handleClose} open = {openDialog}>
            {/* <div>
                <Modal.Body>
                    Are you sure you want to leave? 
                </Modal.Body>
            </div> */}

            <Modal.Footer>
               <Button variant = "primary" onClick = {handleClose}>
                  Stay and explore!
               </Button>

               <Button variant = "primary" onClick = {handleClose}>
                <Link to = "/surveypage">
                    Leave
               </Link>
               </Button>
            </Modal.Footer>
         </Dialog>
      </>
   );
}