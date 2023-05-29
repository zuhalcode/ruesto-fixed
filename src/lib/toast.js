import Swal from "sweetalert2";
import PropTypes from "prop-types";

const Toast = ({ type, message, timer }) => {
  const toastType = type === "error" ? "error" : "success";
  return new Promise((resolve, reject) => {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: timer,
    });
    Toast.fire({
      icon: toastType,
      title: message,
    })
      .then(() => resolve())
      .catch((err) => reject(err));
  });
};

Toast.propTypes = {
  type: PropTypes.oneOf(["error", "success"]).isRequired,
  message: PropTypes.string.isRequired,
  timer: PropTypes.number.isRequired,
};

export default Toast;
