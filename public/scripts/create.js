const form = document.getElementById('addForm')

//preview image

const imageInput = document.getElementById('imageInput')
const imagePreview = document.getElementById('imagePreview')
const imagePreviewContainer = document.getElementById('imagePreviewContainer')
const imageLabel = document.getElementById('imageLabel')
imageInput.addEventListener('change', function(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    if(file!==undefined){
        imageLabel.innerText='Change Photo'
        imagePreviewContainer.style.display='block'
        reader.addEventListener('load',()=>{
        imagePreview.src = reader.result;
      })
      reader.readAsDataURL(file);
    }else{
        imagePreviewContainer.style.display='none'
        imageLabel.innerText='Upload Photo'
    }

});

// add new textarea
function getTextarea(){
const daysValue = form.days.value
const daysArray = Array(parseInt(daysValue)).fill('')
    daysArray.map((day,index)=>{
    const textarea = document.createElement("textarea")
    textarea.className ='textarea'
    textarea.name='contents'
    textarea.required=true
    textarea.placeholder = `Day ${index+1}`
    document.getElementById("secondStep").appendChild(textarea)
    })
}



//next step
function handleNext(){
const titleValue = form.title.value
const destinationValue = form.destination.value
const daysValue = form.days.value
const textarea = document.querySelectorAll(".textarea")
if(titleValue.length>0 && destinationValue.length>0 && daysValue>0){
    document.getElementById('firstStep').style.display="none"
    document.getElementById('secondStepContainer').style.display="inline-flex"
    if(textarea.length===0){
        getTextarea()
    }else if(daysValue>textarea.length){
        const plusDays =  daysValue-textarea.length
        const newDaysArray = Array(parseInt(plusDays)).fill('')
        newDaysArray.map((day,index)=>{
            const newTextarea = document.createElement("textarea")
            newTextarea.className = 'textarea'
            newTextarea.name = 'contents'
            newTextarea.required = true;
            newTextarea.placeholder = `Day ${parseInt(textarea.length)+index+1}`
            document.getElementById("secondStep").appendChild(newTextarea)
        })
    }else if(daysValue<textarea.length){
        const minusDays = textarea.length - daysValue
        for(let i=1; i<=minusDays; i++){
            document.getElementById("secondStep").removeChild(textarea[textarea.length-i])
        }
    }
    
}

const existingErrorDays = document.getElementById('errorDays')
if(!existingErrorDays &&(daysValue<=0||daysValue.length==0)){
    const span = document.createElement("span")
    span.id = 'errorDays'
    span.innerText = 'Days are required and must be 1 or more.'
    document.getElementById('inputDays').insertAdjacentElement("afterend",span)
}else{
    if(existingErrorDays){
        const span = document.getElementById('errorDays')
        span.remove()
    }
}

const existingErrorTitle = document.getElementById('errorTitle')
if(!existingErrorTitle && titleValue.length===0){
    const span = document.createElement("span")
    span.id = 'errorTitle'
    span.innerText="Title is Required."
    document.getElementById('title').insertAdjacentElement("afterend",span)
}else{
    if(existingErrorTitle){
        const span = document.getElementById('errorTitle')
        span.remove()
    }
}

const existingErrorDes = document.getElementById('errorDes')
if(!existingErrorDes && destinationValue.length===0){
    const span = document.createElement("span")
    span.id = 'errorDes'
    span.innerText="Destination is Required."
    document.getElementById('destination').insertAdjacentElement("afterend",span)
}else{
    if(existingErrorDes){
        const span = document.getElementById('errorDes')
        span.remove()
    }
}
}

//back to previous step
function handleBack(){
document.getElementById('firstStep').style.display="inline-flex"
document.getElementById('secondStepContainer').style.display="none"
}

// console.log(form.dataset)

// form.addEventListener('submit',async(e)=>{
//     e.preventDefault()
//     const formData = new FormData()
//     const contentsArray = form.contents
//     if(contentsArray.length>1){
//         contentsArray.forEach((content)=>{
//         formData.append('contents',content.value)
//     })
//     }else{
//         formData.append('contents',contentsArray.value)
//     }
//     const endpoint = '/blogs';
//     const title = form.title.value;
//     const destination = form.destination.value;
//     const days = form.days.value;
//     const notes = form.notes.value;
//     formData.append('title',title)
//     formData.append('days',days)
//     formData.append('destination',destination)
//     formData.append('notes',notes)

//     //upload images to firebase
//     const images = document.querySelectorAll('input[type="file]')
//     const storageRef = ref(storage,`${currentUser._id}/${file.filename}`)
//     images.forEach((image)=>{
//         if(image.files.length>0){
//             uploadBytes()

//         }
//     })

//     //upload data to mongodb
//     try{
//         const res = await fetch(endpoint,{
//           method:'POST',
//           body:formData,
//         });
//         if(res.ok){
//           location.assign('/')
//         }
//       } catch(err){
//         console.log(err)
//       }
    
// })