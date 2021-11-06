import React, { useEffect, useRef, useState } from 'react'
import { useForm, ValidationError } from '@formspree/react';
import head from './head.jpg'
import PLmobile from './PLmobile.png'
import PLlaptop from './PLlaptop.png'
import video from './video.mp4'



import styles from './styles/portfolio.module.css'

export default function Portfolio() {

    const [navbarTop, setNavbarTop] = useState<boolean>(false)
    const [tab, setTab] = useState<string>("home")

    const skillsRef = useRef<HTMLDivElement | null>(null)
    const eduRef = useRef<HTMLDivElement | null>(null)
    const exampleRef = useRef<HTMLDivElement | null>(null)
    const contactRef = useRef<HTMLDivElement | null>(null)

    const isTop = navbarTop ? styles.active : null
    let contentStyle;
    if(tab === "home"){
        contentStyle = styles.contentHome
    } else if (tab === "edu"){
        contentStyle = styles.contentEdu
    }

    let wrapperStyle;
    if(tab === "home"){
        wrapperStyle = styles.narrowWrapper
    } else {
        wrapperStyle = styles.wideWrapper
    }

    

    function handleNavbarClick(
        e: React.MouseEvent<HTMLAnchorElement, MouseEvent> | 
        React.MouseEvent<HTMLDivElement, MouseEvent>,
        type: string
        ){
        e.preventDefault()

        let divRef: React.MutableRefObject<HTMLDivElement | null> | undefined;

        if(type ==="edu") divRef = eduRef
        else if(type === "example") divRef = exampleRef
        else if(type === "contact") divRef = contactRef
        else return

        if(divRef.current) {
            scrollTo(e, divRef.current)
        }
        
    }

    function scrollTo(
        e: React.MouseEvent<HTMLDivElement, MouseEvent> | React.MouseEvent<HTMLAnchorElement, MouseEvent>, 
        div: HTMLDivElement
    ){
        e.preventDefault()
        if(!eduRef.current) return

        const offset = 60;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = div.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
        })
    }

    return (
        <div className={styles.background}>
            <div className={styles.wrapper}>
                <div className={styles.frontFlex}>
                    <div className={styles.headContainer}>
                        <div className={styles.head}></div>
                    </div>
                    <Name shown={tab === "home"}/>
                    <Introduction handleClick={handleNavbarClick}/>
                </div>
                
                <Edu scrollRef={eduRef}/>
                <Skills scrollRef={skillsRef} handleClick={handleNavbarClick}/>
                <Interests scrollRef={skillsRef} handleClick={handleNavbarClick}/> {/*change ref */}
                <Powerlines scrollRef={exampleRef}/>
                <Contact scrollRef={contactRef} />
                
                
                
            </div>
        </div>
    )
}


function Name(props: {
    shown: boolean
}) {

    return (
        <div className={styles.name}>
            <h1>MUDr<span>.</span> </h1>
            <h1>PETER </h1> 
            <h1>HUTKA</h1>   
        </div>
    )
}

function Edu(props:{
    scrollRef: React.MutableRefObject<HTMLDivElement | null>;
}){
    const education = useRef<HTMLDivElement | null>(null)
    const experience = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        function scroll(e: Event){
            if(!education.current || !experience.current) return
            const bodyRect = document.body.getBoundingClientRect().top;
            const educationRect = education.current.getBoundingClientRect().top;
            const experienceRect = experience.current.getBoundingClientRect().top;
            
            const eduTranslate =  (educationRect- 60)  * 0.1 
            const expTranslate =  (experienceRect- 200)   * 0.1 
            

            education.current.style.transform = `translateX(${eduTranslate}%)`
            experience.current.style.transform = `translateX(${expTranslate * -1 }%)`
        }
        window.addEventListener("scroll", scroll);

        return () => window.removeEventListener("scroll", scroll);
    }, []);

    return (
        <div className={`${styles.section} ${styles.edu}`} ref={props.scrollRef}>
            <div className={styles.education}  ref={education}>
                <h1>EDUCATION</h1>
                <h2>2012 - 2019</h2>
                <p>Jessenius Faculty of Medicine in Martin, <br/>Commenius University in Bratislava</p>
            </div>
            <div className={styles.experience} ref={experience}>
                <h1>EXPERIENCE</h1>
                <h2>2019 - 2021 (now)</h2>
                <p>Clinic of Psychiatry, University Hospital of Martin,</p>
                <p>Post Graduate Study, Jessenius Faculty of Medicine in Martin, <br/>Commenius University in Bratislava</p>
                <h2>2019 - 2020</h2>
                <p>Sporadically learning JavaScript, creating simple projects</p>
                <h2>2020 - now</h2>
                <p>Dedicated significant part of free time into learning web technologies in order to switch career.</p>
            </div>
            
        </div>
    )
}

function Skills(props:{
    scrollRef: React.MutableRefObject<HTMLDivElement | null>,
    handleClick: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent> | React.MouseEvent<HTMLDivElement, MouseEvent>, type: string) => void
}){
    return (
        <div ref={props.scrollRef} className={`${styles.section} ${styles.skills}`}>
            
            <h1>SKILLS</h1>
            <p>Most of these skills are demonstrated in my full stack portfolio project:</p>
            <a  onClick={(e)=> props.handleClick(e, "example")}>POWERLINES</a>
            <h2>PROGRAMMING </h2>
            <p>JavaScript</p>
            <p>React</p>
            <p>Node.js</p>
            <p>Express.js</p>
            <p>TypeScript</p>
            <p>HTML</p>
            <p>CSS</p>
            <p>MongoDB</p>
            <h2>NON-PROGRAMMING</h2>
            <p >problem solving and critical thinking, not just cliche, I truly love problem solving hyperfocus</p>
            <p >working at psychiatry teaches you range of <span>communication skills</span> and <span>patience</span></p>
            <p >fluent in informal and technical English</p>
        </div>
    )
}

function Interests(props:{
    scrollRef: React.MutableRefObject<HTMLDivElement | null>,
    handleClick: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent> | React.MouseEvent<HTMLDivElement, MouseEvent>, type: string) => void
}){
    return (
        <div className={`${styles.interests}`}>
            <h1>INTERESTS</h1>
            <p>In the near future I'm interested in mastering range of web technologies, including <b>React</b>, <b>Typescript</b>, <b>CSS</b> and learn more about software <b></b>testing, software <b>architecture</b>, <b>data structures</b> and <b>algorithms</b>. I'm also planning to use my knowledge of react for creating mobile apps by learning <b>React Native</b>.</p>
            <p>Besides programming I'm in love with <b>music production</b>, <b>piano</b> and <b>photography</b>.</p>
            <h1>MOTIVATION</h1>
            <p>Since I saw the first computer in my life (around 1999) I was fascinated by technology. At about 13 y.o. I discovered Adobe Flash and ActionScript and created few very simple games. After I decided to study medicine and become doctor, I realized I still enjoy technology and programming a lot more. In order not to fall into <span className={styles.fallacy}>sunk cost fallacy</span> I used a little free time I had to learn web development.</p>
                
               
            <a onClick={(e)=> props.handleClick(e, "contact")}>CONTACT ME</a>

        </div>
    )
}

function Contact(props:{
    scrollRef: React.MutableRefObject<HTMLDivElement | null>;
}){
    return (
        <div className={`${styles.section} ${styles.contact}`} ref={props.scrollRef}>
            <div className={styles.wrapper}>
                <h1>CONTACT</h1>
                <ContactForm />
            </div>
            
        </div>
    )
}
function Introduction(props: {
    handleClick: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent> | React.MouseEvent<HTMLDivElement, MouseEvent>, type: string) => void
}){
    return (
        <div className={styles.intro} onClick={(e)=> props.handleClick(e, "edu")}>
            <div>DOCTOR</div>
            <div>TO</div>
            <div>WEB DEVELOPER</div>
            <div className={`${styles.ctaIntro} ${styles.btn}`}>LEARN MORE</div>
        </div>
    )
}


function Powerlines(props:{
    scrollRef: React.MutableRefObject<HTMLDivElement | null>;
}){
    return (
        <div className={styles.examples} ref={props.scrollRef}>
            <div className={styles.wrapper}>
                <h1>POWERLINES</h1>
                <div className={styles.PLImages}>
                    <img src={PLmobile} alt="" />
                    <img src={PLlaptop} alt="" /> 
                    
                </div>
                <div className={styles.textArea}>
                        <p>Full-stack app, online multiplayer game with authentication built using React, Node, Typescript, Web Sockets and MongoDB.</p>
                        <p>For live demo send it to friend or open one incognito tab.</p>
                        <a href="/powerlines">LIVE DEMO</a>
                        <a href="https://github.com/peterhutka/hoocreations">FRONTEND CODE </a>
                        <a href="https://github.com/peterhutka/HooProjectsServer">BACKEND CODE</a>
                        
                </div>
                <video autoPlay loop muted>
                    <source src={video} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                
            </div>
        </div>
            
        
    )
}


function ContactForm() {
  const [state, handleSubmit] = useForm("xjvjqkle");
  if (state.succeeded) {
      return <p>Thanks for contacting me!</p>;
  }
  return (
      <form onSubmit={handleSubmit}>
      <label htmlFor="email">
        YOUR E-MAIL:
      </label>
      <input
        id="email"
        type="email" 
        name="email"
      />
      <ValidationError 
        prefix="Email" 
        field="email"
        errors={state.errors}
      />
      <label htmlFor="message">
        MESSAGE:
      </label>
      <textarea
        id="message"
        name="message"
      />
      <ValidationError 
        prefix="Message" 
        field="message"
        errors={state.errors}
      />
      <button type="submit" disabled={state.submitting}>
        Submit
      </button>
    </form>
  );
}