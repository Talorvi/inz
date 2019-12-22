<template>
  <div class="row">
    <div
      class="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 offset-xs-0 offset-sm-0 offset-md-3 offset-lg-4 offset-xl-4"
    >
      <OnlineList></OnlineList>
    </div>
  </div>
</template>

<script>
import OnlineList from "../../../components/scenario/OnlineList";
export default {
  name: "OnlinePlayers",
  components: { OnlineList }
};
</script>
