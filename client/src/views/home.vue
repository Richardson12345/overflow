<template>
  <div>
    <navbar/>
    <span class="d-block p-2 bg-dark text-white">lets go ask some juicy questions!</span>
    <div class="container">
      <div class="jumbotron">
          <h1 class="display-4">WELLCOME TO SUBARSHI-OVERFLOWING</h1>
          <p class="lead">where question get answered and answers get voted and Lorem ipsum dolor sit amet consectetur adipisicing elit. In voluptatibus natus ipsa numquam laboriosam autem, deleniti labore laudantium deserunt, placeat eius minus fuga repudiandae! Omnis iste explicabo eos nisi excepturi?</p>
      </div>
      
    <div class="row">
        <div class="border col-md-12">
            <hr>
            <add-qs/>
            <hr>
        </div>
        <div class="border-left col-md-3 jumbotron">
            <h3 >
                <strong>
                    Please appreciate my hardwork Sir Ryan, Erwin, and Ms Windi
                </strong>
                <hr>
                <p>Lorem, ipsum dolor sit amet
                   consectetur adipisicing elit. Voluptatem
                   voluptates odio, officiis, dolor
                   odit eveniet culpa reprehenderit magnam
                   sit deserunt veritatis repellat
                   voluptatum laboriosam sed, ipsam vitae 
                   expedita assumenda modi.
                </p>
                <br>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero sint perferendis deleniti magnam! Quam magnam quo, amet neque ea consequuntur voluptatibus deserunt, architecto ab eos commodi ullam ipsam ut ducimus?
                    Nemo est sequi distinctio consectetur voluptatibus voluptate et repellat quas animi veniam nisi iusto at labore, quo consequatur, atque maiores neque? Animi officia quas libero voluptas necessitatibus excepturi dolor provident.
                    At perspiciatis doloribus iusto dolor mollitia ducimus harum eum perferendis dolorem nihil enim cupiditate impedit voluptate odio minus officiis illum, quis tenetur exercitationem sapiente sit beatae voluptatum officia. Atque, doloremque?
                    Inventore rem nostrum at omnis officia, in fugiat reprehenderit? A perspiciatis ad dolore adipisci deserunt omnis numquam ea ratione exercitationem nemo. Laborum, doloribus ipsum magnam vitae fugiat illo porro suscipit?
                    Tempore quod reprehenderit, adipisci doloribus iusto dolores ipsa id et error magni? Perferendis unde, alias et porro veritatis vero quia odit id atque iste, quo ipsam doloribus, harum quisquam? At.
                    Ipsum iste voluptate ratione hic, officia repellat aliquam quia illum aliquid non dicta deleniti cum ullam vitae praesentium sed error aspernatur corporis! Odio accusamus ipsam asperiores eaque inventore earum commodi.
                    Ipsa et repellat neque perspiciatis aut natus? Delectus ratione ex aliquam sit asperiores laboriosam incidunt officia consectetur. Nulla, quidem obcaecati veniam iure veritatis cupiditate dicta iusto sit maxime, possimus doloremque.
                    Molestiae reiciendis voluptatem tempora ut obcaecati iste, itaque impedit doloremque nobis, hic nemo ipsum eligendi ab culpa quasi excepturi repellat! Impedit id voluptatem facilis repudiandae doloribus quas inventore sed dignissimos?
                    Odit rem repudiandae laborum non. Neque veniam fugiat eaque illum modi porro nemo rerum maxime eos consequuntur. Rerum natus, aliquid fuga sapiente expedita enim veritatis, corrupti maxime velit ullam illum.
                    Perspiciatis, voluptatibus delectus. Aperiam harum impedit et eius iste quis architecto molestiae veritatis, dolores ex earum ullam voluptates? Fugit quaerat atque nostrum aperiam voluptates dolor facilis, illo consequatur dolore odio?
                </p>
                <hr>
            </h3>
        </div>
        <div class="border-left col-md-9">
            <hr>
            <h3><p class="text-monospace"><strong> quetions left to be answered </strong></p></h3>
            <hr>
            <question/>
        </div>    
    </div>
    </div>
    <footer/>
  </div> 
</template>

<script>

import navbar from "@/components/navbar.vue"
import question from "@/components/question.vue"
import addQs from "@/components/addquestion.vue"
import footer from "@/components/footer.vue"

export default {
    components: {
        navbar,
        question,
        addQs,
        footer
    }

}
</script>

