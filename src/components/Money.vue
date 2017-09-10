<template>
  <div>
    <h4 class=""><span class="light-text">All:</span> {{cashSum}} {{currentCurrency}}</h4>
    <h5 class="light-text">Spending</h5>

		<v-dialog v-model="dialog" persistent>
      <v-btn primary class="purple lighten-2" dark slot="activator">Add new</v-btn>
      <v-card>
        <v-card-title>
          <span class="headline">Add new</span>
        </v-card-title>
        <v-card-text>
        	<v-form v-model="valid" ref="form">
	          <v-text-field label="Purchase name" required hint="example of helper text only on focus"></v-text-field>
	          <v-text-field label="Cost" required hint="example of helper text only on focus"></v-text-field>
	          <v-select id="type" label="Type" required :items="['Food', 'Passage', 'Home']"></v-select>
		        <v-menu lazy :close-on-content-click="false" v-model="menu" transition="scale-transition" offset-y full-width :nudge-left="40" max-width="290px">
		          <v-text-field slot="activator" label="Picker in menu" v-model="e3" prepend-icon="event" readonly></v-text-field>
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

sdfsd
		<br>

	  <v-data-table v-bind:headers="spendingHeader" :items="spendingItems">
	    <template slot="items" scope="props">
	      <td class="pur-name">
	      	{{ props.item.name }}
		      <v-btn class="completed-todos" @click="deletePurchase" icon>
		        <v-icon class="grey--text">delete</v-icon>
		      </v-btn>
		    </td>
	      <td class="pur-date text-xs-left">{{ props.item.date }}</td>
	      <td class="pur-type text-xs-left">{{ props.item.type }}</td>
	      <td class="pur-cost cost-td text-xs-right">{{ props.item.cost }} <span class="cost">{{currentCurrency}}</span></td>
	    </template>
	  </v-data-table>	

		<br>
    <h5 class="light-text">Income</h5>
	  <v-data-table v-bind:headers="incomeHeader" :items="incomeItems">
	    <template slot="items" scope="props">
	      <td class="pur-date text-xs-left">
	        {{ props.item.date }}
	        <v-btn class="completed-todos" @click="deletePurchase" icon>
		        <v-icon class="grey--text">delete</v-icon>
		      </v-btn>
	       </td>
	      <td class="pur-type text-xs-left">{{ props.item.type }}</td>
	      <td class="pur-cost cost-td text-xs-right">{{ props.item.income }} <span class="cost">{{currentCurrency}}</span></td>
	    </template>
	  </v-data-table>

  </div>
       
</template>

<script>
  export default {
    mounted () {
      this.takeOf()
      this.incomeAppending()
    },
    name: 'Money',
    data () {
      return {
        dialog: false,
        valid: false,
        e3: null,
        menu: false,
        cashSum: 50000,
        currentCurrency: 'тг',
        spendingHeader: [
          { text: 'Item', align: 'left', sortable: false, value: 'name' },
          { text: 'Date', align: 'left', sortable: true, aria_sort: 'descending', value: 'date' },
          { text: 'Type', align: 'left', value: 'type' },
          { text: 'Cost', align: 'right', value: 'cost' }
        ],
        incomeHeader: [
          { text: 'Date', align: 'left', sortable: true, aria_sort: 'descending', value: 'date' },
          { text: 'Type', align: 'left', value: 'type' },
          { text: 'Income', align: 'right', value: 'income' }
        ],
        spendingItems: [
          { name: 'Frozen Yogurt', cost: 159, date: '2017-09-04', type: 'Food' },
          { name: 'Bus', cost: 159, date: '2017-09-02', type: 'Passage' },
          { name: 'Table', cost: 159, date: '2017-09-03', type: 'Home' },
          { name: 'Cupcake', cost: 305, date: '2017-09-01', type: 'Food' },
          { name: 'Another buss', cost: 237, date: '2017-09-03', type: 'Passage' },
          { name: 'Chair', cost: 2632, date: '2017-09-02', type: 'Home' },
          { name: 'Chai', cost: 3205, date: '2017-09-01', type: 'Food' }
        ],
        incomeItems: [
          { type: 'Work', date: '2017-09-12', income: 3000 },
          { type: 'Freelance', date: '2017-09-02', income: 13000 },
          { type: 'Work', date: '2017-08-12', income: 30000 },
          { type: 'Work', date: '2017-07-12', income: 30000 },
          { type: 'Freelance', date: '2017-07-08', income: 1000 }
        ]
      }
    },
    methods: {
      addPurchase () {
        var self = this
        var form = this.$refs.form
        var purchase = form.$el[0].value
        var cost = form.$el[1].value
        var type = form.$el[2].previousSibling.textContent
        var date = form.$el[3].value
        setTimeout(function () {
          self.spendingItems.unshift({
            value: false,
            name: purchase,
            cost: cost,
            date: date,
            type: type
          })
          self.cashSum -= cost
        }, 600)
      },
      takeOf () {
        var itemsL = Object.keys(this.spendingItems).length
        for (var i = 0; i < itemsL; i++) {
          this.cashSum -= this.spendingItems[i].cost
        }
      },
      incomeAppending () {
        var itemsL = Object.keys(this.incomeItems).length
        for (var i = 0; i < itemsL; i++) {
          this.cashSum += this.incomeItems[i].income
        }
      },
      deletePurchase (e) {
        var itemsL = Object.keys(this.spendingItems).length
        var row = e.target.parentNode.parentNode.parentNode
        var name = row.querySelector('.pur-name').innerText.replace('delete', '').trim()
        var type = row.querySelector('.pur-type').innerText
        var date = row.querySelector('.pur-date').innerText
        var cost = row.querySelector('.pur-cost').innerText.replace(this.currentCurrency, '').trim()
        for (var i = 0; i < itemsL; i++) {
          if (this.spendingItems[i].name === name && this.spendingItems[i].type === type && this.spendingItems[i].date === date) {
            this.spendingItems.splice(i, 1)
            this.cashSum += +cost
          }
        }
      }
    }
  }
</script>

