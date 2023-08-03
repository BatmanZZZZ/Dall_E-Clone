import React, { useEffect, useState } from 'react';
import { Card, FormField, Loader } from '../components';

const Home = () => {
  const [Loading, setLoading] = useState(false);
  const [AllPosts, setAllPosts] = useState(null);
  const [SearchText, setSearchText] = useState(''); // Set the default search text here
  const [searchResults,setSearchresults]= useState([]);
  const [searchTimeout,setSearchTimeout]=useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);

      try {
        const response = await fetch('http://localhost:8081/api/v1/post', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          const result = await response.json();
          setAllPosts(result.data.reverse());
          console.log(result.data.reverse());
        }
      } catch (error) {
        alert(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const RenderCards = ({ data, title }) => {
    if (data?.length > 0) {
      return data.map((post) => <Card key={post._id} {...post} />);
    } else {
      return (
        <h2 className='mt-5 font-bold text-[#6449ff] text-xl uppercase'>{title}</h2>
      );
    }
  };

  const handleSerachChange=(e)=>{
    setSearchText(e.target.value);

    clearTimeout(searchTimeout);

    setSearchTimeout(setTimeout(()=>{
      const searchresults= AllPosts.filter((item)=>{
        return(item.name.toLowerCase().includes(e.target.value.toLowerCase()) || item.prompt.toLowerCase().includes(e.target.value.toLowerCase()));


      });

      setSearchresults(searchresults);
      
   
    },500));
  }

  return (
    <section className='max-w-7xl mx-auto'>
      <div>
        <p className='text-extrabold text-[#222328] text-[32px]'>Community Showcase</p>
        <p className='mt-2 text-[#666e75] text-[16px] max-w-[800px]'>
          Browse Through a collection of imaginative and visually stunning images created by DALL-E AI
        </p>
      </div>
      <div className='mt-16'>
        <FormField 
        labelName="Search Posts"
        type="text"
        name="text"
        placeholder="Search ....."
        value={SearchText}
        handleChange={handleSerachChange}
        />
      </div>
      <div className='mt-10'>
        {Loading ? (
          <div className='flex justify-center items-center'>
            <Loader />
          </div>
        ) : (
          <>
            {SearchText && (
              <h2 className='font-medium text-[#666e75] text-xl mb-3'>
                Showing Results for <span className='text-[#222328] '>{SearchText}</span>
              </h2>
            )}
          </>
        )}
        <div className='px-7  grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-3 xs-cols-2   grid-cols-3 gap-3'>
          {SearchText ? (
            <RenderCards
              data={searchResults}
              title='No Results Found'
            />
          ) : (
            <RenderCards
              data={AllPosts}
              title='No Results Found'
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default Home;