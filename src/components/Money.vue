<template>
  <transition enter-active-class="animated fadeIn">
    <div>
      <div class="all-sum">
        <span>
          <h5 class="text-xs-right">{{cashSum}} {{currentCurrency}}</h5>
        </span>
      </div>
  		<v-dialog v-model="dialog" persistent>
        <v-btn icon slot="activator" class="grey lighten-4 green--text">
          <v-icon>add</v-icon>
        </v-btn>

        <v-card>
          <v-card-title>
            <span class="headline">Add new spend</span>
          </v-card-title>
          <v-card-text>

          	<v-form v-model="valid" ref="form">

  	          <v-text-field 
                v-model="cost" 
                label="Cost" 
                :rules="costRules" 
                required 
                hint="example of helper text only on focus"
                ></v-text-field>
              
              <v-text-field 
                v-model="purName" 
                :rules="purRules" 
                :counter="25"  
                label="Purchase name" 
                required
                ></v-text-field>

  	          <v-select 
                v-model="type" 
                :rules="typeRules" 
                label="Type" 
                required 
                :items="['Food', 'Passage', 'Home', 'Other']"></v-select>
  		        
              <v-menu lazy :close-on-content-click="false" v-model="date" transition="scale-transition" offset-y full-width :nudge-left="40" max-width="290px">
  		          <v-text-field :rules="dateRules" slot="activator" label="Picker in menu" v-model="picker" readonly></v-text-field>
  		          <v-date-picker v-model="picker" autosave no-title scrollable actions>
  		            <template scope="{ save, cancel }">
  		              <v-card-actions>
  		                <v-btn flat primary @click.native="cancel()">Cancel</v-btn>
  		                <v-btn flat primary @click.native="save()">Save</v-btn>
  		              </v-card-actions>
  		            </template>
  		          </v-date-picker>
  		        </v-menu>

  	          <v-btn class="green--text darken-1" @click="addPurchase" @click.native="valid ? dialog = false : null" flat>Add</v-btn>
  	          <v-btn class="red--text darken-1" flat @click.native="dialog = false">Close</v-btn>
  		      
            </v-form>
          </v-card-text>
        </v-card>
      </v-dialog>

  		<br>

  	  <v-data-table 
        v-bind:headers="spendingHeader" 
        :items="spendingItems"
        class="spending-table">
  	    <template slot="items" scope="props">
  	      <td class="pur-date text-xs-left">
  	      	<v-btn class="completed-todos" @click="deletePurchase" icon>
  		        <v-icon class="grey--text">delete</v-icon>
  		      </v-btn>
  		      {{ props.item.date }}
  		    </td>
  	      <td class="pur-name">{{ props.item.name }}</td>
  	      <td class="pur-type text-xs-left">{{ props.item.type }}</td>
  	      <td class="pur-cost cost-td text-xs-right">{{ props.item.cost }} <span class="cost">{{currentCurrency}}</span></td>
  	    </template>
  	  </v-data-table>

      <div id="piechart" width="400" style="height: 500px;"></div>

      <v-dialog v-model="dialog2" persistent>
        <v-btn icon slot="activator" class="grey lighten-4 green--text">
          <v-icon>attach_money</v-icon>
        </v-btn>
        <v-card>
          <v-card-title>
            <span class="headline">Add new income</span>
          </v-card-title>
          <v-card-text>
          	<v-form v-model="valid" ref="form1">
  	          <v-text-field label="Income cash" required hint="example of helper text only on focus"></v-text-field>
  	          <v-select id="type" label="Type" required :items="['Work', 'Freelance']"></v-select>
  		        <v-menu lazy :close-on-content-click="false" v-model="date2" transition="scale-transition" offset-y full-width :nudge-left="40" max-width="290px">
  		          <v-text-field slot="activator" label="Picker in menu" v-model="picker2" readonly></v-text-field>
  		          <v-date-picker v-model="picker2" autosave no-title scrollable actions>
  		            <template scope="{ save, cancel }">
  		              <v-card-actions>
  		                <v-btn flat primary @click.native="cancel()">Cancel</v-btn>
  		                <v-btn flat primary @click.native="save()">Save</v-btn>
  		              </v-card-actions>
  		            </template>
  		          </v-date-picker>
  		        </v-menu>
  	          <v-btn class="blue--text darken-1" flat @click.native="dialog2 = false">Close</v-btn>
  	          <v-btn class="blue--text darken-1" @click="addIncome" @click.native="dialog2 = false" flat>Save</v-btn>
  		      </v-form>
          </v-card-text>
        </v-card>
      </v-dialog>

  		<br>

  	  <v-data-table 
        v-bind:headers="incomeHeader" 
        :items="incomeItems"
        class="spending-table">
  	    <template slot="items" scope="props">
  	      <td class="inc-date text-xs-left">
  	        <v-btn class="completed-todos" @click="deleteIncome" icon>
  		        <v-icon class="grey--text">delete</v-icon>
  		      </v-btn>
  	        {{ props.item.date }}
  	       </td>
  	      <td class="inc-type text-xs-left">{{ props.item.type }}</td>
  	      <td class="inc-income cost-td text-xs-right">{{ props.item.income }} <span class="cost">{{currentCurrency}}</span></td>
  	    </template>
  	  </v-data-table>

    </div>
  </transition>
</template>

<script>
  export default {
    updated () {
      var google = window.google
      google.charts.load('current', {'packages': ['corechart']})
      // google.charts.setOnLoadCallback(drawChart)
      google.charts.setOnLoadCallback(drawChart)

      var spendings = {
        food: this.spendingItems.map(i => i.type === 'Food' ? i.cost : 0).reduce((a, b) => a + b),
        passage: this.spendingItems.map(i => i.type === 'Passage' ? i.cost : 0).reduce((a, b) => a + b),
        home: this.spendingItems.map(i => i.type === 'Home' ? i.cost : 0).reduce((a, b) => a + b),
        other: this.spendingItems.map(i => i.type === 'Other' ? i.cost : 0).reduce((a, b) => a + b)
      }

      function drawChart () {
        var data = google.visualization.arrayToDataTable([
          ['Task', 'Hours per Day'],
          ['Food', spendings.food],
          ['Passage', spendings.passage],
          ['Home', spendings.home],
          ['Other', spendings.other]
        ])
        var spendingChart = new google.visualization.PieChart(document.getElementById('piechart'))
        spendingChart.draw(data, {
          title: 'Spending'
          // pieHole: 0
        })
      }
    },
    mounted () {
      this.takeOf()
      this.incomeAppending()
    },
    data () {
      return {
        purName: '',
        cost: '',
        type: '',
        purRules: [
          (v) => !!v || 'You didn\'t fill out the puchase name',
          (v) => v && v.length <= 25 || 'Purchase name must be less than 20 characters'
        ],
        costRules: [
          (v) => /^\d+$/.test(v) || 'There must be only numbers',
          (v) => !!v || 'You didn\'t fill out the cost'
        ],
        typeRules: [
          (v) => !!v || 'You didn\'t fill out the type'
        ],
        dateRules: [
          (v) => !!v || 'You didn\'t fill out the date'
        ],
        dialog: false,
        dialog2: false,
        valid: false,
        valid2: false,
        valid3: false,
        picker: null,
        picker2: null,
        date: false,
        date2: false,
        cashSum: 0,
        currentCurrency: 'тг',
        spendingHeader: [
          { text: 'Date', align: 'left', sortable: false, value: 'date' },
          { text: 'Item', align: 'left', sortable: false, value: 'name' },
          { text: 'Type', align: 'left', sortable: false, value: 'type' },
          { text: 'Cost', align: 'right', sortable: false, value: 'cost' }
        ],
        incomeHeader: [
          { text: 'Date', align: 'left', sortable: false, aria_sort: 'descending', value: 'date' },
          { text: 'Type', align: 'left', sortable: false, value: 'type' },
          { text: 'Income', align: 'right', sortable: false, value: 'income' }
        ],
        spendingItems: [
          { name: 'Сыр', cost: 159, date: '2017-09-20', type: 'Food' },
          { name: 'Frozen Yogurt', cost: 159, date: '2017-09-04', type: 'Food' },
          { name: 'Bus', cost: 159, date: '2017-09-02', type: 'Passage' },
          { name: 'Table', cost: 159, date: '2017-09-03', type: 'Home' },
          { name: 'Cupcake', cost: 305, date: '2017-09-01', type: 'Other' },
          { name: 'Another buss', cost: 237, date: '2017-09-03', type: 'Passage' },
          { name: 'Chair', cost: 632, date: '2017-09-02', type: 'Home' },
          { name: 'Chai', cost: 105, date: '2017-09-01', type: 'Food' }
        ],
        incomeItems: [
          { type: 'Work', date: '2017-09-09', income: 3000 },
          { type: 'Freelance', date: '2017-09-02', income: 13000 },
          { type: 'Work', date: '2017-08-12', income: 2000 },
          { type: 'Work', date: '2017-07-12', income: 30000 },
          { type: 'Freelance', date: '2017-07-08', income: 1000 },
          { type: 'Freelance', date: '2017-07-10', income: 12000 }
        ]
      }
    },
    methods: {
      cashSumToNumber () {
        this.addCapitalMode = false
        this.cashSum = +this.cashSum
      },
      addPurchase () {
        if (this.$refs.form.validate()) {
          // this.$refs.form.$el.submit()
          var form = this.$refs.form
          var cost = +form.$el[0].value
          var name = form.$el[1].value
          var type = form.$el[2].previousSibling.textContent
          var date = form.$el[3].value
          this.spendingItems.unshift({
            name, cost, date, type
          })
          this.cashSum -= +cost
          setTimeout(() => this.$refs.form.reset(), 50)
        }
      },
      addIncome () {
        var form = this.$refs.form1
        var income = form.$el[0].value
        var type = form.$el[1].previousSibling.textContent
        var date = form.$el[2].value
        if (income !== '' && type !== '' && date !== '') {
          this.incomeItems.push({
            type: type,
            date: date,
            income: income
          })
        }
        this.cashSum += +income
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
        var name = row.querySelector('.pur-name').innerText
        var type = row.querySelector('.pur-type').innerText
        var date = row.querySelector('.pur-date').innerText.replace('delete', '').trim()
        var cost = row.querySelector('.pur-cost').innerText.replace(this.currentCurrency, '').trim()
        for (var i = 0; i < itemsL; i++) {
          console.log(this.spendingItems[i].name)
          if (this.spendingItems[i].name) {
            if (this.spendingItems[i].name === name && this.spendingItems[i].type === type && this.spendingItems[i].date === date) {
              this.spendingItems.splice(i, 1)
              this.cashSum += +cost
            }
          }
        }
      },
      deleteIncome (e) {
        var itemsL = Object.keys(this.incomeItems).length
        var row = e.target.parentNode.parentNode.parentNode
        var date = row.querySelector('.inc-date').innerText.replace('delete', '').trim()
        var type = row.querySelector('.inc-type').innerText
        var income = row.querySelector('.inc-income').innerText.replace(this.currentCurrency, '').trim()
        for (var i = 0; i < itemsL; i++) {
          if (this.incomeItems[i].income === +income && this.incomeItems[i].type === type && this.incomeItems[i].date === date) {
            this.incomeItems.splice(i, 1)
            this.cashSum -= +income
            return
          }
        }
      }
    }
  }
</script>

