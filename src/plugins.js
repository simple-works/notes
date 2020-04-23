//==============================================================================
// ■ Plugins (plugins.js)
//------------------------------------------------------------------------------
//     Application plugins setup and configuration.
//==============================================================================
import Vue from "vue";

//------------------------------------------------------------------------------
// ● Base-Components
//------------------------------------------------------------------------------
import ValidationInput from "@/components/Base/ValidationInput";
Vue.component("ValidationInput", ValidationInput);
//------------------------------------------------------------------------------
import Spinner from "@/components/Base/Spinner";
Vue.component("Spinner", Spinner);
//------------------------------------------------------------------------------
import Notification from "@/components/Base/Notification";
Vue.component("Notification", Notification);
//------------------------------------------------------------------------------
import InfiniteScroll from "@/components/Base/InfiniteScroll";
Vue.component("InfiniteScroll", InfiniteScroll);
//------------------------------------------------------------------------------
import DateTime from "@/components/Base/DateTime";
Vue.component("DateTime", DateTime);
//------------------------------------------------------------------------------
import ConfirmModal from "@/components/Base/ConfirmModal";
Vue.component("ConfirmModal", ConfirmModal);

//------------------------------------------------------------------------------
// ● Base-Directives
//------------------------------------------------------------------------------
import ImgAltSrc from "@/directives/ImgAltSrc";
Vue.directive("Src", ImgAltSrc);

//------------------------------------------------------------------------------
// ● Base-Mixins
//------------------------------------------------------------------------------
Vue.mixin({
  computed: {
    currentUser() {
      return this.$store.getters.currentUser;
    }
  }
});

//------------------------------------------------------------------------------
// ● API
//------------------------------------------------------------------------------
import api from "./api/";
Vue.prototype.$api = api;

//------------------------------------------------------------------------------
// ● Alert
//------------------------------------------------------------------------------
import { toast, notification } from "./services/alert";
Vue.prototype.$notification = notification;
Vue.prototype.$toast = toast;

//------------------------------------------------------------------------------
// ● Animate
//------------------------------------------------------------------------------
import animate from "@/services/animate";
Vue.prototype.$animate = animate;

//------------------------------------------------------------------------------
// ● Axios
//------------------------------------------------------------------------------
import axios from "axios";
Vue.prototype.$http = axios;

//------------------------------------------------------------------------------
// ● VueMeta
//------------------------------------------------------------------------------
import VueMeta from "vue-meta";
Vue.use(VueMeta, {
  refreshOnceOnNavigation: true
});

//------------------------------------------------------------------------------
// ● VeeValidate
//------------------------------------------------------------------------------
import { ValidationObserver } from "vee-validate";
Vue.component("ValidationObserver", ValidationObserver);

//------------------------------------------------------------------------------
// ● Buefy
//------------------------------------------------------------------------------
import Buefy from "buefy";
Vue.use(Buefy, {
  defaultIconPack: "fas"
});

//------------------------------------------------------------------------------
// ● VueMoment
//------------------------------------------------------------------------------
import VueMoment from "vue-moment";
Vue.use(VueMoment);
