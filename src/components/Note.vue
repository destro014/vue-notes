<template>
  <div class="addNote container" v-if="note">
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
.info{
  .info-title{
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    img{
      margin-right: 10px; 
      height: 60%;
    }
  }
  a{
    color : black !important;
    &::visited{
      color: black !important;
    }
  }
}
.cta-btn{
  display: flex;
}
.save-btn-disabled{
  background: #ccc;
  padding: 10px 30px;
  border-radius : 5px;
  color: white;
  text-transform: uppercase;
  font-weight: 600;
  font-size: 14px;
  cursor: default;
  display: none;
  margin-left: 20px;
}
.save-btn{
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0A96F8;
  cursor: pointer;
}
.circle{
    height: 12px;
    width:12px;
    border-radius: 50%;
    margin-right: 10px;
    border-radius: 50%;
    border-top: 2px solid white;
    border-right: 2px solid transparent;
    animation: spinner .6s linear infinite;
  }
  @keyframes spinner {
    to {transform: rotate(360deg);}
  }
  .check{
    transform: scaleX(1) rotate(45deg);
    margin: -3px 10px 0 0;  
    height: 12px;
    width: 5px;
    border-bottom: 2px solid white;
    border-right: 2px solid white;
  }
.delete-btn{
  padding: 10px 30px;
  border-radius : 5px;
  color: rgb(198, 40, 40);
  text-transform: uppercase;
  font-weight: 600;
  font-size: 14px;
  border: 1px solid rgb(198, 40, 40);
  justify-self: flex-end;
  cursor: pointer;
  &:hover{
    box-shadow: 0 6px 12px -4px rgba(198, 40, 40, 0.16);
  }
}
.note-taking-area{
  // width:100%;
  .title{
    input{
      width:calc(100% - 40px);
      font-size: 50px;
      background: transparent;
      border:none;
      // border-bottom: 2px solid #666666;
      color: black;
      font-weight: 700;
      padding: 0 20px;
      &:focus{
        outline: none;
        border-bottom:2px solid black;
      }
    }
  }
  .note-typed{
    margin-top: 20px;
    textarea{
      // background: transparent;
      border-radius : 20px;
      width:calc(100% - 40px);
      padding: 20px;
      border:none;
      min-height: 500px;
      max-height: 800px;
      font-weight: 500;
      resize: none;
      &:focus{
        outline: none;
        box-shadow: 0px 24px 24px -24px rgba(0, 0, 0, 0.2);
      }
      &::placeholder{
        font-weight: 500;
      }
    }
  }
}
.delete-popup{
  width: 100%;
  height: 100vh;
  background : rgba(2, 4, 20, 0.4);
  position: absolute;
  top: 0;
  left:0;
  display: flex;
  justify-content: center;
  align-items: center;
  animation : down .5s ease-in;
  .delete-dialog{
    background: white;
    width: 40%;    
    height: auto;
    padding:20px; 
    border-radius:20px;
    overflow: hidden;
    .bar{
      display: flex;
      align-items: center;
      justify-content: space-between;
      h3{
        margin:0;
      }
      .cross{
        font-size: 30px;
        font-weight: 700;
        transform : rotate(45deg);
        color: #777;
        margin: 0;
        cursor: pointer;
      }
    }
    .alert{
      display: flex;
      color: rgb(198, 40, 40);
      background: rgb(251, 233, 231);
      justify-content: center;
      align-items: flex-start;
      margin-top: 30px;
      border-radius: 5px;
      .danger{
        text-align:center;
        font-weight: 700;
      }
      img{
        margin: 13px 10px 0 20px; 
      }
    }
    .question{
      margin-top: 30px;
      font-weight: 500;
    }
  }
  .popup-btn{
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
    .btn{
      padding: 10px 25px;
      text-transform: uppercase;
      font-weight: 500;
      font-size: 14px;
      border-radius: 5px;
      cursor : pointer;
    }
    .cancel-btn{
      color: #777;

      &:hover{
        background: #eee;

      }
    }
    .delete-approve-btn{
      background: rgb(198, 40, 40);
      color: rgb(251, 233, 231);
      margin-left: 20px;
      &:hover{
        background: rgb(150, 40, 40);

      }
    }
  }
  @keyframes down{
    0%{
      opacity : 0;
    }
    100%{
      opacity : 100;
    }
  }
}
</style>