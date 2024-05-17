      //delete blog
      const deleteButton = document.getElementById('deleteButton');
      if(deleteButton){
        deleteButton.addEventListener('click', async (e)=>{
          e.preventDefault()
          const endpoint = `/blogs/${deleteButton.dataset.id}`
          try{
            const res = await fetch(endpoint,{
              method:'DELETE'
            });
            if(res.ok){
              location.assign('/')
            }
          } catch(err){
            console.log(err)
          }
          })
      }



    // handle update image
      const imageInput = document.querySelector('.image-input')
      const imagePreview = document.querySelector('.editImage')
      const imageContainer = document.querySelector('.editImageContainer')
      imageInput.addEventListener('change', function(event) {
          const file = event.target.files[0];
          const reader = new FileReader();
          if(file!==undefined){
            imageContainer.style.display='block'
            reader.addEventListener('load',()=>{
              imagePreview.src = reader.result;
            })
            reader.readAsDataURL(file);
          }else{
            if(imagePreview.dataset.src){
              imagePreview.src=imagePreview.dataset.src
            }else{
              imagePreview.src=''
            }
          }

      
      });




      //handle update blog

      const form =  document.getElementById('updateForm')

      form.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
          event.preventDefault();
        }
      });

      form.days.addEventListener('change',(e)=>{
        e.preventDefault()
        addTextarea()
        })



      //reset contents to original blog data
      function resetContents(){
        const originalContentsContainer = document.getElementById("originalContents")
        const contents = document.querySelectorAll('.textarea')
          //remove origin data
          contents.forEach((item)=>{
                item.remove()
              })
            //restore original data
          const originalContentsData = originalContentsContainer.dataset.contents
          const array = originalContentsData.split(',')
          array.forEach((item)=>{
            const originalTextarea = document.createElement("textarea")
            originalTextarea.className = 'textarea'
            originalTextarea.name = 'contents'
            originalTextarea.required = true;
            originalTextarea.defaultValue = item
            originalContentsContainer.appendChild(originalTextarea)
          })

      }




    //if days changed update texarea quantities
      function addTextarea(){
        //original data
        const originalDays = parseInt(form.dataset.days)
        const daysValue = parseInt(form.days.value)
        const originalContentsContainer = document.getElementById("originalContents")
        const contents = document.querySelectorAll('.textarea')

        //new textarea
        const newContentsContainer = document.getElementById("newContents")
        const newContents = document.querySelectorAll(".newTextarea")
        const newContentsLength = newContents.length


        if(daysValue>originalDays){
          resetContents()
          //add new textarea for extra days
          const plusDays = daysValue-originalDays-newContentsLength
          if(plusDays>0){
            const newDaysArray = Array(plusDays).fill('')
              newDaysArray.map((day,index)=>{
                  const newTextarea = document.createElement("textarea")
                  newTextarea.className = 'newTextarea'
                  newTextarea.name = 'contents'
                  newTextarea.required = true;
                  newTextarea.placeholder = `Day ${parseInt(originalDays)+index+1+newContentsLength}`
                  newContentsContainer.appendChild(newTextarea)
              })

          // reduce textarea 
          }else if(plusDays<0){
            const deleteDays = -plusDays
            for(let i=1; i<=deleteDays; i++){
              newContentsContainer.removeChild(newContents[newContents.length-i])
            }
          }

          }
          else if(daysValue<originalDays){
            //reduce dates
              const minusDays = originalDays - daysValue
              for(let i=1; i<=minusDays; i++){
                originalContentsContainer.removeChild(contents[contents.length-i])
              }
              newContents.forEach((item)=>{
              item.remove()
              })
          }
          else if(daysValue === originalDays){
            //remove all newtextarea
              newContents.forEach((item)=>{
                item.remove()
              })
              resetContents()


          }
      }


      function editBlog(){
        form.style.display = 'flex'
        document.getElementById('detailContent').style.display = 'none'

      }
      function closeEdit(){
        form.style.display ='none'
        document.getElementById('detailContent').style.display = 'block';
      }


      // update blog
      const updateButton = document.getElementById('updateButton')
        form.addEventListener('submit', async (e)=>{
          e.preventDefault()
          const formData = new FormData()
          //contents
          const contentsArray = form.contents
          if(contentsArray.length>1){
              contentsArray.forEach((content)=>{
              formData.append('contents',content.value)
          })
          }else{
              formData.append('contents',contentsArray.value)
          }
          const endpoint = `/blogs/${updateButton.dataset.id}`
          const title = form.title.value;
          const days = form.days.value;
          const destination = form.destination.value;
          const notes = form.notes.value;
          const images = document.querySelectorAll('input[type="file"]')
          images.forEach((image)=>{
            if(image.files.length>0){
              formData.append('images',image.files[0])
            }
          })
          formData.append('title',title)
          formData.append('days',days)
          formData.append('destination',destination)
          formData.append('notes',notes)



          try{
            const res = await fetch(endpoint,{
              method:'PATCH',
              body:formData,
            });
            if(res.ok){
              location.assign('/')
            }
          } catch(err){
            console.log(err)
          }

          })
      