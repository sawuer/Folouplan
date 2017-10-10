<template>
  <transition enter-active-class="animated fadeIn">
    <div>
      <div class="all-sum elevation-1">
        <span class="text-xs-right">Current cash: <b>{{cashSum}} {{currentCurrency}}</b></span>
      </div>

             
      <v-layout row wrap>
        <v-flex xs12 class="pa-2">
          <h4>Spendings</h4>

          <v-layout row wrap class="elevation-2">
            <v-flex xs2 class="pa-2">
              <v-text-field 
                v-model="newSpendingCategory" 
                label="New category"
                @keyup.enter="addNewSpendingCategory()"
                ></v-text-field>
            </v-flex>

            <v-flex xs10 class="pa-2">
              <template v-for="(chip, index) in spendingsCategory">
                <v-chip 
                  class="chipper" 
                  close
                  @input="removeCategory(spendingsCategory[index][1], 'spendingsCategories')"
                  v-model="spendingsCategory['chip' + index]"
                  >{{ spendingsCategory[index][0] }}</v-chip>
              </template>
            </v-flex>

          </v-layout>
          <br>

        


        <!-- SPENDINGS -->
        <div class="elevation-2">

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
                    :items="spendingsCategory.map(i => i[0])"></v-select>
                  
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

                  <v-btn class="red--text darken-1" flat @click.native="dialog = false">Close</v-btn>
                  <v-btn class="green--text darken-1" @click="addPurchase" @click.native="valid ? dialog = false : null" flat>Add</v-btn>
                
                </v-form>
              </v-card-text>
            </v-card>
          </v-dialog>


          <template v-for="user in this.$root.users">
            <template v-if="user.id === $store.getters.user.id">
              <template v-if="user.data && user.data.spendings">
                  <v-data-table
                    pagination.sync
                    v-bind:headers="spendingHeader"
                    :rows-per-page-items="[5, 20, 50, { text: 'All', value: -1 }]"
                    :items="Object.keys(user.data.spendings).map(i => user.data.spendings[i])"
                    item-key="index"
                    class="spending-table">
                    <template slot="items" scope="props">
                      
                      <td class="pur-date text-xs-left">
                        <v-btn class="completed-todos" @click="deleteItem(props.item.thisKey, 'spendings')" icon>
                          <v-icon class="grey--text">delete</v-icon>
                        </v-btn>
                        {{ props.item.date }}
                      </td>

                      <td class="pur-name">
                        <v-edit-dialog> 
                          {{ props.item.name }}
                          <v-text-field
                            slot="input"
                            @keyup.enter="newSpendingTitle($event, props.item.name, props.item.thisKey)"
                            :value="props.item.name"
                          ></v-text-field>
                        </v-edit-dialog> 
                      </td>

                      <!-- <td class="pur-type text-xs-left">{{ props.item.type }}</td> -->
                      <td class="pur-type text-xs-left">
                        <v-select
                          v-bind:items="spendingsCategory.map(i => i[0])"
                          v-model="props.item.type"
                          @input="newType($event, props.item.thisKey, 'spendings')"
                          single-line
                          auto
                        ></v-select>
                        <!-- {{ props.item.type }} -->
                      </td>
                      
                      <td class="pur-cost cost-td text-xs-right">
                        <v-edit-dialog> 
                          {{ props.item.money }}
                          <v-text-field
                            slot="input"
                            @keyup.enter="newMoneyCount($event, props.item.thisKey, 'spendings')"
                            :value="props.item.money"
                          ></v-text-field>
                        </v-edit-dialog>
                        <span class="cost">{{currentCurrency}}</span>
                      </td>
              
                  </template>      
                </v-data-table>
              </template>      
            </template>
          </template>
        </div>
 
        <br>
        <br>
        <br>
        <h4>Incomes</h4>


        <v-layout row wrap class="elevation-2">
          <v-flex xs2 class="pa-2">
            <v-text-field 
              v-model="newIncomeCategory" 
              label="New category"
              @keyup.enter="addNewIncomeCategory()"
              ></v-text-field>
            </v-flex>
          <v-flex xs10 class="pa-2">
            <template v-for="(chip, index) in incomesCategory">
              <v-chip 
                class="chipper" 
                close
                @input="removeCategory(incomesCategory[index][1], 'incomesCategories')"
                v-model="incomesCategory['chip' + index]"
                >{{ incomesCategory[index][0] }}</v-chip>
            </template>
          </v-flex>
        </v-layout>

        <br>

        <!-- INCOMES -->
        <div class="elevation-2">
          <v-dialog v-model="dialog2" persistent>
          <v-btn icon slot="activator" class="grey lighten-4 green--text">
            <v-icon>attach_money</v-icon>
          </v-btn>
          <v-card>
            <v-card-title>
              <span class="headline">Add new income</span>
            </v-card-title>
            <v-card-text>
              <v-form v-model="valid2" ref="form2">

                <v-text-field 
                  label="Income cash"
                  v-model="income"
                  :rules="costRules"
                  required 
                  ></v-text-field>
                <v-select 
                  id="type" 
                  :rules="purRules"
                  label="Type"
                  v-model="incomeType"
                  required 
                  :items="incomesCategory.map(i => i[0])"
                  ></v-select>
                <v-menu lazy 
                  :close-on-content-click="false" 
                  v-model="date2" 
                  transition="scale-transition" 
                  offset-y full-width 
                  :nudge-left="40" 
                  max-width="290px">
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
                <v-btn class="red--text darken-1" flat @click.native="dialog2 = false">Close</v-btn>
                <v-btn class="green--text darken-1" @click="addIncome" @click.native="valid2 ? dialog2 = false : null" flat>Add</v-btn>

              </v-form>
            </v-card-text>
          </v-card>
        </v-dialog>
        <template v-for="user in this.$root.users">
          <template v-if="user.id === $store.getters.user.id">
            <template v-if="user.data && user.data.incomes">

              <v-data-table 
                v-bind:headers="incomeHeader" 
                :rows-per-page-items="[5, 20, 50, { text: 'All', value: -1 }]"
                :items="Object.keys(user.data.incomes).map(i => user.data.incomes[i])"
                class="spending-table">
                <template slot="items" scope="props">
                  <td class="inc-date text-xs-left">
                    <v-btn class="completed-todos" @click="deleteItem(props.item.thisKey, 'incomes')" icon>
                      <v-icon class="grey--text">delete</v-icon>
                    </v-btn>
                    {{ props.item.date }}
                   </td>
                  <td class="inc-type text-xs-left">
                    <v-select
                      v-bind:items="incomesCategory.map(i => i[0])"
                      v-model="props.item.type"
                      @input="newType($event, props.item.thisKey, 'incomes')"
                      single-line
                      auto
                    ></v-select>
                  </td>
                  <td class="inc-income cost-td text-xs-right">
                    <v-edit-dialog> 
                      {{ props.item.money }}
                      <v-text-field
                        slot="input"
                        @keyup.enter="newMoneyCount($event, props.item.thisKey, 'incomes')"
                        :value="props.item.money"
                      ></v-text-field>
                    </v-edit-dialog>
                    <span class="cost">{{currentCurrency}}</span></td>
                </template>
              </v-data-table>


            </template>      
          </template>
        </template>
        </div>

      </v-flex>
      </v-layout>
    </div>
  </transition>
</template>

<script>
  export default {

    mounted () {
      this.computeCash()
      // this.computeSpendingsChips()
      // this.computeIncomesChips()
      this.fullCategoriesFromDB()
    },
    data () {
      return {
        pathCurrentUserData: this.$root.$firebaseRefs.users
          .child(this.$store.getters.user.key)
          .child('data'),
        newSpendingCategory: null,
        newIncomeCategory: null,
        spendingsCategory: [],
        spendingsChips: [],
        incomesCategory: [],
        incomesChips: [],
        spendingsTypeSelect: null,
        counter: 0,
        uncoverSpendingsData: null,
        purName: null,
        cost: null,
        type: null,
        income: null,
        incomeType: null,
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
        picker: null,
        picker2: null,
        date: false,
        date2: false,
        cashSum: 0,
        currentCurrency: 'тг',
        spendingHeader: [
          { text: 'Date', align: 'left', sortable: true, value: 'date' },
          { text: 'Item', align: 'left', sortable: true, value: 'name' },
          { text: 'Type', align: 'left', sortable: true, value: 'type' },
          { text: 'Cost', align: 'right', sortable: true, value: 'cost' }
        ],
        incomeHeader: [
          { text: 'Date', align: 'left', sortable: true, aria_sort: 'descending', value: 'date' },
          { text: 'Type', align: 'left', sortable: true, value: 'type' },
          { text: 'Income', align: 'right', sortable: true, value: 'income' }
        ]
      }
    },
    methods: {
      addNewSpendingCategory () {
        const key = this.$store.getters.user.key
        this.$root.$firebaseRefs.users
          .child(key)
          .child('data')
          .child('spendingsCategories')
          .push({
            catName: this.newSpendingCategory
          })
          .then(i => {
            this.$root.$firebaseRefs.users
              .child(key)
              .child('data')
              .child('spendingsCategories')
              .child(i.key)
              .update({
                thisKey: i.key
              })
          })
        this.fullCategoriesFromDB()
      },
      addNewIncomeCategory () {
        const key = this.$store.getters.user.key
        this.$root.$firebaseRefs.users
          .child(key)
          .child('data')
          .child('incomesCategories')
          .push({
            catName: this.newIncomeCategory
          })
          .then(i => {
            this.$root.$firebaseRefs.users
              .child(key)
              .child('data')
              .child('incomesCategories')
              .child(i.key)
              .update({
                thisKey: i.key
              })
          })
        this.fullCategoriesFromDB()
      },
      fullCategoriesFromDB () {
        this.spendingsCategory = []
        var varSpendingsCategories = this.pathCurrentUserData.child('spendingsCategories')
        varSpendingsCategories.once('value').then(snapshot => {
          snapshot.forEach(item => {
            this.spendingsCategory.push([item.val().catName, item.val().thisKey])
          })
        })
        this.incomesCategory = []
        var varIncomesCategories = this.pathCurrentUserData.child('incomesCategories')
        varIncomesCategories.once('value').then(snapshot => {
          snapshot.forEach(item => {
            this.incomesCategory.push([item.val().catName, item.val().thisKey])
          })
        })
      },
      removeCategory (key, coll) {
        this.pathCurrentUserData
          .child(coll)
          .child(key).remove()
        this.fullCategoriesFromDB()
      },
      computeSpendingsChips () {
        this.spendingsCategory.forEach((i, index) => {
          var obj = {}
          var prop = 'chip' + index
          obj[prop] = true
          this.spendingsChips.push(obj)
        })
      },
      computeIncomesChips () {
        this.incomesCategory.forEach((i, index) => {
          var obj = {}
          var prop = 'chip' + index
          obj[prop] = true
          this.incomesChips.push(obj)
        })
      },

      addPurchase () {
        if (this.$refs.form.validate()) {
          var form = this.$refs.form
          var money = +form.$el[0].value
          var name = form.$el[1].value
          var type = form.$el[2].previousSibling.textContent
          var date = form.$el[3].value
          const key = this.$store.getters.user.key
          this.$root.$firebaseRefs.users
            .child(key)
            .child('data')
            .child('spendings').push({
              money, name, type, date
            })
            .then(i => {
              this.$root.$firebaseRefs.users
                .child(key)
                .child('data')
                .child('spendings')
                .child(i.key)
                .update({
                  thisKey: i.key
                })
            })
          this.computeCash()
          setTimeout(() => this.$refs.form.reset(), 200)
        }
      },
      addIncome () {
        if (this.$refs.form2.validate()) {
          var form = this.$refs.form2
          var money = form.$el[0].value
          var type = form.$el[1].previousSibling.textContent
          var date = form.$el[2].value
          const key = this.$store.getters.user.key
          this.$root.$firebaseRefs.users
            .child(key)
            .child('data')
            .child('incomes').push({
              type, date, money
            })
            .then(i => {
              this.$root.$firebaseRefs.users
                .child(key)
                .child('data')
                .child('incomes')
                .child(i.key)
                .update({
                  thisKey: i.key
                })
            })
          this.computeCash()
          setTimeout(() => this.$refs.form2.reset(), 200)
        }
      },
      computeCash () {
        this.$root.users.forEach(user => {
          if (user.id === this.$store.getters.user.id && user.data) {
            this.cashSum = 0
            if (user.data.incomes) {
              Object.keys(user.data.incomes).forEach(i => {
                this.cashSum += +user.data.incomes[i].money
              })
            }
            if (user.data.spendings) {
              Object.keys(user.data.spendings).forEach(i => {
                this.cashSum -= +user.data.spendings[i].money
              })
            }
          }
        })
      },
      newSpendingTitle (e, spending, key) {
        this.pathCurrentUserData
          .child('spendings')
          .child(key).update({
            name: e.target.value
          })
      },
      newType (type, key, coll) {
        this.pathCurrentUserData
          .child(coll)
          .child(key).update({
            type: type
          })
      },
      newMoneyCount (e, key, coll) {
        this.pathCurrentUserData
          .child(coll)
          .child(key).update({
            money: e.target.value
          })
        this.computeCash()
      },
      deleteItem (key, coll) {
        this.pathCurrentUserData
          .child(coll)
          .child(key).remove()
        this.computeCash()
      }
    }
  }
</script>

/