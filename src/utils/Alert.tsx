import Swal, { SweetAlertResult } from "sweetalert2"; 
import "sweetalert2/src/sweetalert2.scss";

const alertSuccess = (title = "", text = ""): Promise<SweetAlertResult> => { 
  return Swal.fire({
    title: title,
    text: text,
    icon: "success",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
  });
};

const alertError = (title = "", text = ""): Promise<SweetAlertResult> => { 
  return Swal.fire({
    title: title,
    text: text,
    icon: "error",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
  });
};

const alertConfirm = (title = "", text = ""): Promise<boolean> => {
  return Swal.fire({
    title: title,
    text: text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      return true;
    } else {
      return false;
    }
  });
};

const alertLoading = (): void => {
  Swal.fire({
    allowEnterKey: false,
    allowOutsideClick: false,
    allowEscapeKey: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });
};

const closeAlert = (): void => {
  Swal.close();
};

export { closeAlert, alertSuccess, alertLoading, alertError, alertConfirm };
