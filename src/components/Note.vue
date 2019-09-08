<template>
  <div class="note container" v-if="note">
    <div class="info">
      <router-link :to="{name:'Index'}">
        <div class="info-title">
          <img src="@/assets/img/back.png" alt="">
          <h2>Your notes</h2>
      </div>
      </router-link>
      <div class="cta-btn">
        <div class="delete-btn" @click="deletePopup">
          delete
        </div>
        
        <div class="save-btn-disabled" :class="{'save-btn' : edited()}" @click="update(note)">
            <div class="circle" v-if="updating"></div>
            <div class="check" v-if="updated"></div>
            {{updateStatus}}
        </div>
      </div>

    </div>
    <div class="note-taking-area" >
      <div class="title">
        <input type="text" placeholder="title" v-model="note.title">
      </div>
      <div class="note-typed">
        <textarea name="note" placeholder="type your note here" v-model="note.content"></textarea>
      </div>
    </div>
    <div class="delete-popup" v-if="deleteClicked">
      <div class="delete-dialog">
        <div class="bar">
          <h3>Confirm delete?</h3>
          <p class="cross" @click="deletePopup"> + </p>
        </div>
        <div class="alert">
          <img src="@/assets/img/alert.png" alt="">
          <p class="danger">Note : If you delete this, it will no longer be available</p>
        </div>
        <p class="question">Are you sure want to delete?</p>
        <div class="popup-btn">
          <div class="cancel-btn btn" @click="deletePopup">Cancel</div>
          <div class="delete-approve-btn btn" @click="deleteNote(note.id)">delete</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
 
import db from '@/firebase/init'
import slugify from 'slugify'

export default {
    name: 'Note',
    data(){
        return{
          updateStatus: 'Update',
          updating : false,
          updated : false,
          note: null,
          deleteClicked : null,
          title : null,
          content : null,
          year : null,
          month : null,
          monthNames : ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sept", "Oct", "Nov", "Dec"],
          day : null,
          hour :null,
          minute : null,
          meridian : null,
          // edited : null
        }
    },
    methods:{
      edited(){
        if((this.title != this.note.title) || (this.content != this.note.content)){
          return true
        }
        else{
          return false
        }
      },
      update(){
        if(this.note.title){
          this.updating = true;
          this.updateStatus = "updating"
          //create a slug
          this.note.slug = slugify(this.note.title,{
            replacement: '-',
            remove: /[$*_+~.()'"!\-:@]/g,
            lower:true
          })
          //creating date and time 
          this.year = (new Date()).getFullYear()
          this.month = (new Date()).getMonth()
          this.day = (new Date()).getDate()
          this.hour = (new Date()).getHours()
          this.minute = (new Date()).getMinutes()
          if( this.hour < 10){
            this.hour ="0"+this.hour
          }
          if( this.minute < 10){
            this.minute ="0"+this.minute
          }
          if(this.hour <12){
            this.meridian = "A.M"
            if (this.hour == 0){
              this.hour = 12
            }

          }
          else{
            this.hour = (this.hour) % 12
            this.meridian = "P.M"
          }
          db.collection('notes').doc(this.note.id).update({
            title:this.note.title,
            content:this.note.content,
            slug:this.note.slug,
            moment:[this.year, this.monthNames[this.month], this.day, this.hour, this.minute, this.meridian],
            time : (new Date().getTime()/1000)
          }).then(()=>{
              this.updating =false
              this.updated = true
              this.updateStatus = "Updated"
              setTimeout(()=>{
                this.$router.push({name : 'Index'})
              },500);
          }).catch(err =>{
              console.log(err)
          })
        }
      },
      deletePopup(){
        this.deleteClicked = !this.deleteClicked
      },
      deleteNote(id){
        db.collection('notes').doc(id).delete().then(()=>{
          this.$router.push({name : 'Index'})
        })
      }
    },
    created(){
      let ref = db.collection('notes').where('slug', '==' , this.$route.params.note_slug)
      ref.get().then(snapshot =>{
          snapshot.forEach(doc =>{
              this.note = doc.data()
              this.note.id = doc.id
              this.title = this.note.title
              this.content = this.note.content
          })
      })  
    }
}
</script>

<style lang="scss">

</style>