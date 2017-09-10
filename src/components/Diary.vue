<template>
	<div>
		<v-layout row>
		  <v-flex xs12>
			  <v-form ref="form">
			    <v-text-field name="input-12-4" label="Type your post" value="" multi-line></v-text-field>
				</v-form>
				<v-btn class="green lighten-3 white-text" @click="addPost">Add post</v-btn>
		  </v-flex>
		</v-layout>
		<br>
		<br>
		<h5 class="light-text">Posts</h5>
	  <v-layout>
	    <v-flex xs12>
	      <div class="diary-item" v-for="item in posts">
          <div>
            <span class="grey--text">{{item.date}}</span><br>
						<p class="diary-p">{{item.text}}</p>
          </div>
				  <v-btn class="diary-delete" @click.native.stop="item.dialog" @click="item.dialog = true"  icon>
            <v-icon class="grey--text completed-todos">delete</v-icon>
          </v-btn>
			    <v-dialog v-model="item.dialog">
			      <v-card>
			        <v-card-title class=""><div><b>Delete:</b> <span class="modal-id">{{item.modId}}</span>{{item.text.slice(0, 150) + '...'}}</div></v-card-title>
			        <v-card-actions>
			          <v-spacer></v-spacer>
			          <v-btn class="green--text darken-1" flat="flat" @click.native.stop="item.dialog=false">Disagree</v-btn>
			          <v-btn class="green--text darken-1" flat="flat" @click="deletePost">Agree</v-btn>
			        </v-card-actions>
			      </v-card>
			    </v-dialog>
        </div>
	    </v-flex>
	  </v-layout>
	</div>  
</template>
<script>
  export default {
    mounted () {
      this.setModalIds()
    },
    name: 'Diary',
    data () {
      return {
        posts: [
          {
            date: '23-23-2003',
            text: '1Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident, sit blandit ctetur adipisicing elit. Provident, sit blandit ctetur adipisicing elit. Provident, sit blandit ctetur adipisicing elit. Provident, sit blandit ctetur adipisicing elit. Provident, sit blanditiis pariatur quod sunt dolores consequuntur, tempora, quis error facere maxime fuga laudantium molestias quae magnam voluptates molestiae amet qui tenetur tempore rem quo! Numquam accusantium, alias repellat rem voluptatibus.',
            dialog: false
          },
          {
            date: '24-23-2003',
            text: '2Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident, sit blanditiis pariatur quod sunt dolores consequuntur, tempora, quis error facere maxime fuga laudantium molestias quae magnam voluptates molestiae amet qu ctetur adipisicing elit. Provident, sit blandit ctetur adipisicing elit. Provident, sit blandit ctetur adipisicing elit. Provident, sit blandit i tenetur tempore rem quo! Numquam accusantium, alias repellat rem voluptatibus.',
            dialog: false
          },
          {
            date: '25-23-2003',
            text: '3Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident, sit blanditiis pariatur quod sunt dolores consequuntur, tempora, quis error facere maxime fuga laudantium molestias quae magnam voluptates molestiae amet qui tenetur tempore rem quo! Numquam accusantium, alias repectetur adipisicing elit. Provident, sit blanditctetur adipisicing elit. Provident, sit blanditctetur adipisicing elit. Provident, sit blanditllat rem voluptatibus.',
            dialog: false
          }
        ]
      }
    },
    methods: {
      addPost () {
        var postText = this.$refs.form.$el[0].value
        var today = new Date()
        var dateString = today.getDate() + '-' + today.getMonth() + '-' + today.getFullYear()
        this.posts.unshift({
          date: dateString,
          text: postText,
          dialog: false
        })
        this.setModalIds()
      },
      deletePost (e) {
        var parent = e.target.parentElement.parentElement.parentElement
        var IDinModal = parent.querySelector('.modal-id').innerText
        this.posts.splice(this.posts[IDinModal].modId, 1)
        this.setModalIds()
      },
      setModalIds () {
        var arrL = Object.keys(this.posts).length
        for (var i = 0; i < arrL; i++) {
          this.posts[i].modId = i
        }
      }
    }
  }
</script>

