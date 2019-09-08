<template>
  <div class="add-note container">
    <div class="info">
      <router-link :to="{name:'Index'}">
        <div class="info-title">
          <img src="@/assets/img/back.png" alt="">
          <h2>Your notes</h2>
      </div>
      </router-link>
      <div class="save-btn-disabled" @click="addNote" :class="{'save-btn' : title}">
          <div class="circle" v-if="saving"></div>
          <div class="check" v-if="saved"></div>
          {{saveStatus}}
      </div>
    </div>
    <div class="note-taking-area">
      <div class="title">
        <input type="text" placeholder="title" v-model="title">
      </div>
      <div class="note-typed">
        <textarea name="note" placeholder="type your note here" v-model="content"></textarea>
      </div>
    </div>
  </div>
</template>

<script>

import db from '@/firebase/init'
import firebase from 'firebase/app'
import slugify from 'slugify'

export default {
  name: 'AddNote',
  data () {
    return {
      title :null,
      content :null,
      moment :[],
      slug :null,
      monthNames : ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sept", "Oct", "Nov", "Dec"],
      year : null,
      month : null,
      day : null,
      hour :null,
      minute : null,
      meridian : null,
      saveStatus : 'Save',
      saving: false,
      saved: false
    }
  },
  methods:{
    addNote(){
      if(this.title || this.content){
        this.saving = true;
        this.saveStatus = "Saving"
        //create a slug
        this.slug = slugify(this.title,{
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
        db.collection('notes').add({
          title:this.title,
          content:this.content,
          slug:this.slug,
          moment:[this.year, this.monthNames[this.month], this.day, this.hour, this.minute, this.meridian],
          time : (new Date().getTime()/1000)
        }).then(()=>{
            this.saving =false
            this.saved = true
            this.saveStatus = "Saved"
            setTimeout(()=>{
              this.$router.push({name : 'Index'})
            },500);
        }).catch(err =>{
            console.log(err)
        })
      }
    }
  }
}
</script>

<style lang="scss">
.add-note{
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
  .save-btn-disabled{
    min-width: 100px;
    background: #ccc;
    padding: 10px 30px;
    border-radius : 5px;
    color: white;
    text-transform: uppercase;
    font-weight: 600;
    font-size: 14px;
    cursor: default;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .save-btn{
    background: #0A96F8;
    cursor: pointer;
    &:hover{
      box-shadow : 0 6px 12px -4px rgba(10, 150, 248, 0.16);
    }
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
  .note-taking-area{
    // width:100%;
    .title{
      input{
        width:calc(100% - 40px);
        font-size: 50px;
        background: transparent;
        border:none;
        border-bottom: 2px solid #666666;
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
}
</style>