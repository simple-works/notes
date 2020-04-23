//==============================================================================
// ■ Alert (alert.js)
//------------------------------------------------------------------------------
//     Programmatic UI notifications wrapper.
//==============================================================================
import { NotificationProgrammatic as Notification } from "buefy";
import { ToastProgrammatic as Toast } from "buefy";

//------------------------------------------------------------------------------
// ● Notification
//------------------------------------------------------------------------------
export function notification(message, type, options = {}) {
  _alert(Notification, {
    message,
    type,
    ...options
  });
}

//------------------------------------------------------------------------------
// ● Toast
//------------------------------------------------------------------------------
export function toast(message, type, options = {}) {
  _alert(Toast, {
    message,
    type,
    ...options
  });
}

//------------------------------------------------------------------------------
// ● Base-Function
//------------------------------------------------------------------------------
function _alert(alertClass, options = {}) {
  const {
    message = "",
    type = "is-primary",
    position = "is-top",
    duration = 5000,
    queue = false,
    hasIcon = false
  } = options;
  alertClass.open({
    ...options,
    message,
    type,
    position,
    duration,
    queue,
    hasIcon
  });
}
