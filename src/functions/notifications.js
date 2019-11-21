import { Notify } from "quasar";

export default {
  methods: {
    sendErrorNotification(
      message = "Oops, there was an error!",
      timeout = 1500
    ) {
      Notify.create({
        color: "red-5",
        textColor: "white",
        icon: "error",
        message: message,
        timeout: timeout,
        position: "bottom-right"
      });
    },
    sendSuccessNotification(message = "Success!", timeout = 1500) {
      Notify.create({
        color: "green-5",
        textColor: "white",
        icon: "done",
        message: message,
        timeout: timeout,
        position: "bottom-right"
      });
    }
  }
};
