<template>
  <div>

		<v-dialog v-model="dialog" persistent>
      <v-btn primary class="purple lighten-2" dark slot="activator">Add purchase</v-btn>
      <v-card>
        <v-card-title>
          <span class="headline">Add purchase</span>
        </v-card-title>
        <v-card-text>
        	<v-form v-model="valid" ref="form">
	          <v-text-field label="Purchase name" required hint="example of helper text only on focus"></v-text-field>
	          <v-text-field label="Cost" required hint="example of helper text only on focus"></v-text-field>
	          <v-select id="type" label="Type" required :items="['Food', 'Passage', 'Home']"></v-select>
		        <v-menu
		          lazy
		          :close-on-content-click="false"
		          v-model="menu"
		          transition="scale-transition"
		          offset-y
		          full-width
		          :nudge-left="40"
		          max-width="290px"
		        >
		          <v-text-field
		            slot="activator"
		            label="Picker in menu"
		            v-model="e3"
		            prepend-icon="event"
		            readonly
		          ></v-text-field>
		          <v-date-picker v-model="e3" no-title scrollable actions>
		            <template scope="{ save, cancel }">
		              <v-card-actions>
		                <v-btn flat primary @click.native="cancel()">Cancel</v-btn>
		                <v-btn flat primary @click.native="save()">Save</v-btn>
		              </v-card-actions>
		            </template>
		          </v-date-picker>
		        </v-menu>
	          <v-btn class="blue--text darken-1" flat @click.native="dialog = false">Close</v-btn>
	          <v-btn class="blue--text darken-1" @click="addPurchase" @click.native="dialog = false" flat>Save</v-btn>
		      </v-form>
        </v-card-text>


      </v-card>
    </v-dialog>


      <br>
      <br>
    
	  <v-data-table
	      v-bind:headers="headers"
	      :items="items"
	      hide-actions
	      class="elevation-1"
	    >
	    <template slot="items" scope="props">
	      <td>{{ props.item.name }}</td>
	      <td class="text-xs-left">{{ props.item.type }}</td>
	      <td class="text-xs-left">{{ props.item.date }}</td>
	      <td class="cost-td text-xs-right">{{ props.item.cost }} <span class="cost">{{currentCurrency}}</span></td>
	    </template>
	  </v-data-table>

  </div>
       
</template>

<script>
  export default {
    mounted () {
    },
    name: 'Money',
    data () {
      return {
        dialog: false,
        valid: false,
        e3: null,
        menu: false,
        currency: [
          'тг', 'руб'
        ],
        currentCurrency: 'тг',
        headers: [
          { text: 'Item', align: 'left', value: 'name' },
          { text: 'Type', align: 'left', value: 'type' },
          { text: 'Date', align: 'left', value: 'date' },
          { text: 'Cost', align: 'right', value: 'cost' }
        ],
        items: [
          {
            value: false,
            name: 'Frozen Yogurt',
            cost: 159,
            date: '2017-09-04',
            type: 'Food'
          },
          {
            value: false,
            name: 'Bus',
            cost: 237,
            date: '2017-09-03',
            type: 'Passage'
          },
          {
            value: false,
            name: 'Table',
            cost: 262,
            date: '2017-09-02',
            type: 'Home'
          },
          {
            value: false,
            name: 'Cupcake',
            cost: 305,
            date: '2017-09-01',
            type: 'Food'
          }
        ]
      }
    },
    methods: {
      addPurchase () {
        var form = this.$refs.form
        var purchase = form.$el[0].value
        var cost = form.$el[1].value
        var type = form.$el[2].previousSibling.textContent
        var date = form.$el[3].value
        console.log(purchase, cost, type, date)
        this.items.unshift({
          value: false,
          name: purchase,
          cost: cost,
          date: date,
          type: type
        })
      }
    }
  }
</script>

