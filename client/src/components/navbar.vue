<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#"><img src="https://res.cloudinary.com/teepublic/image/private/s--hlsAwGgH--/t_Preview/b_rgb:c8e0ec,c_limit,f_jpg,h_630,q_90,w_630/v1510633317/production/designs/2054103_1.jpg" width="90" height="50" alt=""></a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <a class="nav-link" @click="home()" >Home <span class="sr-only">(current)</span></a>
            </li>
            <li>
                <a class="nav-link" @click="about()">About <span class="sr-only">(current)</span></a>
            </li>
          </ul>
          <form class="form-inline my-2 my-lg-0">
            <button class="btn btn-outline-primary my-2 my-md-0" @click="signout()" type="submit" v-if="isLogged">log-out</button>
            <button class="btn btn-outline-primary my-2 my-md-0" @click="login()" type="submit" v-else>login</button>
          </form>
        </div>
    </nav> 
</template>

<script>

import  { mapState, mapActions } from 'vuex'

export default {
     data(){
        return{
            isLogged : false
        }
    },
    methods: {
        ...mapActions([
            "logoutAcc"
        ]),
        checkUser(){
             if(localStorage.getItem('token')){
            this.isLogged = true;
          }
        },
        signout(){
            localStorage.clear();
            this.isLogged = false;
            this.$router.push('/');
            this.logoutAcc()
        },
        home(){
            this.$router.push('/home')
        },
        about(){
            this.$router.push('/about')
        },
        login(){
            this.$router.push('/')
        }
    },
    mounted(){
        this.checkUser()
    }
    
}
</script>
