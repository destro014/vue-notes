<template>
  <div class="index container">
    <div class="info">
      <div class="info-title">
        <h2>Your notes</h2>
      </div>
      <div class="new-btn">
        <router-link :to="{name :'AddNote'}">
          + Add new
        </router-link>
      </div>
    </div>
    <div class="notes" >
        <div class="note" v-for ="note in filteredNotes.slice().reverse()" :key="note.id">
          <router-link :to="{name : 'Note', params :{note_slug : note.slug}}">
        <div class="note-card">
          <div class="title">
            {{note.title}}
          </div>
          <div class="content">
            <p>{{note.content | snippet}}</p>
          </div>
          <div class="last-edited">
            <div class="date">
              <img src="@/assets/img/Calendar.png" alt="">
              <span>{{note.moment[1]}} {{note.moment[2]}}, {{note.moment[0]}}</span>
            </div>
            <div class="time">
              <img src="@/assets/img/Clock.png" alt="">
              <span>{{ note.moment[3] }} : {{ note.moment[4] }} {{ note.moment[5] }}</span>
            </div>
          </div>
        </div>        
      </router-link>
      </div>
    </div>
  </div>
</template>

<script>

import db from '@/firebase/init'

export default {
  name: 'Index',
  props: ['searchTerm'],
  data () {
    return {
      notes:[]
    }
  },
  computed:{
    filteredNotes(){
      return this.notes.filter(note =>{
        return note.title.match(this.searchTerm) || note.content.match(this.searchTerm)
      })
    }
  },
  created(){
    db.collection('notes').orderBy('time').get().then(snapshot=>{
      snapshot.forEach(doc=>{
        let note=doc.data()
        note.id=doc.id
        this.notes.push(note)
      })
    })
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.index{
  min-height: 73vh;
  padding: 0;
  .info{
    display : flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    h2{
      font-size: 32px;
      font-weight: 900;
    }
    .new-btn{
      color: #0a96f8 !important;
      font-size: 20px;
      font-weight: 700;
      a{
        &:visited {
          color: #0a96f8;
        }
      }
    } 
  }
  .notes{
  display: flex;
  // align-items: center;
  flex-wrap: wrap;
  .note{
    width: 300px;
    height: auto;
    padding: 10px;
    flex-grow:1;
    
    a{
      color: black;
    }
    .note-card{
      background: #fff;
      padding: 20px;
      border-radius: 10px;
      transition: all ease-in 0.1s;
      &:hover{
      box-shadow: 0px 12px 24px -10px rgba(0, 0, 0, 0.2);
    }
      .title{
        font-size: 24px;
        font-weight: 700;
      }
      .content{
        margin-top:10px;
        color: #666;
        p{
          margin: 0;
        }
      }
      .last-edited{
        display:flex;
        align-items: center;
        flex-wrap: wrap;
        color : #ababab;
        font-size : 14px;
        margin-top: 20px;
        .date{
          display: flex;
          align-items: center;
          margin-right: 30px;
          img{
            margin-top: -2px;
          }
        }
        .time{
          display: flex;
          align-items: center;
        }
        span{
          margin-left: 5px;
        }
      }
    }
  }
}
}


</style>
