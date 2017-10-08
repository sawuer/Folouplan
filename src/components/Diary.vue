<template>
  <transition enter-active-class="animated fadeIn">
	<div>
    <v-layout row wrap>
      <v-flex xs12 class="pa-2">
        <v-layout row>
          <v-flex xs6>
            <v-form ref="form">
              <v-text-field v-model="post" name="input-12-4" label="Type your post" required :rules="textRules" value="" multi-line></v-text-field>
            </v-form>
            <v-btn icon class="grey lighten-4 green--text" @click="addPost">
              <v-icon>add</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
        <br>
        <br>
    	  <v-layout>
    	    <v-flex xs12>
    	      
            <template v-for="user in this.$root.users">
              <template v-if="user.id === $store.getters.user.id">
                <template v-if="user.data">
                  <template v-for="(post, key, index) in user.data.posts">

                    <div class="post">
                      <div>
                        <span class="grey--text">{{post.date}}</span><br>
            						<p class="diary-p">{{post.text}}</p>
                      </div>
            				  <v-btn class="diary-delete" @click.native.stop="post.dialog" @click="post.dialog = true"  icon>
                        <v-icon class="grey--text completed-todos">delete</v-icon>
                      </v-btn>
            			    <v-dialog v-model="post.dialog">
            			      <v-card>
            			        <v-card-title class="">
                            <div>
                              <b>Delete:</b> 
                              <span class="modal-id">{{post.modId}}</span>
                              {{post.text.slice(0, 150) + '...'}}
                            </div>
                          </v-card-title>
            			        <v-card-actions>
            			          <v-spacer></v-spacer>
            			          <v-btn class="green--text darken-1" flat="flat" @click.native.stop="post.dialog=false">Disagree</v-btn>
            			          <v-btn class="green--text darken-1" flat="flat" @click="deletePost(key)">Agree</v-btn>
            			        </v-card-actions>
            			      </v-card>
            			    </v-dialog>
                    </div>


                  </template>
                </template>
              </template>
            </template>

    	    </v-flex>
    	  </v-layout>
      </v-flex>
    </v-layout>
	</div>
  </transition>

</template>
<script>
  export default {
    mounted () {
    },
    name: 'Diary',
    data () {
      return {
        post: '',
        valid: false,
        textRules: [
          (v) => !!v || 'You didn\'t fill out the field'
        ]
      }
    },
    methods: {
      addPost () {
        var text = this.$refs.form.$el[0].value
        var today = new Date()
        var dateString = today.getDate() + '-' + today.getMonth() + '-' + today.getFullYear()
        if (text !== '') {
          this.$root.$firebaseRefs.users
            .child(this.$store.getters.user.key)
            .child('data')
            .child('posts').push({
              text: text,
              date: dateString,
              dialog: false
            })
        }
        // this.setModalIds()
      },
      deletePost (key) {
        this.$root.$firebaseRefs.users
          .child(this.$store.getters.user.key)
          .child('data')
          .child('todos')
          .child(key).remove()
      }
    }
  }
</script>

