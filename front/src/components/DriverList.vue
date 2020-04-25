<template>
  <div>
    <b-table 
      striped hover 
      :items="drivers" 
      v-bind:small=true
      :fields="fields"
      :busy="isLoading"
    >
      <template v-slot:table-busy>
        <div class="text-center text-danger my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong> Loading...</strong>
        </div>
      </template>
      <template v-slot:cell(birthday)="data">
        {{ data.value | moment("DD-MM-YYYY") }}
      </template>
      <template v-slot:cell(url)="data">
        <a :href="data.value">More detail</a>
      </template>
    </b-table>
  </div>
</template>

<script>

import request from '../server/request';

export default {

  name: 'DriverList',
  props: {
    //msg: String
  },
  data () {
    return {
      fields: [{
        key: "firstname",
        sortable: true,
        label: "Fist name"
      },{
        key: "lastname",
        sortable: true,
        label: "Last name"
      }, {
        key: "number",
        label: "Number",
        sortable: true,
      }, {
        key: "birthday",
        label: "Birthday",
        sortable: true,
      }, 
      "url"],
        
        // 'first_name', 'last_name', 'age'],
      isLoading: true,

      drivers: []
    }
  },
  mounted() {
    this.fetchDrivers();
  },
  methods: {
    fetchDrivers() {
      request.drivers.getAll().then((drivers) => {
        console.log(drivers);
        this.drivers = drivers.content.map(x => {
          return {
            ...x
          }
        });
        this.isLoading = false;
      });
    }
  }
}
</script>