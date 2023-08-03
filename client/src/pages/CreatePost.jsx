import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { preview } from '../assets';
import { Loader, FormField } from '../components';
import { getRandomPrompt } from '../utils';

const CreatePost = () => {

  const navigator = useNavigate();
  const [form, setForm] = useState({
    name: '',
    prompt: '',
    photo: '',
  })

  const [generatingImg, setGeneratingImg] = useState(false)
  const [Loading, setLoading] = useState(false);

  const GenerateImg=async ()=>{
    if(form.prompt){
      try {
        const key = "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"
        setGeneratingImg(true);
        const response = await fetch('http://localhost:8081/api/v1/dalle',{
          method:'POST',
          headers:{
            'Content-Type':'application/json',
            
          },
          body : JSON.stringify({prompt:form.prompt}),
        })
  
        const data= await response.json();
  
        setForm({...form,photo:`data:image/jpeg;base64,${data.photo}`})
        
      } catch (error) {
        alert(error)
      }finally{
        setGeneratingImg(false);
      }
    }else{
      alert("Please Enter a Prompt");
    }

    
  }

  const handlesubmit = async (e) => {
    e.preventDefault();

    if(form.prompt && form.photo){
      setLoading(true);
      try {
        const response = await fetch('http://localhost:8081/api/v1/post',{
          method:'POST',
          headers:{
            'Content-Type':'application/json',
          },
          body:JSON.stringify(form)
        })
        await response.json();
        navigator('/');
        
      } catch (error) {
        alert(error)
        
      }finally{
        setLoading(false);
      }
    }else{
      alert("Enter prompt and photo")
    }
    

  }
  const handleChange = (e) => {
    setForm({...form,[e.target.name]:e.target.value})

  }
  const handleSurpriseMe = () => {
    const randomPrompt=getRandomPrompt(form.prompt);
    setForm({...form,prompt:randomPrompt})

  }

  return (
    <section className=' max-w-7xl mx-auto'>

      <div className='absolute left-40'>
      <div>
        <p className='text-extrabold text-[#222328] text-[32px]'>Create Posts</p>
        <p className='mt-2 text-[#666e75] text-[16px] max-w-[800px]'>
          Create imaginative and visually stunning images Through DALL-E AI
        </p>
      </div>
      <form className='mt-16 max-w-3xl' onSubmit={handlesubmit}>
        <div className='flex flex-col gap-5'>
          <FormField
            labelName="Your Name"
            type="text"
            name="name"
            placeholder="Zohaib Ali"
            value={form.name}
            handleChange={handleChange}
          />
          <FormField
            labelName="Prompt"
            type="text"
            name="prompt"
            placeholder="an astronaut lounging in a tropical resort in space, vaporwave"
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />
        </div>

        <div className='mt-5 gap-5'>
          <button type='button' onClick={GenerateImg} 
          className='text-white bg-green-500 font-medium rounded-md text-sm w-full px-5 py-2.5 text-center'
          >
            {generatingImg ? 'Generating ...' : 'Generate'}</button>

        </div>
        <div className='mt-10'>
          <p className='mt-2 text-[#666e75] text-[14px]'>
            Once the img is generated, You can share it with community
          </p>
          <button 
          type='submit'
          className='mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full
           text-center px-5 py-2.5'
          >
            {Loading ? 'Loading ....':'Share with Community'}
          </button>

        </div>

        <div className='relative bg-gray-50 border border-gray-300 text-gray-900
        text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-150 h-150 p-3
        flex justify-center items-center mt-5 '>
          {form.photo ? (
            <img src={form.photo} alt={form.prompt} className='w-full h-full object-contain' />
          ) : (
            <img src={preview} alt="preview" className='w-9/12 h-9/12 object-contain opacity-40' />
          )}
          {generatingImg && (
            <div className='absolute inset-0 z-0 flex justify-center items-center
            bg-[rgba(0,0,0,0.5)] rounded-lg'>
              <Loader />
            </div>
          )}

        </div>
        
        

      </form>
      </div>

    </section>
  )
}

export default CreatePost