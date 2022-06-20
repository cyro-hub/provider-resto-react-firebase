import {useState,useEffect} from 'react'
import Nav from "../components/Nav"
import { Splide, SplideSlide } from '@splidejs/react-splide';
import SlideCard from '../components/SlideCard';
import '@splidejs/react-splide/css';
import {Link} from 'react-router-dom'
import '../pages_css/home.scss'
import {useSelector} from 'react-redux'
import Contact from '../components/Contact';
import {AiFillLinkedin,AiFillFacebook} from 'react-icons/ai'
import owner from '../images/owner.png'
import * as userActions from '../redux/actions/user'

function Home() {
const [size,setSize]=useState(window.innerWidth);
const recipes = useSelector(state=>state.recipe.recipes);
const popular = useSelector(state=>state.recipe.popularRecipes);

const checkSize=()=>{
  setSize(window.innerWidth);
}

useEffect(()=>{
  userActions.setNavigateToUser();
},[])

useEffect(()=>{
  window.addEventListener('resize',checkSize);
  return ()=>{
    window.removeEventListener('resize',checkSize);;
  }
})

  return (<>
  <Nav/>
  <section className="welcome">
    <h2>Welcome To Provider</h2>
    <h3><Link to="/user">Start</Link></h3>
  </section>
  <section className="tour">
        <h3 className='section-header'>Popular</h3>
        <div className="section">
          {/* add the popular recipes */}
        <Splide options={ { rewind: true,
                            perPage:size<450?1:size<750?2:size<1024?3:4,
                            gap:'2rem',
                            pagination:false,
                            arrows:false,
                            drag:'free'}} >
        {popular?.map((image,i) =><SplideSlide key={i}><SlideCard image={image}/></SplideSlide>)}
        </Splide>
        </div>
        <h3 className='section-header'>Others</h3>
        <div className="section">
          {/* add all the recipes */}
          <Splide options={ { rewind: true,
                            perPage:size<400?1:size<700?2:size<1024?3:4,
                            gap:'2rem',
                            pagination:false,
                            arrows:false,
                            drag:'free'}} >
           {recipes?.map((image,i)=><SplideSlide key={i}><SlideCard image={image} /></SplideSlide>)}
        </Splide>
        </div>
  </section>
  <section className="about">
      <h3>About</h3>
      <div>
      <img src={owner} alt="owner"/>
      <p className='section-para'>
        <span>I'm Bongbuin Cyril Mentan a developer</span>
        We are a young an vibrant community spreading love while feeding the community with the best recipes in the country, We have being doing this for over 3 years and still growing and our customers like our services we welcome you to this site
      </p>
      </div>
  </section>
  <section className='services'>
      <h3>Services</h3>
      <ul>
        <li>We do home cookings.</li>
        <li>We do delivery to homes throughout the entire nation</li>
        <li>We offer the best cooking services of fast food on our sites</li>
        <li>We also hire experts to our site </li>
        <li>Our meals are very affordable for all type of personality</li>
        <li>We partner with other small site to build a better community</li>
        <li>Hey we love our Customers and offer discounts</li>
        <li>All is welcome !!!!!!!!!!!</li>
      </ul>
    </section>
    <section className="faq">
    <h3>Frequently Asked Questions</h3>
      <ul>
        <li>Where are you from?</li>
        <li>What is the name of the owner of Provider-resto?</li>
        <li>How old is the owner of the Provider-resto?</li>
        <li>What are the services offered in the provider?</li>
        <li>Do you do delivery?</li>
        <li>Can you do cookin for Occassion?</li>
        <li>What kind of recipes do you prepare?</li>
        <li>How long has this site being functional?</li>
        <li>How to we order food to home delivery to respective areas?</li>
        <li>Where are you sites in the country?</li>
        <li>Can the site be visited for bloging and Journals or social activities?</li>
      </ul>
    </section>
    <section className="contact">
        <h3>Contact us</h3>
        <Contact/>
    </section>
    <section className="footer">
    <h4>copyright@ reserved to Cyril the developer</h4>
      <h4><a href='https://www.linkedin.com/in/bongbuin-cyril-7039b7231/' target='blank'>
            <AiFillLinkedin/>
          </a>
          <a href='https://www.facebook.com/cyril.mentan' target='blank'>
            <AiFillFacebook/>
          </a>
      </h4>
    </section>
  </>)
}

export default Home